
import React, { useState, useEffect } from 'react';
import { Camera as CameraIcon, CameraOff, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from './components/Logo';
import Header from './components/Header';
import BlueSection from './components/BlueSection';
import LostSection from './components/LostSection';

const Thanks = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [location_, setLocation_] = useState<{ lat: number; lng: number } | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const photo = location.state?.photo || null;
  const username = location.state?.username || '';

  useEffect(() => {
    console.log("Thanks page received state:", location.state);
    console.log("Photo:", photo);
    console.log("Username:", username);
    console.log("Username type:", typeof username);
    console.log("Username length:", username?.length);
  }, [location.state, photo, username]);

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

  const handleSignUp = () => {
    navigate('/join', { state: { username } });
  };

  const handleBackToHomepage = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen w-full bg-cream-bg relative pb-[140px] pt-[10px]">
      <div className="w-full flex flex-col items-center pt-[14px] mt-[10px]">
        <div className="px-10 w-full">
          {error ? (
            <div
              className="w-full rounded-t-[30px] shadow-lg mb-4 bg-gray-200 flex flex-col items-center justify-center"
              style={{ height: '302px' }}
            >
              <CameraOff size={48} className="text-gray-500 mb-4" />
              <p className="text-gray-700 text-center px-4">{error}</p>
            </div>
          ) : showMap && location_ ? (
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${location_.lat},${location_.lng}&zoom=15`}
              className="w-full rounded-t-[30px] shadow-lg mb-4"
              style={{ height: '302px', border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          ) : photo ? (
            <div className="w-full relative bottom-[90px] h-[530px] flex items-center justify-center mt-[10px]" style={{ top: '-100px' }}>
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-t-[30px]">
                  <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              <img
                src={photo}
                alt="The photo you just posted"
                className={`w-full object-cover ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  height: '100%',
                  width: 'auto',
                  maxWidth: '100%',
                  transition: 'opacity 0.3s ease'
                }}
                loading="eager"
                onLoad={() => setImageLoaded(true)}
              />
            </div>
          ) : (
            <div
              className="w-full rounded-t-[30px] shadow-lg mb-4 bg-gray-200 flex flex-col items-center justify-center"
              style={{ height: '302px' }}
            >
              <CameraOff size={48} className="text-gray-500 mb-4" />
              <p className="text-gray-700 text-center px-4">Photo not available.</p>
            </div>
          )}
          <div className="flex flex-col justify-center px-[0px] w-full space-y-4 relative bottom-[120px] mt-[10px]">
            <Button
              onClick={handleSignUp}
              style={{
                backgroundColor: showMap ? '#90b5cd' : '#2977b7',
                transform: 'translateY(-10px)'
              }}
              className={`hover:${showMap ? 'bg-[#7fa4bc]' : 'bg-[#2266a0]'} w-full py-[30px] font-nunito text-xl font-normal text-[#f7f4e3] px-[156px] rounded-none rounded-bl-[30px]`}
            >
              Join our community
            </Button>

            <div style={{ marginTop: '20px', transform: 'translateY(-10px)' }}>
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
      </div>

      <Logo />
      <Header showText={false} />
      <BlueSection showPanel={false} showTeddy={false} showText={false} />
      <LostSection showFedora={false} showText={false} showButton={false} />
    </div>
  );
};

export default Thanks;
