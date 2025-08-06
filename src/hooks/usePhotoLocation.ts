
import { useState } from 'react';
import { toast } from "@/hooks/use-toast";

interface Location {
  lat: number;
  lng: number;
  name?: string;
}

interface UsePhotoLocationReturn {
  location: Location | null;
  showMap: boolean;
  setShowMap: (show: boolean) => void;
  getLocation: () => void;
}

export function usePhotoLocation(): UsePhotoLocationReturn {
  const [location, setLocation] = useState<Location | null>(null);
  const [showMap, setShowMap] = useState(false);

  const getLocation = () => {
    if (showMap) {
      setShowMap(false);
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          try {
            // Parse coordinates to ensure they are proper numbers
            const lat = parseFloat(position.coords.latitude.toString());
            const lng = parseFloat(position.coords.longitude.toString());
            
            // Validate parsed values
            if (isNaN(lat) || isNaN(lng)) {
              throw new Error("Invalid coordinates received from geolocation API");
            }
            
            // Format the location data with proper typing
            const locationData: Location = {
              lat,
              lng,
              name: `Location at ${lat.toFixed(6)}, ${lng.toFixed(6)}`
            };
            
            console.log("Captured user location:", JSON.stringify(locationData));
            console.log("Location value check - lat:", locationData.lat, "lng:", locationData.lng);
            
            setLocation(locationData);
            setShowMap(true);
          } catch (err) {
            console.error("Error processing geolocation data:", err);
            toast({
              title: "Location Processing Error",
              description: "There was a problem with your location data. Please try again."
            });
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          toast({
            title: "Location Access Failed",
            description: "Unable to access location. Please ensure you've granted location permission."
          });
        }
      );
    } else {
      toast({
        title: "Location Not Supported",
        description: "Geolocation is not supported by your browser."
      });
    }
  };

  return {
    location,
    showMap,
    setShowMap,
    getLocation
  };
}
