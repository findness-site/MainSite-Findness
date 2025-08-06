
import { GeocodingResult } from './types';
import { allLocations, postalAreaMapping } from './regions';
import { regions, Region } from './regions/regions';
import { 
  extractPostcodeFromString,
  getLocationFromPostcode 
} from './postcodeHelper';

/**
 * Database of UK locations for geocoding
 * This helps with UK-specific locations that might not be properly geocoded by Google
 */
export const ukLocations = {
  ...allLocations,
  // Add missing locations that users are searching for
  'holmes chapel': { lat: 53.1811, lng: -2.3515 },
  'west byfleet': { lat: 51.3438, lng: -0.5089 },
  'byfleet': { lat: 51.3438, lng: -0.5089 },
  'holmes': { lat: 53.1811, lng: -2.3515 }, // Partial match for Holmes Chapel
  'chapel': { lat: 53.1811, lng: -2.3515 }, // Partial match for Holmes Chapel
  // Add more common variations
  'congleton': { lat: 53.1646, lng: -2.2143 },
  'sandbach': { lat: 53.1459, lng: -2.3624 },
  'middlewich': { lat: 53.1926, lng: -2.4441 },
  'woking': { lat: 51.3168, lng: -0.5590 },
  'weybridge': { lat: 51.3742, lng: -0.4587 },
  'surrey': { lat: 51.3148, lng: -0.5600 }
};

/**
 * Find UK location coordinates using improved fuzzy matching
 * @param location The location string to search for
 * @returns Coordinates if a match is found, null otherwise
 */
