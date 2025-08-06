
/**
 * Helper functions for interacting with the Google Maps API
 */

/**
 * Check if Google Maps API is fully loaded and ready to use
 */
export const isGoogleMapsReady = (): boolean => {
  return !!(
    window.google &&
    window.google.maps &&
    window.google.maps.Geocoder
  );
};
