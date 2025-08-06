
/**
 * UK Postcode Helper Utility
 * 
 * Provides functions for working with UK postcodes including:
 * - Validation
 * - Formatting
 * - Parsing
 * - Area identification
 * 
 * UK postcodes follow these formats:
 * - Area: One or two characters (e.g., B, M, SW)
 * - District: Area followed by one or two digits (e.g., M1, SW1)
 * - Sector: District followed by a space and a digit (e.g., M1 1)
 * - Unit: Full postcode (e.g., M1 1AE)
 */

import { postalAreaMapping } from './regions/postalAreaMapping';
import { GeocodingResult } from './types';
import { allLocations } from './regions';

/**
 * Validates if a string looks like a UK postcode
 */
export function isValidUKPostcode(postcode: string): boolean {
  if (!postcode || typeof postcode !== 'string') return false;
  
  // Comprehensive UK postcode regex pattern
  // Matches standard UK postcode formats:
  // - AA9A 9AA
  // - A9A 9AA
  // - A9 9AA
  // - A99 9AA
  // - AA9 9AA
  // - AA99 9AA
  const postcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i;
  
  return postcodeRegex.test(postcode.trim());
}

/**
 * Formats a postcode into the standard format (uppercase with space)
 */
export function formatPostcode(postcode: string): string {
  if (!postcode || typeof postcode !== 'string') return '';
  
  // Remove all spaces and convert to uppercase
  const clean = postcode.toUpperCase().replace(/\s+/g, '');
  
  // No postcode should be shorter than 5 characters
  if (clean.length < 5) return clean;
  
  // Insert space before the last three characters
  return `${clean.slice(0, -3)} ${clean.slice(-3)}`;
}

/**
 * Extracts the postcode area (first one or two letters)
 */
export function extractPostcodeArea(postcode: string): string | null {
  if (!postcode || typeof postcode !== 'string') return null;
  
  const clean = postcode.toLowerCase().trim().replace(/\s+/g, '');
  
  // Pattern to match one or two letters at the start
  const match = clean.match(/^[a-z]{1,2}/i);
  return match ? match[0].toLowerCase() : null;
}

/**
 * Extracts the postcode district (area + numbers)
 */
export function extractPostcodeDistrict(postcode: string): string | null {
  if (!postcode || typeof postcode !== 'string') return null;
  
  const clean = postcode.toLowerCase().trim().replace(/\s+/g, '');
  
  // Pattern to match area code plus numbers (e.g., "sw1", "m25", "ec1a")
  const match = clean.match(/^[a-z]{1,2}[0-9]{1,2}[a-z]?/i);
  return match ? match[0].toLowerCase() : null;
}

/**
 * Special handling for duplicate postal codes
 */
function handleSpecialPostcodes(area: string): string {
  // Handle the special postal codes we renamed due to duplicates
  if (area === 'e' && postalAreaMapping['e_roi']) return 'e_roi';
  if (area === 'n' && postalAreaMapping['n_roi']) return 'n_roi';
  if (area === 'w' && postalAreaMapping['w_roi']) return 'w_roi';
  if (area === 'sm' && postalAreaMapping['sm_']) return 'sm_';
  if (area === 'dt' && postalAreaMapping['dt_add']) return 'dt_add';
  
  return area;
}

/**
 * Attempts to determine the approximate location for a postcode
 */
