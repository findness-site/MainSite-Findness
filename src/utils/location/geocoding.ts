
import { GeocodingResult } from './types';
import { isGoogleMapsReady } from './googleMapsHelpers';
import { getUKLocationCoordinates } from './ukLocations';
import { generateApproximateCoordinates } from './fallbackGeocoding';

/**
 * Geocode a location string using Google Maps API with UK fallbacks
 * @param locationString The location to geocode
 * @returns Promise resolving to coordinates
 */
export const geocodeLocation = async (locationString: string): Promise<GeocodingResult | null> => {
  console.log('🌍 Starting geocoding for:', locationString);
  
  if (!locationString || locationString.trim() === '') {
    console.error('❌ Empty location string provided for geocoding');
    return null;
  }
  
  // Clean input
  const searchQuery = locationString.trim();
  console.log(`🔍 Processing geocoding for: "${searchQuery}"`);
  
  // Try multiple approaches in sequence to maximize chance of success
  
  // First, try UK locations database (fastest and most reliable for UK locations)
  // This now includes our enhanced database with Holmes Chapel, West Byfleet, etc.
  const ukCoords = getUKLocationCoordinates(searchQuery);
  if (ukCoords) {
    console.log(`✅ Found "${searchQuery}" in UK locations database:`, ukCoords);
    return ukCoords;
  }
  
  // Second, try Google Maps API if available (accurate but can be slow)
  if (isGoogleMapsReady()) {
    try {
      console.log('🗺️ Attempting Google Maps geocoding...');
      const googleCoords = await geocodeWithGoogleMaps(searchQuery);
      if (googleCoords) {
        console.log('✅ Successfully geocoded with Google Maps:', googleCoords);
        return googleCoords;
      }
    } catch (error) {
      console.error('❌ Google Maps geocoding failed:', error);
    }
  } else {
    console.log('⏭️ Google Maps API not ready, skipping direct geocoding');
  }

  // Last resort: Generate approximate coordinates based on the search string
  console.log(`🔄 Using fallback geocoding for: "${searchQuery}"`);
  return generateApproximateCoordinates(searchQuery);
};

/**
 * Helper function to geocode using Google Maps API
 */
async function geocodeWithGoogleMaps(address: string): Promise<GeocodingResult | null> {
  if (!window.google?.maps?.Geocoder) {
    console.log('❌ Google Maps Geocoder not available');
    return null;
  }

  return new Promise((resolve) => {
    try {
      const geocoder = new window.google.maps.Geocoder();
      
      // Add UK component restriction to improve accuracy for UK searches
      const request = {
        address,
        componentRestrictions: {
          country: 'GB' // UK/Great Britain country code
        }
      };
      
      console.log('🗺️ Sending request to Google Geocoder:', request);
      
      geocoder.geocode(
        request,
        (results, status) => {
          console.log('🗺️ Google Geocoder response:', { status, resultsCount: results?.length || 0 });
          
          if (status === 'OK' && results && results.length > 0) {
            const location = results[0].geometry.location;
            const result = {
              lat: location.lat(),
              lng: location.lng()
            };
            console.log(`✅ Google geocoded "${address}" to:`, result);
            resolve(result);
          } else {
            console.warn(`⚠️ Google geocoding error for "${address}":`, status);
            resolve(null);
          }
        }
      );
    } catch (error) {
      console.error('❌ Exception in Google geocoder:', error);
      resolve(null);
    }
  });
}
