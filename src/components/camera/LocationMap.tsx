
import React from 'react';

interface LocationMapProps {
  location: { lat: number; lng: number; name?: string };
}

const LocationMap = ({ location }: LocationMapProps) => {
  return (
    <iframe
      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${location.lat},${location.lng}&zoom=15`}
      className="w-full rounded-t-[30px] shadow-lg mb-4"
      style={{ height: "302px", border: 0 }}
      allowFullScreen
      loading="lazy"
    />
  );
};

export default LocationMap;
