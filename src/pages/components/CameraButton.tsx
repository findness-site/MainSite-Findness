
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const CameraButton = ({ username }: { username: string }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't render on seeker page
  if (location.pathname === '/seeker') {
    return null;
  }

  const handleSubmit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (username) {
      navigate('/camera', { state: { username } });
    } else {
      navigate('/camera');
    }
  };

  return (
    <div 
      style={{ position: 'relative' }}
      className="cursor-pointer"
    >
      <img 
        src='/images/findness_image_2.png' 
        alt="BLUE_BUT_CUR" 
        style={{
          position: 'absolute',
          top: '293px',
          left: '9px',
          width: '368px',
          zIndex: 21
        }}
        onClick={handleSubmit}
      />
      <div 
        className="font-nunito"
        style={{
          position: 'absolute',
          top: '388px',
          left: '9px',
          width: '368px',
          fontSize: '17pt',
          color: '#f7f4e3',
          fontWeight: 400,
          zIndex: 22,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onClick={handleSubmit}
      >
        Let's do it
      </div>
    </div>
  );
};

export default CameraButton;
