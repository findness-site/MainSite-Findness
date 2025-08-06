
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface LogoProps {
  page?: string;
  className?: string;
}

const Logo = ({ page, className }: LogoProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  // Only apply fixed positioning for non-seeker pages
  if (page !== 'seeker') {
    let topPosition = page === 'finder' ? 656 : 716;
    
    if (page === 'welcome') {
      topPosition = 666;
    }

    return (
      <div
        className="w-full flex justify-center"
        style={{
          position: 'absolute',
          top: topPosition,
          left: 0,
          right: 0,
          zIndex: 10,
          cursor: 'pointer',
        }}
        onClick={handleClick}
      >
        <img
          src='/images/findness_image_3.png'
          alt="Findness Logo"
          width={208}
          height="auto"
          style={{ width: 208, height: 'auto', display: 'block' }}
        />
      </div>
    );
  }

  // For seeker page, use regular positioning with increased margin
  return (
    <div
      className={`w-full flex justify-center cursor-pointer mt-[156px] mb-[-189px] ${className || ''}`}
      onClick={handleClick}
    >
      <img
        src='/images/findness_image_3.png'
        alt="Findness Logo"
        width={208}
        height="auto"
        style={{ width: 208, height: 'auto', display: 'block' }}
      />
    </div>
  );
};

export default Logo;
