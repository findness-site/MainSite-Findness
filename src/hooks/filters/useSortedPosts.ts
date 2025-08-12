
import { useState, useEffect } from 'react';
import { Post } from '@/data/data_types';

/**
 * Hook for sorting posts by distance
 */
export function useSortedPosts(posts: Post[]) {
  const [sortedPosts, setSortedPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Sort by distance (closest first)
    const sorted = [...posts].sort((a, b) => {
      const distA = a.distance ?? Infinity;
      const distB = b.distance ?? Infinity;
      return distA - distB;
    });
    
    setSortedPosts(sorted);
    console.log(`Final sorted posts count: ${sorted.length}`);
  }, [posts]);

  return { sortedPosts };
}