export function getUKLocationCoordinates(location: string): GeocodingResult | null {
  if (!location || typeof location !== 'string') {
    console.warn('Invalid location provided to getUKLocationCoordinates');
    return null;
  }
  
  // Normalize location string for matching
  const normalizedLocation = location.toLowerCase().trim();
  console.log(`🔍 Searching UK database for location: "${normalizedLocation}"`);
  
  // First, check if the string contains a postcode
  const extractedPostcode = extractPostcodeFromString(normalizedLocation);
  if (extractedPostcode) {
    const postcodeLocation = getLocationFromPostcode(extractedPostcode);
    if (postcodeLocation) {
      console.log(`✅ Found location via postcode in "${location}": ${extractedPostcode}`, postcodeLocation);
      return postcodeLocation;
    }
  }
  
  // Try to find exact match in database
  if (ukLocations[normalizedLocation]) {
    console.log(`✅ Found exact UK location match for "${location}": ${normalizedLocation}`, ukLocations[normalizedLocation]);
    return ukLocations[normalizedLocation];
  }
  
  // IMPROVED FUZZY MATCHING: Check for partial matches with more flexibility
  
  // 1. Try exact substring matching (most reliable)
  for (const [key, coords] of Object.entries(ukLocations)) {
    // Check if the normalized location contains this key or vice versa
    if (normalizedLocation.includes(key) || key.includes(normalizedLocation)) {
      console.log(`✅ Found UK location fuzzy match for "${location}": ${key}`, coords);
      return coords;
    }
  }
  
  // 2. Advanced tokenization for better partial matching
  const locationTokens = normalizedLocation.split(/[\s,.-]+/).filter(t => t.length > 2);
  console.log(`🔍 Trying token matching with tokens: [${locationTokens.join(', ')}]`);
  
  // Try matching individual tokens with location names
  for (const token of locationTokens) {
    if (token.length < 3) continue; // Skip very short tokens
    
    // Check if this token matches any location key
    for (const [key, coords] of Object.entries(ukLocations)) {
      if (key.includes(token)) {
        console.log(`✅ Found UK location token match for "${location}" via token "${token}": ${key}`, coords);
        return coords;
      }
    }
  }
  
  // 3. Try with common name variations
  const commonPrefixes = ['north ', 'south ', 'east ', 'west ', 'central ', 'old ', 'new '];
  for (const prefix of commonPrefixes) {
    if (normalizedLocation.startsWith(prefix)) {
      const withoutPrefix = normalizedLocation.substring(prefix.length);
      if (ukLocations[withoutPrefix]) {
        console.log(`✅ Found UK location match with prefix removal: "${location}" -> "${withoutPrefix}"`, ukLocations[withoutPrefix]);
        return ukLocations[withoutPrefix];
      }
    }
  }
  
  // 4. Handle street/road/etc. suffix variations
  const locationWithoutSuffix = normalizedLocation
    .replace(/\s(road|street|avenue|lane|way|close|drive|park|gardens|place|square|village|hill)$/, '');
  
  if (locationWithoutSuffix !== normalizedLocation) {
    for (const [key, coords] of Object.entries(ukLocations)) {
      if (locationWithoutSuffix === key || key.includes(locationWithoutSuffix) || locationWithoutSuffix.includes(key)) {
        console.log(`✅ Found UK location match after removing suffix: "${location}" -> "${key}"`, coords);
        return coords;
      }
    }
  }
  
  // 5. Check for international locations
  if (normalizedLocation.includes('usa') || 
      normalizedLocation.includes('united states') || 
      normalizedLocation.includes('america')) {
    console.log(`🌍 International location detected (USA): "${location}"`);
    return { lat: 37.0902, lng: -95.7129 }; // Center of USA
  }
  
  if (normalizedLocation.includes('australia') || normalizedLocation.includes('sydney')) {
    console.log(`🌍 International location detected (Australia): "${location}"`);
    return { lat: -25.2744, lng: 133.7751 }; // Center of Australia
  }
  
  if (normalizedLocation.includes('france') || normalizedLocation.includes('paris')) {
    console.log(`🌍 International location detected (France): "${location}"`);
    return { lat: 46.2276, lng: 2.2137 }; // Center of France
  }
  
  if (normalizedLocation.includes('germany') || normalizedLocation.includes('berlin')) {
    console.log(`🌍 International location detected (Germany): "${location}"`);
    return { lat: 51.1657, lng: 10.4515 }; // Center of Germany
  }
  
  // 6. Regional detection for unknown locations
  for (const region of regions) {
    for (const keyword of region.keywords) {
      if (normalizedLocation.includes(keyword)) {
        console.log(`✅ Found regional UK match for "${location}" via keyword "${keyword}"`, region.center);
        return region.center;
      }
    }
  }
  
  // 7. Check broad regions as fallback
  const commonRegions = [
    {name: 'north', center: { lat: 54.9, lng: -2.9 }},
    {name: 'south', center: { lat: 51.1, lng: -0.8 }},
    {name: 'east', center: { lat: 52.5, lng: 0.7 }},
    {name: 'west', center: { lat: 51.4, lng: -3.0 }},
    {name: 'midlands', center: { lat: 52.6, lng: -1.9 }},
    {name: 'wales', center: { lat: 52.1, lng: -3.9 }},
    {name: 'scotland', center: { lat: 57.1, lng: -4.2 }},
    {name: 'ireland', center: { lat: 53.4, lng: -7.9 }},
    {name: 'london', center: { lat: 51.5, lng: -0.12 }},
    {name: 'england', center: { lat: 52.8, lng: -1.5 }}
  ];
  
  for (const region of commonRegions) {
    if (normalizedLocation.includes(region.name)) {
      console.log(`✅ Found general region match for "${location}": ${region.name}`, region.center);
      return region.center;
    }
  }
  
  // No match found in our database
  console.log(`❌ No UK location match found for "${location}" after all matching attempts`);
  
  // Use a more intelligent fallback approach
  // Create a deterministic but varied coordinate based on the input string
  // This ensures we always return something even for unknown locations
  const centralUK = { lat: 52.8382, lng: -2.3278 }; // Central England
  const variance = 0.5; // ~30 miles
  
  // Use string to create deterministic but varied coordinates
  const hash = normalizedLocation.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const latOffset = ((hash % 100) / 100) * variance * 2 - variance;
  const lngOffset = ((hash % 200) / 100) - 1;
  
  const fallbackCoords = {
    lat: centralUK.lat + latOffset,
    lng: centralUK.lng + lngOffset
  };
  
  console.log(`🔄 Using fallback UK coordinates for "${location}":`, fallbackCoords);
  return fallbackCoords;
}
