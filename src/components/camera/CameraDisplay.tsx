
import React from 'react';
import { CameraOff } from 'lucide-react';

interface CameraDisplayProps {
  error: string | null;
  videoRef: React.RefObject<HTMLVideoElement>;
  photo: string | null;
}

const CameraDisplay = ({ error, videoRef, photo }: CameraDisplayProps) => {
  if (error) {
    return (
      <div 
        className="w-full rounded-t-[30px] shadow-lg mb-4 bg-gray-200 flex flex-col items-center justify-center p-4" 
        style={{ height: '302px' }}
      >
        <CameraOff size={48} className="text-gray-500 mb-4" />
        <p className="text-gray-700 text-center px-4">{error}</p>
      </div>
    );
  }

  if (photo) {
    return (
      <img 
        src={photo} 
        alt="Captured photo" 
        className="w-full rounded-t-[30px] shadow-lg mb-4" 
        style={{ height: '302px', objectFit: 'cover' }}
      />
    );
  }

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted
      className="w-full rounded-t-[30px] shadow-lg mb-4"
      style={{ height: '302px', objectFit: 'cover' }}
    />
  );
};

export default CameraDisplay;
