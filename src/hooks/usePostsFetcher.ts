
import { useState, useEffect } from 'react';
import { Post } from '@/data/data_types';
/*import { supabase } from '@/lib/supabase';*/
import { db } from '@/data/firebase/firebaseClient';
import { ref, onValue, query, orderByChild } from 'firebase/database';

export const usePostsFetcher = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    
    const postsQuery = query(ref(db, 'posts'), orderByChild('timestamp'));

    const unsubscribe = onValue(postsQuery, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const postsArray: Post[] = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setPosts(postsArray.reverse());
      } else {
        setPosts([]);
      }
      setLoading(false);
    }, (error) => {
      console.error("Firebase read error:", error);
      setError(error.message);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { posts, loading, error };
};