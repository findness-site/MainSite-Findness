import React, { useState, useEffect } from 'react';
import { Post } from '@/data/data_types';

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const [showMap, setShowMap] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (showMap && !userLocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, [showMap]);

  const toggleMap = () => {
    setShowMap(!showMap);
  };

  const getDirectionsUrl = () => {
    if (!userLocation || !post.location) return '';
    return `https://www.google.com/maps/embed/v1/directions?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&origin=${userLocation.lat},${userLocation.lng}&destination=${post.location.lat},${post.location.lng}&mode=walking`;
  };

  return (
    <div className="w-full flex flex-col items-center mb-8 px-10">
      <div className="w-full relative">
        {post.image_url ? (
          <div 
            className="relative w-full rounded-[30px] shadow-lg cursor-pointer"
            onClick={toggleMap}
          >
            {showMap && post.location ? (
              <iframe
                src={userLocation ? getDirectionsUrl() : `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${post.location.lat},${post.location.lng}&zoom=15`}
                className="w-full rounded-t-[30px]"
                style={{ height: '302px', border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            ) : (
              <img 
                src={post.image_url} 
                alt={`Post by ${post.username}`}
                className="w-full rounded-t-[30px]" 
                style={{ height: '302px', objectFit: 'cover' }}
              />
            )}
            <div 
              className="absolute bottom-0 left-0 w-full" 
              style={{ 
                backgroundColor: '#2977b7'
              }}
            >
              {/* Username bar */}
              <div 
                className="flex items-center justify-center px-4" 
                style={{ height: '35px' }}
              >
                <span className="text-[#f7f4e3] font-nunito text-sm">
                  {post.username ? `Kindly posted by ${post.username}` : "Kindly posted by a stranger"}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div 
            className="w-full rounded-[30px] shadow-lg bg-gray-200 flex flex-col items-center justify-center" 
            style={{ height: '302px' }}
          >
            <p className="text-gray-700 text-center px-4">No photo available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
