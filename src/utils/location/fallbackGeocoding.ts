
import { GeocodingResult } from './types';
import { getUKLocationCoordinates } from './ukLocations';
import { 
  extractPostcodeFromString, 
  getLocationFromPostcode,
  addPostcodeVariance,
  isValidUKPostcode
} from './postcodeHelper';

/**
 * Generate approximate coordinates for a location string
 * This is a fallback for when the Google Maps API fails
 */
export function generateApproximateCoordinates(locationString: string): GeocodingResult {
  // Don't continue if the string is empty
  if (!locationString || locationString.trim() === '') {
    console.error('Empty location string provided to generateApproximateCoordinates');
    // Default to central UK
    return { lat: 52.8382, lng: -2.3278 };
  }

  // Normalize the location string for matching
  const normalizedLocation = locationString.toLowerCase().trim();
  
  // Check for UK locations with fuzzy matching
  const ukCoords = getUKLocationCoordinates(normalizedLocation);
  if (ukCoords) {
    console.log('Using UK location database for:', locationString);
    return ukCoords;
  }

  // Extract postal codes if present (UK format)
  const extractedPostcode = extractPostcodeFromString(normalizedLocation);
  if (extractedPostcode) {
    // If we have a postcode, generate coordinates based on it
    console.log('Found UK postcode in location string:', extractedPostcode);
    const postcodeLocation = getLocationFromPostcode(extractedPostcode);
    
    if (postcodeLocation) {
      // Add small variance to avoid clustering at exact postcode centroids
      return addPostcodeVariance(postcodeLocation, extractedPostcode);
    }
  } else if (isValidUKPostcode(normalizedLocation)) {
    // The whole string might be a postcode
    const postcodeLocation = getLocationFromPostcode(normalizedLocation);
    if (postcodeLocation) {
      return addPostcodeVariance(postcodeLocation, normalizedLocation);
    }
  }

  // If no match was found in the database, use geographic region detection
  const coordinates = generateRegionalCoordinates(normalizedLocation);
  if (coordinates) {
    console.log('Generated regional coordinates for:', locationString);
    return coordinates;
  }

  // Fallback to a more sophisticated string-based coordinate generation
  return generateSmartFallbackCoordinates(locationString);
}

/**
 * Generate coordinates based on UK postcode
 */
function generateUKPostcodeRegionCoordinates(postcode: string): GeocodingResult {
  // Extract first part of postcode (outward code)
  const outwardCode = postcode.trim().split(' ')[0].toUpperCase();
  const firstChar = outwardCode.charAt(0);
  
  // Rough mapping of first letter to UK region
  const regions: Record<string, GeocodingResult> = {
    'E': { lat: 51.5074, lng: -0.1278 },  // London
    'EC': { lat: 51.5155, lng: -0.0922 }, // East Central London
    'WC': { lat: 51.5164, lng: -0.1168 }, // West Central London
    'N': { lat: 51.5634, lng: -0.1050 },  // North London
    'NW': { lat: 51.5504, lng: -0.1967 }, // North West London
    'W': { lat: 51.5115, lng: -0.2001 },  // West London
    'SW': { lat: 51.4680, lng: -0.1831 }, // South West London
    'SE': { lat: 51.4750, lng: -0.0483 }, // South East London
    'B': { lat: 52.4862, lng: -1.8904 },  // Birmingham
    'M': { lat: 53.4808, lng: -2.2426 },  // Manchester
    'L': { lat: 53.4084, lng: -2.9916 },  // Liverpool
    'S': { lat: 53.3811, lng: -1.4701 },  // Sheffield
    'G': { lat: 55.8642, lng: -4.2518 },  // Glasgow
    'EH': { lat: 55.9533, lng: -3.1883 }, // Edinburgh
    'CF': { lat: 51.4816, lng: -3.1791 }, // Cardiff
    'BT': { lat: 54.5973, lng: -5.9301 }, // Belfast
  };
  
  // Check for exact match on first 1-2 characters
  if (regions[outwardCode.substring(0, 2)]) {
    return regions[outwardCode.substring(0, 2)];
  }
  
  // Check for match on first character
  if (regions[firstChar]) {
    return regions[firstChar];
  }
  
  // Default to central UK with a small random offset
  const baseLocation = { lat: 52.8382, lng: -2.3278 };
  const offset = 0.5; // ~30 miles
  
  return {
    lat: baseLocation.lat + (Math.random() * offset * 2 - offset),
    lng: baseLocation.lng + (Math.random() * offset * 2 - offset)
  };
}

