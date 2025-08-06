
import React, { useRef, useEffect } from 'react';

interface UsernameInputProps {
  username: string;
  setUsername: (value: string) => void;
}

const UsernameInput = ({ username, setUsername }: UsernameInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);

  const focusInput = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    const inputContainer = inputContainerRef.current;
    if (inputContainer) {
      const handleTouch = (e: TouchEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (inputRef.current) {
          inputRef.current.focus();
        }
      };
      
      const handleMouse = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (inputRef.current) {
          inputRef.current.focus();
        }
      };
      
      inputContainer.addEventListener('touchstart', handleTouch, { passive: false, capture: true });
      inputContainer.addEventListener('touchend', handleTouch, { passive: false, capture: true });
      inputContainer.addEventListener('touchmove', handleTouch, { passive: false, capture: true });
      inputContainer.addEventListener('mousedown', handleMouse, { capture: true });
      inputContainer.addEventListener('click', handleMouse, { capture: true });
      
      const preventAllNavigation = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
      };
      
      inputContainer.addEventListener('pointerdown', preventAllNavigation, { capture: true });
      inputContainer.addEventListener('pointerup', preventAllNavigation, { capture: true });
      inputContainer.addEventListener('contextmenu', preventAllNavigation, { capture: true });
      
      inputContainer.tabIndex = -1;
      inputContainer.style.outline = 'none';
      
      return () => {
        inputContainer.removeEventListener('touchstart', handleTouch, { capture: true });
        inputContainer.removeEventListener('touchend', handleTouch, { capture: true });
        inputContainer.removeEventListener('touchmove', handleTouch, { capture: true });
        inputContainer.removeEventListener('mousedown', handleMouse, { capture: true });
        inputContainer.removeEventListener('click', handleMouse, { capture: true });
        inputContainer.removeEventListener('pointerdown', preventAllNavigation, { capture: true });
        inputContainer.removeEventListener('pointerup', preventAllNavigation, { capture: true });
        inputContainer.removeEventListener('contextmenu', preventAllNavigation, { capture: true });
      };
    }
  }, []);

  return (
    <>
      <div 
        ref={inputContainerRef}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }}
        onTouchStart={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }}
        style={{
          position: 'absolute',
          top: '240px',
          left: 'calc(50% - 10px + 14px - 5px)',
          transform: 'translateX(-50%)',
          zIndex: 5,
          width: '320px',
          height: '76px',
          cursor: 'text',
          touchAction: 'none',
          WebkitTapHighlightColor: 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          userSelect: 'none'
        }}
      >
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (inputRef.current) {
              inputRef.current.focus();
            }
          }}
          onTouchStart={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (inputRef.current) {
              inputRef.current.focus();
            }
          }}
          style={{
            backgroundColor: '#90b5cd',
            width: '294px',
            height: '56px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={username}
            onChange={(e) => {
              e.stopPropagation();
              setUsername(e.target.value);
            }}
            placeholder="Type in username... (optional)"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            className="absolute w-full h-full bg-transparent border-none text-[#2977b7] placeholder:text-[#f7f4e3] px-4 py-2"
            style={{
              fontSize: username ? '16pt' : '14pt',
              fontWeight: username ? 300 : 300,
              outline: 'none',
              WebkitAppearance: 'none',
              WebkitTapHighlightColor: 'transparent',
              touchAction: 'none',
              userSelect: 'text',
              cursor: 'text'
            }}
          />
        </div>
      </div>

      <div 
        className="font-nunito text-[#2977b7]"
        style={{
          position: 'absolute',
          top: '307px',
          left: '49px',
          fontSize: '14pt',
          fontWeight: 400,
          textAlign: 'left',
          width: '392px',
          zIndex: 10
        }}
      >
        This will appear on your post.
      </div>
    </>
  );
};

export default UsernameInput;
