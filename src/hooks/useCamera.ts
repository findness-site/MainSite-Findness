
import { useRef, useState, useEffect } from 'react';

interface UseCameraReturn {
  videoRef: React.RefObject<HTMLVideoElement>;
  stream: MediaStream | null;
  photo: string | null;
  error: string | null;
  initializeCamera: () => void;
  startCamera: () => Promise<void>;
  stopCamera: () => void;
  takePhoto: () => void;
}

export function useCamera(): UseCameraReturn {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    initializeCamera();
    
    return () => {
      stopCamera();
    };
  }, []);

  const initializeCamera = () => {
    setError(null);
    
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.error("MediaDevices API is not supported in this browser");
      setError("Your browser doesn't support camera access. Please try a different browser like Chrome or Firefox.");
      return;
    }
    
    navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        console.log("Available camera devices:", videoDevices);
        
        if (videoDevices.length === 0) {
          setError("No camera detected on your device. Please check that your camera is connected and not being used by another application.");
          return;
        }
        
        startCamera();
      })
      .catch(err => {
        console.error("Error enumerating devices:", err);
        setError("Couldn't detect available cameras. Please check your browser permissions.");
      });
  };

  const startCamera = async () => {
    try {
      stopCamera();
      
      console.log("Attempting to access camera...");
      
      const constraints = {
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: { ideal: "environment" }
        },
        audio: false
      };
      
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      
      console.log("Successfully accessed camera");
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => {
          if (videoRef.current) {
            videoRef.current.play().catch(e => {
              console.error("Error auto-playing video:", e);
              setError("Could not start video stream. Please try again.");
            });
          }
        };
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      
      if (err instanceof DOMException) {
        if (err.name === 'NotAllowedError') {
          setError("Camera access denied. Please check your browser settings and ensure camera permissions are enabled.");
        } else if (err.name === 'NotFoundError') {
          setError("No camera detected. Please make sure your device has a camera and it's not being used by another application.");
        } else if (err.name === 'NotReadableError') {
          setError("Camera is in use by another application. Please close other apps that might be using your camera.");
        } else {
          setError(`Camera error: ${err.name}. Please refresh the page and try again.`);
        }
      } else {
        setError("Camera not available. Please make sure your device has a camera and reload the page.");
      }
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  const takePhoto = () => {
    if (!stream) {
      setError("Camera not available");
      return;
    }
    
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        setPhoto(canvas.toDataURL('image/jpeg'));
        stopCamera();
      }
    }
  };

  return {
    videoRef,
    stream,
    photo,
    error,
    initializeCamera,
    startCamera,
    stopCamera,
    takePhoto
  };
}
