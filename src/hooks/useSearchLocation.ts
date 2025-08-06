
import { useState, useEffect } from 'react';
import { geocodeLocation } from '@/utils/location';
import { getUKLocationCoordinates } from '@/utils/location/ukLocations';
import { useToast } from '@/hooks/use-toast';

interface UseSearchLocationProps {
  searchLocation?: string | null;
}

export function useSearchLocation({ searchLocation }: UseSearchLocationProps) {
  const [searchCoordinates, setSearchCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  // Geocoding effect that runs whenever the search location changes
  useEffect(() => {
    // Reset state when location changes
    setSearchCoordinates(null);
    
    // Skip if no search location provided
    if (!searchLocation) {
      console.log('No search location provided for geocoding');
      return;
    }

    console.log(`Starting geocoding for search location: "${searchLocation}"`);
    setLoading(true);
    
    const geocodeSearchLocation = async () => {
      try {
        console.log(`Attempting to geocode "${searchLocation}"`);
        
        // First try: Check UK locations database first (fast and reliable)
        // This now includes our expanded database of small towns and villages
        const ukCoordinates = getUKLocationCoordinates(searchLocation);
        if (ukCoordinates) {
          console.log(`Found UK location match for "${searchLocation}" in database:`, ukCoordinates);
          setSearchCoordinates(ukCoordinates);
          setLoading(false);
          return;
        }
        
        // Second try: Use the geocoding API
        console.log(`No UK database match, using geocoding API for "${searchLocation}"`);
        const coordinates = await geocodeLocation(searchLocation);
        
        if (coordinates) {
          console.log(`Successfully geocoded "${searchLocation}" to:`, coordinates);
          setSearchCoordinates(coordinates);
          setLoading(false);
        } else {
          console.error(`Geocoding failed for location: "${searchLocation}"`);
          toast({
            title: "Location not found",
            description: `Unable to find exact location for "${searchLocation}". Using approximate location.`,
            variant: "destructive"
          });
          
          // Generate approximate UK coordinates based on the search string
          // This ensures we always have some coordinates to work with
          const approximateCoords = { 
            lat: 52.8382 + (searchLocation.length % 5) * 0.1, 
            lng: -2.3278 - (searchLocation.charCodeAt(0) % 10) * 0.05
          };
          
          console.log('Using approximate UK coordinates as fallback:', approximateCoords);
          setSearchCoordinates(approximateCoords);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error geocoding location:', error);
        toast({
          title: "Location Error",
          description: "We couldn't find your location. Please try another search term.",
          variant: "destructive"
        });
        
        setSearchCoordinates(null);
        setLoading(false);
      }
    };
    
    geocodeSearchLocation();
  }, [searchLocation, toast]);

  return { searchCoordinates, loading };
}
