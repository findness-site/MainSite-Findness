import React from 'react';
import { CameraOff } from 'lucide-react';

interface LocationDisplayProps {
  error: string | null;
  showMap: boolean;
  location: { lat: number; lng: number } | null;
}

const LocationDisplay = ({ error, showMap, location }: LocationDisplayProps) => {
  if (error) {
    return (
      <div 
        className="w-full rounded-t-[30px] shadow-lg mb-4 bg-gray-200 flex flex-col items-center justify-center" 
        style={{ height: '302px' }}
      >
        <CameraOff size={48} className="text-gray-500 mb-4" />
        <p className="text-gray-700 text-center px-4">{error}</p>
      </div>
    );
  }

  if (showMap && location) {
    return (
      <iframe
        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${location.lat},${location.lng}&zoom=15`}
        className="w-full rounded-t-[30px] shadow-lg mb-4"
        style={{ height: '302px', border: 0 }}
        allowFullScreen
        loading="lazy"
      />
    );
  }

  return null;
};

export default LocationDisplay;
