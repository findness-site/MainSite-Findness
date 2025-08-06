
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { useCamera } from '@/hooks/useCamera';
import { usePhotoLocation } from '@/hooks/usePhotoLocation';
import CameraDisplay from '@/components/camera/CameraDisplay';
import PhotoActions from '@/components/camera/PhotoActions';
import LocationMap from '@/components/camera/LocationMap';
import ValueableItemWarning from './components/ValueableItemWarning';
import Logo from './components/Logo';
import { reverseGeocode } from '@/utils/location/reverseGeocoding';

const Camera = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showValueableWarning, setShowValueableWarning] = useState(false);
  
  const { 
    videoRef, 
    photo, 
    error,
    takePhoto,
    stopCamera,
    startCamera
  } = useCamera();
  
  const { location, showMap, setShowMap, getLocation } = usePhotoLocation();

  // Enhanced location processing with reverse geocoding
  const [processedLocation, setProcessedLocation] = useState<{
    lat: number;
    lng: number;
    name: string;
  } | null>(null);

  useEffect(() => {
    const processLocation = async () => {
      if (location) {
        console.log('Processing location with reverse geocoding:', location);
        
        try {
          // Try to get a human-readable location name
          const locationName = await reverseGeocode(location.lat, location.lng);
          
          const processed = {
            lat: location.lat,
            lng: location.lng,
            name: locationName || location.name || `Location at ${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}`
          };
          
          console.log('Processed location:', processed);
          setProcessedLocation(processed);
        } catch (error) {
          console.error('Error processing location:', error);
          // Fallback to coordinates
          setProcessedLocation({
            lat: location.lat,
            lng: location.lng,
            name: location.name || `Location at ${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}`
          });
        }
      }
    };

    processLocation();
  }, [location]);

  const handleRetake = () => {
    stopCamera();
    startCamera();
  };

  const handleCreatePost = () => {
    if (!photo) {
      toast({
        title: "No photo",
        description: "Please take a photo first",
        variant: "destructive"
      });
      return;
    }

    if (!processedLocation) {
      toast({
        title: "Location not available",
        description: "Please wait for location to be detected",
        variant: "destructive"
      });
      return;
    }

    console.log('Creating post with processed location:', processedLocation);

    navigate('/post', { 
      state: { 
        photo: photo, 
        username: '',
        location: processedLocation
      } 
    });
  };

  return (
    <div className="min-h-screen bg-cream-bg">
      <div className="container mx-auto pl-[42px] pr-11 py-8">
        
        <div className="max-w-md mx-auto space-y-6">
          {showMap && processedLocation ? (
            <LocationMap
              location={{
                lat: processedLocation.lat,
                lng: processedLocation.lng,
                name: processedLocation.name
              }}
            />
          ) : (
            <CameraDisplay
              error={error}
              videoRef={videoRef}
              photo={photo}
            />
          )}
          
          <PhotoActions
            photo={photo}
            showMap={showMap}
            location={processedLocation ? {
              lat: processedLocation.lat,
              lng: processedLocation.lng
            } : null}
            onTakePhoto={takePhoto}
            onRetakePhoto={handleRetake}
            onShowLocation={getLocation}
            onCreatePost={handleCreatePost}
          />
        </div>
      </div>
      
      {showValueableWarning && (
        <ValueableItemWarning 
          onClose={() => setShowValueableWarning(false)}
        />
      )}
      
      <Logo />
    </div>
  );
};

export default Camera;
