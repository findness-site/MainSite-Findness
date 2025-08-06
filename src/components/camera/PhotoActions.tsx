
import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, MapPinOff } from 'lucide-react';

interface PhotoActionsProps {
  photo: string | null;
  showMap: boolean;
  location: { lat: number; lng: number } | null;
  onTakePhoto: () => void;
  onRetakePhoto: () => void;
  onShowLocation: () => void;
  onCreatePost: () => void;
}

const PhotoActions = ({ 
  photo, 
  showMap, 
  location,
  onTakePhoto, 
  onRetakePhoto, 
  onShowLocation, 
  onCreatePost 
}: PhotoActionsProps) => {
  return (
    <div className="flex flex-col justify-center px-[0px] w-full space-y-4">
      <Button 
        onClick={photo ? onRetakePhoto : onTakePhoto} 
        style={{ backgroundColor: photo ? '#90b5cd' : '#2977b7' }} 
        className={`hover:${photo ? 'bg-[#7fa4bc]' : 'bg-[#2266a0]'} w-full py-[30px] font-nunito text-xl font-normal text-[#f7f4e3] px-[141px] rounded-none rounded-bl-[30px]`}
      >
        {photo ? 'Retake' : 'Take a photo'}
      </Button>
      <Button 
        onClick={onShowLocation}
        disabled={!photo}
        style={{ backgroundColor: showMap ? '#90b5cd' : '#2977b7' }} 
        className={`hover:${showMap ? 'bg-[#7fa4bc]' : 'bg-[#2266a0]'} w-full py-[30px] font-nunito text-xl font-normal text-[#f7f4e3] px-[141px] rounded-none rounded-bl-[30px] relative`}
      >
        <span>
          {showMap ? 'Update location' : 'Add location'}
        </span>
        {location && (
          <MapPin className="h-5 w-5 inline-block -ml-[2px] -translate-y-[1px]" />
        )}
        {!location && photo && (
          <MapPin className="h-5 w-5 inline-block -ml-[2px] -translate-y-[1px]" />
        )}
      </Button>
      <Button 
        onClick={onCreatePost}
        disabled={!photo || !location}
        style={{ backgroundColor: '#2977b7', opacity: (!photo || !location) ? 0.5 : 1 }} 
        className="hover:bg-[#2266a0] w-full py-[30px] font-nunito text-xl font-normal text-[#f7f4e3] px-[141px] rounded-none rounded-bl-[30px]"
      >
        Create post
      </Button>
    </div>
  );
};

export default PhotoActions;
