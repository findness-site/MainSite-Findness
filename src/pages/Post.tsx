
import React, { useState, useEffect } from 'react';
import { CameraOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import Logo from './components/Logo';
import Header from './components/Header';
import BlueSection from './components/BlueSection';
import LostSection from './components/LostSection';
/*import { supabase } from '@/lib/supabase';*/
import { db } from '@/data/firebase/firebaseClient';
import { ref, push, serverTimestamp } from 'firebase/database';

const Post = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const photo = location.state?.photo || null;
  const username = location.state?.username || '';
  const location_ = location.state?.location || null;

  useEffect(() => {
    console.log("Post page received state:", {
      photo: photo ? "photo data exists" : "no photo",
      username,
      location: location_
    });

    if (!location_) {
      console.warn("No location data received in Post page");
    }
  }, []);

  const savePost = async () => {
    if (!photo || !location_) {
      toast({
        title: "Missing information",
        description: `Please make sure to add both a photo and location. ${!photo ? 'Photo is missing.' : ''} ${!location_ ? 'Location is missing.' : ''}`,
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    console.log("Saving post with location data:", location_);

    try {
      // 1. Create a reference to the 'posts' list in our database
      const postsRef = ref(db, 'posts');

      // 2. Prepare the new post object for Firebase
      const newPost = {
        image_url: photo,
        username: username,
        location: location_,
        // Use serverTimestamp for accuracy instead of client's time
        timestamp: serverTimestamp(),
        created_at: serverTimestamp(),
      };

      // 3. Push the new post object to the database
      await push(postsRef, newPost);

      console.log("Post successfully saved to Firebase.");

      navigate('/thanks', { state: { photo, username } });
    } catch (err) {
      console.error('Error saving post:', err);
      toast({
        title: "Error",
        description: "Failed to save your post. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePostIt = () => {
    savePost();
  };

  const handleStartAgain = () => {
    navigate('/finder');
  };

  const displayUsername = () => {
    if (username && username.trim().length > 0) {
      return `Kindly posted by ${username.trim()}`;
    }
    return "Kindly posted by a stranger";
  };

  return (
    <div className="min-h-screen w-full bg-cream-bg relative pb-[100px]">
      <div className="w-full flex flex-col items-center pt-[14px]">
        <div className="px-10 w-full">
          {error ? (
            <div
              className="w-full rounded-t-[30px] shadow-lg mb-4 bg-gray-200 flex flex-col items-center justify-center"
              style={{ height: '302px' }}
            >
              <CameraOff size={48} className="text-gray-500 mb-4" />
              <p className="text-gray-700 text-center px-4">{error}</p>
            </div>
          ) : photo ? (
            <div className="relative w-full rounded-t-[30px] shadow-lg mb-4">
              <img
                src={photo}
                alt="Captured photo"
                className="w-full rounded-t-[30px]"
                style={{ height: '302px', objectFit: 'cover' }}
              />
              <div
                className="absolute bottom-0 left-0 w-full flex items-center justify-center"
                style={{
                  height: '40px',
                  backgroundColor: '#2977b7'
                }}
              >
                <span className="text-[#f7f4e3] font-nunito">
                  {displayUsername()}
                </span>
              </div>
            </div>
          ) : (
            <div
              className="w-full rounded-t-[30px] shadow-lg mb-4 bg-gray-200 flex flex-col items-center justify-center"
              style={{ height: '302px' }}
            >
              <CameraOff size={48} className="text-gray-500 mb-4" />
              <p className="text-gray-700 text-center px-4">No photo available</p>
            </div>
          )}
          {location_ && (
            <div className="text-center py-4 -mt-[30px]">
              <p className="font-nunito" style={{ color: '#2b77b6' }}>(Location information successfully added)</p>
            </div>
          )}
          <div className="flex flex-col justify-center w-full space-y-4 -mt-[10px]">
            <Button
              onClick={handlePostIt}
              disabled={!photo || !location_ || isSubmitting}
              style={{
                backgroundColor: '#2977b7',
                opacity: (!photo || !location_ || isSubmitting) ? 0.5 : 1
              }}
              className="w-full hover:bg-[#2266a0] py-[30px] font-nunito text-xl font-normal text-[#f7f4e3] rounded-none rounded-bl-[30px]"
            >
              {isSubmitting ? 'Posting...' : 'Post it'}
            </Button>
            <Button
              onClick={handleStartAgain}
              disabled={isSubmitting}
              style={{ backgroundColor: '#2977b7' }}
              className="w-full hover:bg-[#2266a0] py-[30px] font-nunito text-xl font-normal text-[#f7f4e3] rounded-none rounded-bl-[30px]"
            >
              Start again
            </Button>
          </div>
        </div>
      </div>

      <Logo />
      <Header showText={false} />
      <BlueSection showPanel={false} showTeddy={false} showText={false} />
      <LostSection showFedora={false} showText={false} showButton={false} />
    </div>
  );
};

export default Post;
