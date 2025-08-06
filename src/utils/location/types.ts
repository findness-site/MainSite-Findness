import { GeocodingResult } from './types';
import { isGoogleMapsReady } from './googleMapsHelpers';

/**
 * Reverse geocode coordinates to get a human-readable location name
 * @param lat Latitude
 * @param lng Longitude
 * @returns Promise resolving to location name
 */
export const reverseGeocode = async (lat: number, lng: number): Promise<string | null> => {
  console.log(`Reverse geocoding coordinates: ${lat}, ${lng}`);
  
  // First try Google Maps reverse geocoding if available
  if (isGoogleMapsReady()) {
    try {
      const googleResult = await reverseGeocodeWithGoogle(lat, lng);
      if (googleResult) {
        console.log(`Google reverse geocoding result: ${googleResult}`);
        return googleResult;
      }
    } catch (error) {
      console.error('Google reverse geocoding failed:', error);
    }
  }
  
  // Fallback to UK location database matching
  return getUKLocationNameFromCoordinates(lat, lng);
};

/**
 * Use Google Maps to reverse geocode coordinates
 */
async function reverseGeocodeWithGoogle(lat: number, lng: number): Promise<string | null> {
  if (!window.google?.maps?.Geocoder) {
    return null;
  }

  return new Promise((resolve) => {
    const geocoder = new window.google.maps.Geocoder();
    const latlng = { lat, lng };
    
    geocoder.geocode(
      { 
        location: latlng,
        componentRestrictions: { country: 'GB' }
      },
      (results, status) => {
        if (status === 'OK' && results && results.length > 0) {
          // Look for the most specific location type
          for (const result of results) {
            // Use proper Google Maps API type checking with any to handle complex Google types
            const googleResult = result as any;
            if (googleResult.address_components) {
              const components = googleResult.address_components;
              
              // Try to find locality, postal_town, or administrative_area_level_2
              for (const component of components) {
                if (component.types.includes('locality') || 
                    component.types.includes('postal_town') ||
                    component.types.includes('administrative_area_level_2')) {
                  resolve(component.long_name);
                  return;
                }
              }
            }
          }
          
          // Fallback to the first result's formatted address
          const firstResult = results[0].formatted_address;
          const parts = firstResult.split(',');
          resolve(parts[0].trim());
        } else {
          resolve(null);
        }
      }
    );
  });
}

/**
 * Fallback method to get UK location name from coordinates using our database
 */
function getUKLocationNameFromCoordinates(lat: number, lng: number): string {
  // Define major UK cities with their approximate coordinate ranges
  const ukCities = [
    { name: 'London', lat: [51.28, 51.70], lng: [-0.51, 0.33] },
    { name: 'Birmingham', lat: [52.30, 52.70], lng: [-2.20, -1.70] },
    { name: 'Manchester', lat: [53.30, 53.70], lng: [-2.50, -2.00] },
    { name: 'Liverpool', lat: [53.25, 53.55], lng: [-3.20, -2.70] },
    { name: 'Leeds', lat: [53.60, 54.00], lng: [-1.80, -1.30] },
    { name: 'Sheffield', lat: [53.20, 53.60], lng: [-1.70, -1.20] },
    { name: 'Bristol', lat: [51.30, 51.60], lng: [-2.80, -2.40] },
    { name: 'Newcastle', lat: [54.80, 55.20], lng: [-1.80, -1.40] },
    { name: 'Nottingham', lat: [52.80, 53.10], lng: [-1.40, -0.90] },
    { name: 'Leicester', lat: [52.50, 52.80], lng: [-1.30, -0.90] },
    { name: 'Cardiff', lat: [51.30, 51.70], lng: [-3.50, -3.00] },
    { name: 'Edinburgh', lat: [55.80, 56.10], lng: [-3.50, -3.00] },
    { name: 'Glasgow', lat: [55.70, 56.00], lng: [-4.50, -4.00] },
    { name: 'Belfast', lat: [54.45, 54.75], lng: [-6.20, -5.70] },
  ];
  
  // Find the closest matching city
  for (const city of ukCities) {
    if (lat >= city.lat[0] && lat <= city.lat[1] && 
        lng >= city.lng[0] && lng <= city.lng[1]) {
      return city.name;
    }
  }
  
  // If no specific city found, return a generic UK location
  return 'UK Location';
}
