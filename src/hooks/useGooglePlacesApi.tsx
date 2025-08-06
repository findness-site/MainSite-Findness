
import { useState, useEffect } from 'react';

interface PlaceSuggestion {
  id: string;
  name: string;
  description?: string;
}

export const useGooglePlacesApi = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Initialize the Google Places API script
  useEffect(() => {
    // Skip if the API is already loaded
    if (window.google?.maps?.places) {
      console.log('Google Maps API already loaded');
      setIsLoaded(true);
      return;
    }
    
    // Ensure we don't load the script multiple times
    const existingScript = document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]');
    if (existingScript) {
      console.log('Google Maps API script already loading');
      
      // Check periodically if API has loaded
      const checkInterval = setInterval(() => {
        if (window.google?.maps?.places) {
          console.log('Google Maps API detected as loaded');
          setIsLoaded(true);
          clearInterval(checkInterval);
        }
      }, 200);
      
      // Clear interval after 10 seconds to prevent infinite checking
      setTimeout(() => {
        clearInterval(checkInterval);
        if (!isLoaded) {
          console.error('Failed to detect Google Maps API loading after timeout');
          setError('API loading timeout');
        }
      }, 10000);
      
      return;
    }

    // Define the callback function
    window.initGoogleMaps = () => {
      console.log('Google Maps API initialized via callback');
      setIsLoaded(true);
    };

    // Load the script if not already loading or loaded
    console.log('Loading Google Maps API with explicit callback...');
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD5dUoQUfl6ZdvH-5CN_JBDURTepm8sCJk&libraries=places&callback=initGoogleMaps`;
    script.async = true;
    script.defer = true;
    
    script.onerror = () => {
      console.error('Failed to load Google Places API');
      setError('Failed to load Google Places API');
    };
    
    document.head.appendChild(script);
    
    return () => {
      // Clean up the script if component unmounts before script loads
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
      // Clean up the global callback
      delete window.initGoogleMaps;
    };
  }, [isLoaded]);

  // Function to get place suggestions from Google Places API
  const getPlaceSuggestions = async (query: string): Promise<PlaceSuggestion[]> => {
    if (!isLoaded || error) {
      console.error('Google Places API not loaded:', error);
      return [];
    }
    
    if (!query || query.trim().length < 2) return [];
    
    console.log('Getting place suggestions for query:', query);
    
    return new Promise((resolve) => {
      try {
        const service = new window.google.maps.places.AutocompleteService();
        
        const request = {
          input: query,
          componentRestrictions: { country: 'gb' }, // Restrict to United Kingdom
          types: ['geocode', 'establishment'] // Get locations and places
        };
        
        service.getPlacePredictions(
          request,
          (predictions, status) => {
            if (status !== window.google.maps.places.PlacesServiceStatus.OK || !predictions) {
              console.warn('Google Places API returned no results or error:', status);
              resolve([]);
              return;
            }
            
            const suggestions: PlaceSuggestion[] = predictions.map(prediction => ({
              id: prediction.place_id,
              name: prediction.structured_formatting?.main_text || prediction.description.split(',')[0],
              description: prediction.description // Keep the FULL description for geocoding
            }));
            
            console.log('Processed suggestions with full data:', suggestions);
            resolve(suggestions);
          }
        );
      } catch (err) {
        console.error('Error in getPlacePredictions:', err);
        resolve([]);
      }
    });
  };
  
  return {
    isLoaded,
    error,
    getPlaceSuggestions
  };
};

// Add Google Maps types to the Window interface
declare global {
  interface Window {
    google: {
      maps: {
        places: {
          AutocompleteService: new () => {
            getPlacePredictions: (
              request: { 
                input: string; 
                componentRestrictions?: { country: string };
                types?: string[];
              },
              callback: (
                predictions: Array<{
                  place_id: string;
                  description: string;
                  structured_formatting?: {
                    main_text: string;
                    secondary_text: string;
                  }
                }> | null,
                status: string
              ) => void
            ) => void;
          };
          PlacesServiceStatus: {
            OK: string;
          };
        };
        Geocoder: new () => {
          geocode: (
            request: { 
              address?: string;
              location?: { lat: number; lng: number };
              componentRestrictions?: { country: string };
            },
            callback: (
              results: Array<{
                geometry: {
                  location: {
                    lat: () => number;
                    lng: () => number;
                  }
                };
                formatted_address: string;
              }> | null,
              status: string
            ) => void
          ) => void;
        };
        GeocoderStatus: {
          OK: string;
        };
      };
    };
    initGoogleMaps: () => void;
  }
}
