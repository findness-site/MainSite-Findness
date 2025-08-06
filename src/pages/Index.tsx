
import React from 'react';
import Logo from './components/Logo';
import Header from './components/Header';
import BlueSection from './components/BlueSection';
import ActionButton from './components/ActionButton';
import LostSection from './components/LostSection';
import SignIn from './components/SignIn';

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-cream-bg relative">
      <Logo page="index" />
      <Header />
      <BlueSection page="index" />
      <ActionButton
        imageSrc='/images/findness_image_5.png'
        imageAlt="BEIGE_BUT_CUR"
        text="Help it find its way home"
        textColor="#2977b7"
        destination="/finder"
        style={{
          position: 'absolute',
          top: 'calc(40px + 25pt * 1.2 + 40px + 80px + 15px + 18pt * 1.2 + 10px - 28px)',
          left: 'calc(40px - 30px)',
          zIndex: 21,
        }}
      />
      <LostSection page="index" />
      <SignIn />
    </div>
  );
};

export default Index;