/**
 * Try to detect the geographic region from the location string
 * and return appropriate coordinates
 */
function generateRegionalCoordinates(normalizedLocation: string): GeocodingResult | null {
  // Regional detection patterns - add more regional matches
  const regions = [
    // Northwest England
    {
      pattern: ['liverpool', 'manchester', 'lancashire', 'cheshire', 'merseyside', 'chester'],
      center: { lat: 53.4084, lng: -2.9916 }
    },
    // London and surroundings
    {
      pattern: ['london', 'westminster', 'camden', 'hackney', 'croydon', 'kensington', 'islington', 'wandsworth', 'brent', 'ealing'],
      center: { lat: 51.5074, lng: -0.1278 }
    },
    // East England
    {
      pattern: ['norwich', 'norfolk', 'suffolk', 'east anglia', 'cambridge', 'peterborough', 'ipswich'],
      center: { lat: 52.6309, lng: 1.2974 }
    },
    // Scotland
    {
      pattern: ['glasgow', 'edinburgh', 'aberdeen', 'dundee', 'scotland', 'inverness', 'perth', 'stirling'],
      center: { lat: 55.9533, lng: -3.1883 }
    },
    // Wales
    {
      pattern: ['cardiff', 'swansea', 'newport', 'wales', 'wrexham', 'bangor', 'aberystwyth'],
      center: { lat: 51.4816, lng: -3.1791 }
    },
    // Northern Ireland
    {
      pattern: ['belfast', 'derry', 'northern ireland', 'antrim', 'newry', 'armagh', 'lisburn'],
      center: { lat: 54.5973, lng: -5.9301 }
    },
    // Midlands
    {
      pattern: ['birmingham', 'coventry', 'leicester', 'nottingham', 'derby', 'midlands'],
      center: { lat: 52.4862, lng: -1.8904 }
    },
    // South England
    {
      pattern: ['brighton', 'southampton', 'portsmouth', 'bournemouth', 'plymouth', 'exeter'],
      center: { lat: 50.9097, lng: -1.4044 }
    },
    // Yorkshire
    {
      pattern: ['leeds', 'york', 'sheffield', 'bradford', 'hull', 'yorkshire'],
      center: { lat: 53.9600, lng: -1.0873 }
    }
  ];

  // Check if location matches any region
  for (const region of regions) {
    for (const keyword of region.pattern) {
      if (normalizedLocation.includes(keyword)) {
        // Add small random offset to avoid all locations in a region having the same coordinates
        const offset = 0.05; // Approximately 3 miles at UK latitudes
        return {
          lat: region.center.lat + (Math.random() * offset * 2 - offset),
          lng: region.center.lng + (Math.random() * offset * 2 - offset)
        };
      }
    }
  }

  // Didn't match any region
  return null;
}

/**
 * Generate coordinates based on the input string in a more intelligent way
 * This creates a hash of the string and uses it to generate consistent coordinates
 * but with improved geographic awareness
 */
function generateSmartFallbackCoordinates(locationString: string): GeocodingResult {
  console.log('Using smart fallback coordinate generation for:', locationString);
  
  // Simple string hash function
  const hash = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  };

  // UK centered map with improved central point
  const baseLocation = {
    lat: 52.8382, // More central UK latitude
    lng: -2.3278  // More central UK longitude
  };
  
  // Use the hash to create coordinates with better distribution
  const locationHash = hash(locationString);
  
  // Use trigonometric functions to get a more circular distribution
  const angle = (locationHash % 1000) / 1000 * Math.PI * 2; // 0 to 2π
  const distance = ((locationHash % 500) / 1000) * 2; // 0 to 1 miles
  
  const lat = baseLocation.lat + Math.cos(angle) * distance;
  const lng = baseLocation.lng + Math.sin(angle) * distance;
  
  console.log(`Generated coordinates for "${locationString}": (${lat}, ${lng})`);
  return { lat, lng };
}
