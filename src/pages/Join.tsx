
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from './components/Logo';
import Header from './components/Header';
import BlueSection from './components/BlueSection';
import LostSection from './components/LostSection';
import SignUpForm from '@/components/auth/SignUpForm';
import LocationDisplay from '@/components/auth/LocationDisplay';
import * as z from 'zod';
import { formSchema } from '@/components/auth/SignUpForm';

const Join = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialUsername = location.state?.username || '';
  const [error, setError] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [location_, setLocation_] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    console.log("Join page received state:", location.state);
    console.log("Username from state:", initialUsername);
    console.log("Username type:", typeof initialUsername);
    console.log("Username length:", initialUsername?.length);
  }, [location.state, initialUsername]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  const showLocation = () => {
    if (showMap) {
      setShowMap(false);
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation_({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setShowMap(true);
        },
        (error) => {
          console.error("Error getting location:", error);
          setError("Unable to access location. Please ensure you've granted location permission.");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

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

          {!showMap && !error && <SignUpForm onSubmit={onSubmit} initialUsername={initialUsername} />}
          
          <div className="flex flex-col justify-center px-[0px] w-full space-y-4 mt-[20px]">
            <Button 
              onClick={handleBackToHomepage}
              style={{ backgroundColor: '#2977b7' }} 
              className="w-full max-w-md hover:bg-[#2266a0] py-[30px] font-nunito text-xl font-normal text-[#f7f4e3] rounded-none rounded-bl-[30px] mx-auto"
            >
              Back to homepage
            </Button>
          </div>
        </div>
      </div>

      <Logo />
      <Header showText={false} />
      <BlueSection showPanel={false} showTeddy={false} showText={false} />
      <LostSection showFedora={false} showText={false} showButton={false} />
    </div>
  );
};

export default Join;