export function getLocationFromPostcode(postcode: string): GeocodingResult | null {
  if (!isValidUKPostcode(postcode)) {
    if (typeof postcode === 'string' && postcode.length >= 2) {
      // Try to extract what might be a partial postcode
      const possibleArea = postcode.substring(0, 2).toLowerCase();
      const mappedArea = handleSpecialPostcodes(possibleArea);
      
      if (postalAreaMapping[mappedArea]) {
        const mappedCity = postalAreaMapping[mappedArea];
        if (allLocations[mappedCity]) {
          console.log(`Found location from partial postcode "${postcode}" -> "${mappedCity}"`);
          return allLocations[mappedCity];
        }
      }
      
      // Try the first character if two didn't match
      const firstChar = postcode.substring(0, 1).toLowerCase();
      const mappedFirstChar = handleSpecialPostcodes(firstChar);
      
      if (postalAreaMapping[mappedFirstChar]) {
        const mappedCity = postalAreaMapping[mappedFirstChar];
        if (allLocations[mappedCity]) {
          console.log(`Found location from first character of "${postcode}" -> "${mappedCity}"`);
          return allLocations[mappedCity];
        }
      }
    }
    return null;
  }
  
  const area = extractPostcodeArea(postcode);
  if (!area) return null;
  
  // Handle special cases for duplicate postal areas
  const mappedArea = handleSpecialPostcodes(area);
  
  // Try to map postal area to location
  if (postalAreaMapping[mappedArea]) {
    const mappedCity = postalAreaMapping[mappedArea];
    if (allLocations[mappedCity]) {
      console.log(`Found location from postcode area "${area}" -> "${mappedCity}"`);
      return allLocations[mappedCity];
    }
  }
  
  // Add variations based on postcode district
  const district = extractPostcodeDistrict(postcode);
  if (district) {
    // Handle London postal districts specially
    if (district.startsWith('e') || district.startsWith('ec') || 
        district.startsWith('wc') || district.startsWith('n') || 
        district.startsWith('nw') || district.startsWith('se') || 
        district.startsWith('sw') || district.startsWith('w')) {
      
      // London postcodes - extract more precise areas
      const londonAreas: Record<string, GeocodingResult> = {
        'e1': { lat: 51.5174, lng: -0.0628 },   // East London - Whitechapel
        'ec1': { lat: 51.5225, lng: -0.1024 },  // City of London
        'wc1': { lat: 51.5205, lng: -0.1230 },  // Bloomsbury
        'n1': { lat: 51.5417, lng: -0.0941 },   // Islington
        'nw1': { lat: 51.5291, lng: -0.1407 },  // Camden Town
        'se1': { lat: 51.5005, lng: -0.0893 },  // South Bank
        'sw1': { lat: 51.4977, lng: -0.1337 },  // Westminster
        'w1': { lat: 51.5144, lng: -0.1425 },   // West End
      };
      
      for (const [code, coords] of Object.entries(londonAreas)) {
        if (district.startsWith(code)) {
          console.log(`Found London district match for "${district}" -> "${code}"`);
          return coords;
        }
      }
      
      // Default to central London if specific district not matched
      return { lat: 51.5074, lng: -0.1278 }; // Central London
    }
  }
  
  // If we couldn't find a specific match, return the area mapping if it exists
  if (area && postalAreaMapping[mappedArea]) {
    const mappedCity = postalAreaMapping[mappedArea];
    if (allLocations[mappedCity]) {
      return allLocations[mappedCity];
    }
  }
  
  // No match found
  return null;
}

/**
 * Detect if a search string contains a UK postcode
 * Returns the extracted postcode if found, null otherwise
 */
export function extractPostcodeFromString(searchString: string): string | null {
  if (!searchString || typeof searchString !== 'string') return null;
  
  // Match full or partial UK postcodes in a string
  const postcodeRegex = /\b[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}\b/i;
  
  const match = searchString.match(postcodeRegex);
  if (match) {
    console.log(`Found UK postcode in string: "${match[0]}"`);
    return match[0];
  }
  
  return null;
}

/**
 * Add random variance to postcode coordinates to avoid clustering
 */
export function addPostcodeVariance(coordinates: GeocodingResult, postcode: string): GeocodingResult {
  // Create a simple numeric hash from the postcode
  const hash = postcode.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Generate variance - maximum ~0.5km in each direction
  const latVariance = ((hash % 100) / 10000) * (hash % 2 === 0 ? 1 : -1);
  const lngVariance = (((hash * 31) % 100) / 10000) * (hash % 3 === 0 ? 1 : -1);
  
  return {
    lat: coordinates.lat + latVariance,
    lng: coordinates.lng + lngVariance
  };
}
