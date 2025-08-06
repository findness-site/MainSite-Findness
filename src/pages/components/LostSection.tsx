import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ActionButton from './ActionButton';

interface LostSectionProps {
  showFedora?: boolean;
  showText?: boolean;
  showButton?: boolean;
  page?: string;
}

const LostSection = ({ 
  showFedora = true, 
  showText = true, 
  showButton = true,
  page
}: LostSectionProps) => {
  const location = useLocation();
  const [imageError, setImageError] = useState(false);
  
  const imagePaths = [
    '/images/findness_image_1.png',
    '/images/findness_image_2.png',
    '/images/findness_image_3.png',
    '/images/findness_image_4.png'

    /*'/lovable-uploads/c3b85ba8-018d-472e-ad4e-16a426050c8a.png',
    'c3b85ba8-018d-472e-ad4e-16a426050c8a.png',
    '/c3b85ba8-018d-472e-ad4e-16a426050c8a.png',
    'lovable-uploads/c3b85ba8-018d-472e-ad4e-16a426050c8a.png'*/
  ];
  const [currentImagePath, setCurrentImagePath] = useState(imagePaths[0]);
  
  useEffect(() => {
    let currentIndex = 0;
    
    const tryLoadImage = (index) => {
      if (index >= imagePaths.length) {
        console.error('All image paths failed, showing fallback');
        setImageError(true);
        return;
      }
      
      const img = new Image();
      const path = imagePaths[index];
      
      img.onload = () => {
        console.log(`Successfully loaded image from: ${path}`);
        setCurrentImagePath(path);
        setImageError(false);
      };
      
      img.onerror = () => {
        console.error(`Failed to load image from path: ${path}`);
        tryLoadImage(index + 1);
      };
      
      img.src = path;
    };
    
    tryLoadImage(currentIndex);
  }, []);

  const isFinderPage = location.pathname === '/finder' || page === 'finder';
  const isSeekerPage = location.pathname === '/seeker' || page === 'seeker';
  
  const positionAdjustment = isFinderPage ? '- 150px' : '';

  const buttonText = isSeekerPage ? "Have a looksee" : "Let's try and find it";

  // Position fedora directly below the "Help it find its way home" button on the home page
  const isHomePage = location.pathname === '/' || page === 'index';
  const fedoraTopPosition = isHomePage 
    ? 'calc(40px + 25pt * 1.2 + 40px + 80px + 15px + 18pt * 1.2 + 10px + 40px + 50px + 30px)'
    : 'calc(300px + 50px + 30px)';

  return (
    <>
      {showFedora && (
        <div
          style={{
            position: 'absolute',
            left: 'calc(40px - 30px - 10px + 20px + 10px + 5px)',
            top: fedoraTopPosition,
            zIndex: 21,
          }}
        >
          {!imageError ? (
            <img
              src='/images/findness_image_4.png'
              alt="FEDORA"
              style={{
                width: '84px',
                height: 'auto',
                display: 'block',
              }}
              onError={(e) => {
                console.error('Failed to load fedora image on render:', e);
                setImageError(true);
              }}
            />
          ) : (
            <div 
              style={{
                width: '84px',
                height: '84px',
                backgroundColor: '#e0e0e0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px',
                fontSize: '12px',
                color: '#666'
              }}
            >
              Image not found
            </div>
          )}
        </div>
      )}

      {showText && (
        <div
          className="font-nunito text-[#2977b7]"
          style={{
            position: 'absolute',
            top: `calc(40px + 25pt * 1.2 + 40px + 80px + 15px + 18pt * 1.2 + 10px + 236px + 20px - 40px - 40px + 20px ${positionAdjustment})`,
            left: '40px',
            fontSize: '18pt',
            fontWeight: 300,
            maxWidth: 'calc(100% - 80px)',
            zIndex: 21,
            lineHeight: 1.195,
          }}
        >
          Lost something you love?
        </div>
      )}

      {!isFinderPage && !isSeekerPage && showButton && (
        <ActionButton
          imageSrc='/images/findness_image_2.png'
          imageAlt="BLUE_BUT_CUR"
          text={buttonText}
          textColor="#f7f4e3"
          destination="/seeker"
          style={{
            position: 'absolute',
            top: 'calc(40px + 25pt * 1.2 + 40px + 80px + 15px + 18pt * 1.2 + 10px + 236px + 20px - 40px - 40px + 20px + 18pt * 1.2 + 10px - 60px - 30px + 5px - 2px)',
            left: 'calc(40px - 30px - 3px - 1px - 2px)',
            zIndex: 21,
          }}
        />
      )}
    </>
  );
};

export default LostSection;
