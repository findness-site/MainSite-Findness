import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Logo from './components/Logo';
import Header from './components/Header';
import BlueSection from './components/BlueSection';
import LostSection from './components/LostSection';
import LocationDisplay from '@/components/auth/LocationDisplay';

const Welcome = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [location_, setLocation_] = useState<{ lat: number; lng: number } | null>(null);

  const handleBackToHomepage = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen w-full bg-cream-bg relative pb-[100px]">
      <div className="w-full flex flex-col items-center pt-[14px]">
        <div className="px-10 w-full">
          <LocationDisplay 
            error={error}
            showMap={showMap}
            location={location_}
          />
          
          <p className="font-nunito text-[26.9px] font-light text-left mb-4 text-[#2977b7] mt-[200px]" style={{ lineHeight: '1.25' }}>
            Welcome to our<br />
            <span className="font-semibold">helpful media</span> community
          </p>
          <div className="flex flex-col justify-center px-[0px] w-full space-y-4">
            <Button 
              onClick={handleBackToHomepage}
              style={{ backgroundColor: '#2977b7' }} 
              className="hover:bg-[#2266a0] w-full py-[30px] font-nunito text-xl font-normal text-[#f7f4e3] px-[156px] rounded-none rounded-bl-[30px]"
            >
              Sign in
            </Button>
            <Button 
              onClick={handleBackToHomepage}
              style={{ backgroundColor: '#2977b7' }} 
              className="hover:bg-[#2266a0] w-full py-[30px] font-nunito text-xl font-normal text-[#f7f4e3] px-[156px] rounded-none rounded-bl-[30px]"
            >
              Back to homepage
            </Button>
          </div>
        </div>
      </div>

      <Logo page="welcome" />
      <Header showText={false} />
      <BlueSection showPanel={false} showTeddy={false} showText={false} />
      <LostSection showFedora={false} showText={false} showButton={false} />
    </div>
  );
};

export default Welcome;
