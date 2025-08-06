
import React from 'react';

interface HeaderProps {
  showText?: boolean;
}

const Header = ({ showText = true }: HeaderProps) => {
  return (
    <div
      className="font-nunito text-[#2977b7]"
      style={{
        position: 'absolute',
        top: 40,
        left: 40,
        fontSize: '23pt', // Increased from 22.5pt to 23pt
        lineHeight: '1.2',
        maxWidth: '80%',
      }}
    >
      {showText && (
        <>
          <span className="font-normal">findness</span>
          <span className="font-light"> helps reunite people with beloved belongings</span>
        </>
      )}
    </div>
  );
};

export default Header;
