
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { usePosts } from '@/hooks/usePosts';
import PostsList from './PostsList';
import LoadingState from './ui/LoadingState';
import EmptyState from './ui/EmptyState';

interface PostsFeedProps {
  searchLocation?: string | null;
  searchRadius?: number;
  showAllByDefault?: boolean;
}

const PostsFeed = ({ searchLocation, searchRadius = 10, showAllByDefault = false }: PostsFeedProps) => {
  const { toast } = useToast();
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  
  // Track when search happens
  useEffect(() => {
    if (searchLocation) {
      setHasSearched(true);
      console.log(`Search initiated for location: "${searchLocation}"`);
    }
  }, [searchLocation]);
  
  // Use the central hook for getting filtered posts
  const { posts, loading, originalPosts } = usePosts({
    searchLocation: searchLocation || undefined,
    searchRadius,
    userLocation: null, // Not using user location in this component
    showAllByDefault
  });
  
  // Debug output
  useEffect(() => {
    if (!loading) {
      console.log(`PostsFeed rendering decision: Original posts: ${originalPosts.length}, Filtered posts: ${posts.length}`);
      console.log(`Search status: location="${searchLocation || 'none'}", hasSearched=${hasSearched}`);
      
      if (searchLocation && posts.length === 0) {
        console.log(`No posts found within ${searchRadius} miles of "${searchLocation}"`);
      }
    }
  }, [loading, originalPosts, posts, searchLocation, hasSearched, searchRadius]);

  // Show loading state while data is being fetched
  if (loading) {
    return <LoadingState />;
  }
  
  // If we have a search location but no matching posts, show empty state
  if (searchLocation && posts.length === 0) {
    console.log(`Rendering EmptyState for "${searchLocation}" - no matching posts`);
    return <EmptyState radius={searchRadius} />;
  }
  
  // Show the posts (filtered if we have a search, or all if showAllByDefault)
  console.log(`Rendering PostsList with ${posts.length} posts`);
  return <PostsList 
    posts={posts} 
    location={searchLocation || undefined} 
    radius={searchRadius}
    noResultsFound={searchLocation !== null && posts.length === 0}
  />;
};

export default PostsFeed;
