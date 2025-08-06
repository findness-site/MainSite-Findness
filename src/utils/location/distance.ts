
/**
 * Utility functions for calculating distances between geographic coordinates
 */

/**
 * Calculate the distance between two geographic coordinates using the Haversine formula
 * @param lat1 Latitude of first point
 * @param lng1 Longitude of first point
 * @param lat2 Latitude of second point
 * @param lng2 Longitude of second point
 * @returns Distance in miles
 */
export const calculateDistance = (
  lat1: number, 
  lng1: number, 
  lat2: number, 
  lng2: number
): number => {
  // Quick validation to avoid errors
  if (isNaN(lat1) || isNaN(lng1) || isNaN(lat2) || isNaN(lng2)) {
    console.error('Invalid coordinates in calculateDistance:', { lat1, lng1, lat2, lng2 });
    return Infinity;
  }

  // Check for reasonable coordinate values
  if (Math.abs(lat1) > 90 || Math.abs(lat2) > 90 || Math.abs(lng1) > 180 || Math.abs(lng2) > 180) {
    console.error('Coordinates out of valid range in calculateDistance:', { lat1, lng1, lat2, lng2 });
    return Infinity;
  }

  // Haversine formula implementation
  const R = 3958.8; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  
  // Ensure finite value
  return isFinite(distance) ? distance : Infinity;
};
