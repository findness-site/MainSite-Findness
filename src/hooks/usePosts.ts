
import { useState, useEffect } from 'react';
import { Post } from '@/data/data_types';
import { usePostsFetcher } from './usePostsFetcher';
import { useSearchLocation } from './useSearchLocation';
import { usePostFiltering } from './filters';

interface UsePostsProps {
  userLocation: { lat: number; lng: number } | null;
  searchLocation?: string;
  searchRadius?: number;
  showAllByDefault?: boolean;
}

export function usePosts({ userLocation, searchLocation, searchRadius, showAllByDefault = false }: UsePostsProps) {
  const [loading, setLoading] = useState<boolean>(true);

  // Log input parameters with more detail
  console.log('usePosts hook called with:', { 
    userLocation: userLocation ? `${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}` : 'null', 
    searchLocation: searchLocation || 'null', 
    searchRadius: searchRadius || 'default (10)',
    showAllByDefault
  });

  // 1. Fetch all posts
  const { posts: allPosts, loading: loadingPosts } = usePostsFetcher();
  
  // 2. Get coordinates for search location
  const { searchCoordinates, loading: loadingLocation } = useSearchLocation({ 
    searchLocation: searchLocation || null
  });

  // 3. Determine which coordinates to use for filtering
  const filterCoordinates = searchCoordinates || userLocation || null;
  
  // Log coordinates being used for filtering
  useEffect(() => {
    if (filterCoordinates) {
      console.log(`Filtering using coordinates: ${JSON.stringify(filterCoordinates)}`);
    } else if (searchLocation) {
      console.log(`No coordinates available for filtering location "${searchLocation}"`);
    } else {
      console.log('No search location or coordinates provided');
    }
  }, [filterCoordinates, searchLocation]);
  
  // 4. Apply the actual filtering logic based on coordinates
  const { filteredPosts, loading: loadingFiltering } = usePostFiltering({
    posts: allPosts,
    filterCoordinates,
    searchRadius,
    searchLocation, 
    showAllByDefault
  });

  // Update loading state and debug output
  useEffect(() => {
    const isLoading = loadingPosts || loadingLocation || loadingFiltering;
    setLoading(isLoading);
    
    if (!isLoading) {
      console.log(`Filtering complete: ${filteredPosts.length}/${allPosts.length} posts matched search criteria`);
      
      // Add detailed logging for search results
      if (searchLocation) {
        if (filteredPosts.length > 0) {
          console.log(`Search "${searchLocation}" returned ${filteredPosts.length} posts`);
        } else {
          console.log(`Search "${searchLocation}" returned 0 posts - showing empty state`);
        }
      }
    }
  }, [filteredPosts, allPosts, loadingPosts, loadingLocation, loadingFiltering, searchLocation]);

  return { 
    posts: filteredPosts, 
    loading,
    originalPosts: allPosts
  };
}
