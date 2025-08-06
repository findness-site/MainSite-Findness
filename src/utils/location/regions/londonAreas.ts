
import { GeocodingResult } from '../types';

/**
 * London areas and postcodes
 */
export const londonAreas: Record<string, GeocodingResult> = {
  // London areas for postal code mapping
  'london central': { lat: 51.5074, lng: -0.1278 },
  'london east': { lat: 51.5395, lng: -0.0678 },
  'london west': { lat: 51.5105, lng: -0.1953 },
  'london north': { lat: 51.5704, lng: -0.1278 },
  'london south': { lat: 51.4613, lng: -0.1156 },
  'bromley area': { lat: 51.4078, lng: 0.0137 }
};
