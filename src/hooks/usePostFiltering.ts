
import { useState, useEffect } from 'react';
import { Post } from '@/data/data_types';
import { useDistance } from './filters/useDistance';
import { useRadiusFilter } from './filters/useRadiusFilter';
import { useSortedPosts } from './filters/useSortedPosts';
import { FilteringOptions, FilteringResult } from './filters/types';

/**
 * Hook for filtering posts based on location and radius
 * This is the main entry point that combines all the filtering logic
 */
export function usePostFiltering({ 
  posts, 
  filterCoordinates, 
  searchRadius, 
  searchLocation, 
  showAllByDefault = false
}: FilteringOptions): FilteringResult {
  const [loading, setLoading] = useState<boolean>(true);
  const [finalPosts, setFinalPosts] = useState<Post[]>([]);

  // Debug info at the start of hook execution
  console.log('usePostFiltering called with:', { 
    postsCount: posts.length,
    filterCoordinates: filterCoordinates ? `${filterCoordinates.lat.toFixed(4)},${filterCoordinates.lng.toFixed(4)}` : 'none',
    searchRadius: searchRadius || 'default',
    searchLocation: searchLocation || 'none',
    showAllByDefault
  });

  // Step 1: Calculate distances for all posts
  const { postsWithDistance } = useDistance(posts, filterCoordinates, searchLocation);
  
  // Step 2: Apply radius filtering
  const { filteredByRadius } = useRadiusFilter(postsWithDistance, searchRadius, searchLocation);
  
  // Step 3: Sort by distance (closest first)
  const { sortedPosts } = useSortedPosts(filteredByRadius);

  // Final decision logic for which posts to display
  useEffect(() => {
    try {
      console.log('Making final filtering decision:', {
        searchActive: !!searchLocation,
        postsCount: posts.length,
        filteredCount: sortedPosts.length,
        showAllByDefault
      });
      
      // CASE 1: No search active and showAllByDefault is true - show all posts
      if (!searchLocation && showAllByDefault) {
        console.log('No search active and showAllByDefault=true, showing all posts');
        setFinalPosts(posts);
        setLoading(false);
        return;
      }
      
      // CASE 2: No search active and showAllByDefault is false - show no posts
      if (!searchLocation && !showAllByDefault) {
        console.log('No search active and showAllByDefault=false, showing no posts');
        setFinalPosts([]);
        setLoading(false);
        return;
      }

      // CASE 3: Search is active - ALWAYS use filtered results regardless of count
      if (searchLocation) {
        console.log(`Search active for "${searchLocation}": found ${sortedPosts.length} posts within radius`);
        
        // CRITICAL FIX: Always return the filtered posts when searching
        // Never fall back to all posts when a search is active
        setFinalPosts(sortedPosts);
        setLoading(false);
        return;
      }

      // This should never happen, but just in case
      console.error('No filtering case matched - this should never happen!');
      setFinalPosts([]);
      setLoading(false);
    } catch (error) {
      console.error('Error in post filtering final processing:', error);
      setFinalPosts([]);
      setLoading(false);
    }
  }, [posts, sortedPosts, searchLocation, showAllByDefault]);

  return { 
    filteredPosts: finalPosts, 
    loading 
  };
}
