
import { useState, useEffect } from 'react';
import { Post } from '@/data/mockPosts';
import { supabase } from '@/lib/supabase';
import { toast } from "@/hooks/use-toast";

/**
 * Hook for fetching posts from Supabase
 */
export function usePostsFetcher() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAllPosts = async () => {
      setLoading(true);
      try {
        const { data: supabasePosts, error } = await supabase
          .from('posts')
          .select('*');
        
        if (error) {
          console.error('Error fetching posts from Supabase:', error);
          toast({
            title: "Error loading posts",
            description: "There was a problem loading posts. Please try again later.",
            variant: "destructive"
          });
          setPosts([]);
        } else if (supabasePosts && supabasePosts.length > 0) {
          console.log(`Fetched ${supabasePosts.length} posts from Supabase`);
          
          // Format Supabase posts to match our Post interface
          const formattedPosts = supabasePosts
            .filter(post => {
              // Validate location data to ensure it has valid coordinates
              if (!post.location || typeof post.location !== 'object') {
                console.warn(`Post ${post.id} has invalid location data:`, post.location);
                return false;
              }
              
              const hasValidCoords = 
                post.location.lat !== undefined && 
                post.location.lng !== undefined;
              
              if (!hasValidCoords) {
                console.warn(`Post ${post.id} has missing coordinates:`, post.location);
                return false;
              }
              
              return true;
            })
            .map(post => {
              // Explicitly convert location coordinates to numbers
              const postLat = parseFloat(String(post.location.lat));
              const postLng = parseFloat(String(post.location.lng));
              
              // Check if conversion succeeded and values are valid numbers
              if (isNaN(postLat) || isNaN(postLng)) {
                console.warn(`Post ${post.id} has invalid coordinates:`, post.location);
                return null; // Will be filtered out next
              }
              
              return {
                id: post.id,
                title: "Found Item",
                description: "Item found and posted to Findness",
                image: post.image_url,
                location: {
                  name: post.location?.name || "Posted Location",
                  lat: postLat,
                  lng: postLng
                },
                date: new Date(post.timestamp).toISOString().split('T')[0],
                username: post.username || "a stranger"
              };
            })
            // Filter out null values
            .filter((post): post is NonNullable<typeof post> => post !== null);
          
          console.log(`Successfully processed ${formattedPosts.length} valid posts with location data`);
          setPosts(formattedPosts);
        } else {
          console.log('No posts found in Supabase');
          setPosts([]);
        }
      } catch (err) {
        console.error('Error in fetchAllPosts:', err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAllPosts();
  }, []); // This effect runs once on mount

  return { posts, loading: loading };
}
