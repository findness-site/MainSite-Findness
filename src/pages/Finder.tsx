
import React, { useState } from 'react';
import Logo from './components/Logo';
import Header from './components/Header';
import BlueSection from './components/BlueSection';
import LostSection from './components/LostSection';
import ValueableItemWarning from './components/ValueableItemWarning';
import UsernameInput from './components/UsernameInput';
import CameraButton from './components/CameraButton';

const Finder = () => {
  const [username, setUsername] = useState('');
  const [showValueableWarning, setShowValueableWarning] = useState(true);

  const handlePageClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      e.stopPropagation();
    }
  };

  return (
    <div 
      className="min-h-[calc(100vh-150px)]"
      style={{ minHeight: 'calc(100vh - 150px)' }} 
      onClick={handlePageClick}
      onTouchStart={(e) => {
        if (e.target === e.currentTarget) {
          e.stopPropagation();
        }
      }}
    >
      {showValueableWarning && (
        <ValueableItemWarning onClose={() => setShowValueableWarning(false)} />
      )}
      <UsernameInput username={username} setUsername={setUsername} />
      <CameraButton username={username} />
      <Logo page="finder" />
      <Header showText={false} />
      <BlueSection showPanel={false} showTeddy={false} showText={false} page="finder" />
      <LostSection showFedora={false} showText={false} page="finder" />
    </div>
  );
};

export default Finder;
