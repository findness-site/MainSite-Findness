
import { useState, useEffect } from 'react';
import { Post } from '@/data/mockPosts';

/**
 * Hook for matching posts by location name in addition to distance filtering
 */
export function useLocationMatching(
  posts: Post[],
  searchLocation?: string
) {
  const [locationMatchedPosts, setLocationMatchedPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (!searchLocation) {
      setLocationMatchedPosts(posts);
      return;
    }

    const searchTerm = searchLocation.toLowerCase().trim();
    console.log(`Looking for location matches for: "${searchTerm}"`);
    
    // Find posts that match the search location by name
    const matchedPosts = posts.filter(post => {
      const postLocationName = post.location?.name?.toLowerCase() || '';
      
      // Direct match
      if (postLocationName.includes(searchTerm)) {
        console.log(`Direct match found: ${post.location?.name} matches ${searchLocation}`);
        return true;
      }
      
      // Fuzzy matching for common variations
      const fuzzyMatches = [
        // Handle common city variations
        searchTerm.replace(/\s+/g, ''),
        searchTerm.replace('upon', ''),
        searchTerm.replace('on', ''),
        searchTerm.replace('under', ''),
      ];
      
      for (const fuzzyTerm of fuzzyMatches) {
        if (postLocationName.includes(fuzzyTerm)) {
          console.log(`Fuzzy match found: ${post.location?.name} matches ${searchLocation}`);
          return true;
        }
      }
      
      return false;
    });
    
    console.log(`Location matching found ${matchedPosts.length} posts for "${searchLocation}"`);
    setLocationMatchedPosts(matchedPosts);
    
  }, [posts, searchLocation]);

  return { locationMatchedPosts };
}
