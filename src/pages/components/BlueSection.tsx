
import React from 'react';

interface BlueSectionProps {
  showPanel?: boolean;
  showTeddy?: boolean;
  showText?: boolean;
  page?: string;
}

const BlueSection = ({ showPanel = true, showTeddy = true, showText = true, page }: BlueSectionProps) => {
  const isFinderPage = page === 'finder';
  
  // Only reduce position by 150px if we're on the finder page
  const positionAdjustment = isFinderPage ? '- 150px' : '';
  
  return (
    <>
      {showTeddy && (
        <div
          style={{
            position: 'absolute',
            right: 'calc(40px - 30px)',
            top: `calc(40px + 25pt * 1.2 + 40px + 80px - 57px - 30px + 15px - 15px + 5px ${positionAdjustment})`,
            zIndex: 20,
          }}
        >
          <img
            src='/images/findness_image_1.png'
            alt="TEDDY"
            style={{
              height: '72px',
              width: 'auto',
            }}
          />
        </div>
      )}

      {showPanel && (
        <div
          style={{
            position: 'absolute',
            top: `calc(40px + 25pt * 1.2 + 40px + 80px - 15px ${positionAdjustment})`,
            left: 0,
            width: '100%',
            height: '236px',
            backgroundColor: '#2977b7',
          }}
        />
      )}

      {showText && (
        <div 
          className="font-nunito text-[#f7f4e3]"
          style={{
            position: 'absolute',
            top: `calc(40px + 25pt * 1.2 + 40px + 80px + 15px ${positionAdjustment})`,
            left: '40px',
            fontSize: '18pt',
            maxWidth: 'calc(100% - 80px)',
            zIndex: 21,
            lineHeight: 1.195,
            fontWeight: 300,
          }}
        >
          Spotted a bear at a bus stop, 
          a welly on a wall or a fedora on a fence?
        </div>
      )}
    </>
  );
};

export default BlueSection;
