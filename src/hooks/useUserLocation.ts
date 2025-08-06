
import { useState, useEffect } from 'react';

export function useUserLocation() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    console.log('Attempting to get user geolocation');
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(coords);
          console.log('User geolocation obtained:', coords);
        },
        (error) => {
          console.error("Error getting user location:", error);
          // Default to NYC if geolocation fails
          setUserLocation({ lat: 40.7128, lng: -74.0060 });
          console.log('Using default location (NYC) due to geolocation error');
        }
      );
    } else {
      // Default to NYC if geolocation not available
      setUserLocation({ lat: 40.7128, lng: -74.0060 });
      console.log('Using default location (NYC) as geolocation is not available');
    }
  }, []);

  return userLocation;
}
