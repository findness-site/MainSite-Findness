
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ActionButtonProps {
  imageSrc: string;
  imageAlt: string;
  text: string;
  textColor: string;
  style: React.CSSProperties;
  destination?: string;
}

const ActionButton = ({ 
  imageSrc, 
  imageAlt, 
  text, 
  textColor, 
  style, 
  destination 
}: ActionButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (destination) {
      navigate(destination);
    }
  };

  return (
    <div 
      style={{...style, cursor: destination ? 'pointer' : 'default'}} 
      onClick={handleClick}
    >
      <img
        src={imageSrc}
        alt={imageAlt}
        style={{
          width: '393px',
          height: 'auto',
        }}
      />
      <div
        className="font-nunito"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: textColor,
          fontSize: '17pt',
          fontWeight: 400, // Nunito Regular
          textAlign: 'center',
          zIndex: 22,
          whiteSpace: 'nowrap',
          marginTop: text.includes('Help') ? '-10px' : '-11px',
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default ActionButton;
