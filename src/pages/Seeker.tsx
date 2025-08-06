
import React, { useState, useCallback } from 'react';
import Logo from './components/Logo';
import Header from './components/Header';
import BlueSection from './components/BlueSection';
import LostSection from './components/LostSection';
import CameraButton from './components/CameraButton';
import PostsFeed from './components/PostsFeed';
import LocationSearchForm from './components/LocationSearchForm';
import { useToast } from '@/hooks/use-toast';

const Seeker = () => {
  const [searchLocation, setSearchLocation] = useState<string | null>(null);
  const [searchRadius, setSearchRadius] = useState<number>(10);
  const [searchKey, setSearchKey] = useState<number>(0); // Key for forcing remount
  const { toast } = useToast();

  const handleSearch = useCallback((data: { location: string; radius: number }) => {
    console.log('Search requested with parameters:', data);
    
    if (!data.location || data.location.trim() === '') {
      toast({
        title: "Search error",
        description: "Please enter a valid location",
        variant: "destructive"
      });
      return;
    }
    
    // Store the exact search parameters
    const location = data.location.trim();
    const radius = data.radius;
    
    // Update state
    setSearchLocation(location);
    setSearchRadius(radius);
    
    // Force remount of PostsFeed by updating key
    setSearchKey(prevKey => prevKey + 1);
    
    console.log(`Search initiated for "${location}" with radius ${radius} miles (key: ${searchKey + 1})`);
    
    toast({
      title: "Searching",
      description: `Looking for items near ${location}`,
      variant: "default"
    });
  }, [toast, searchKey]);

  return (
    <div className="pb-0 mb-[-94px]" style={{ transform: 'translateY(-100px)' }}>
      <CameraButton username="" />
      <Header showText={false} />
      <BlueSection showPanel={false} showTeddy={false} showText={false} page="seeker" />
      <LostSection 
        showFedora={false} 
        showText={false} 
        page="seeker" 
      />
      
      <div className="mt-[90px] px-4">
        <LocationSearchForm onSearch={handleSearch} />
      </div>

      <div className="mt-4">
        <PostsFeed 
          key={`search-${searchKey}`}
          searchLocation={searchLocation}
          searchRadius={searchRadius}
          showAllByDefault={true} // Always show all posts by default
        />
      </div>
      <Logo page="seeker" />
    </div>
  );
};

export default Seeker;
