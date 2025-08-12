
import { useState, useEffect } from 'react';
import { Post } from '@/data/data_types';
import { calculateDistance } from '@/utils/location';

export function useDistance(
  posts: Post[],
  filterCoordinates: { lat: number; lng: number } | null,
  searchLocation?: string
) {
  const [postsWithDistance, setPostsWithDistance] = useState<Post[]>([]);

  useEffect(() => {
    // Skip if no posts
    if (!posts.length) {
      console.log('useDistance: No posts available, skipping distance calculation');
      setPostsWithDistance(posts);
      return;
    }
    
    // If no coordinates, pass through posts without calculating distances
    if (!filterCoordinates) {
      console.log('useDistance: No filter coordinates provided, skipping distance calculation');
      setPostsWithDistance(posts);
      return;
    }

    console.log(`🧮 Calculating distances for ${posts.length} posts from search coordinates:`, {
      lat: filterCoordinates.lat.toFixed(6), 
      lng: filterCoordinates.lng.toFixed(6),
      searchLocation: searchLocation || 'unknown'
    });
    
    try {
      // Calculate distance for each post
      const withDistance = posts.map(post => {
        try {
          // Ensure post has valid location data
          if (!post.location || typeof post.location !== 'object') {
            console.warn(`⚠️ Post ${post.id} has missing/invalid location data`);
            return { ...post, distance: Infinity };
          }
          
          // Ensure we have valid coordinates
          if (post.location.lat === undefined || post.location.lng === undefined) {
            console.warn(`⚠️ Post ${post.id} has missing coordinates in location:`, post.location);
            return { ...post, distance: Infinity };
          }

          // Ensure we have valid numbers for coordinates
          const postLat = typeof post.location.lat === 'number' 
            ? post.location.lat 
            : parseFloat(String(post.location.lat));
            
          const postLng = typeof post.location.lng === 'number' 
            ? post.location.lng 
            : parseFloat(String(post.location.lng));
          
          // Validate the parsed coordinates
          if (isNaN(postLat) || isNaN(postLng) || 
              !isFinite(postLat) || !isFinite(postLng) ||
              Math.abs(postLat) > 90 || Math.abs(postLng) > 180) {
            console.warn(`⚠️ Post ${post.id} has invalid coordinates: ${postLat}, ${postLng}`);
            return { ...post, distance: Infinity };
          }
          
          // Calculate the distance with Haversine formula
          const distance = calculateDistance(
            filterCoordinates.lat,
            filterCoordinates.lng,
            postLat,
            postLng
          );
          
          // Validate the calculated distance
          if (!isFinite(distance) || isNaN(distance)) {
            console.warn(`⚠️ Invalid distance calculated for post ${post.id}:`, distance);
            return { ...post, distance: Infinity };
          }
          
          // Enhanced logging for debugging specific locations
          const locationName = post.location?.name || 'Unknown';
          if (searchLocation && (
            locationName.toLowerCase().includes('holmes') ||
            locationName.toLowerCase().includes('chapel') ||
            locationName.toLowerCase().includes('byfleet') ||
            locationName.toLowerCase().includes('west')
          )) {
            console.log(`🎯 DEBUGGING: Post in ${locationName} (${postLat}, ${postLng}) is ${distance.toFixed(2)} miles from search location "${searchLocation}" (${filterCoordinates.lat}, ${filterCoordinates.lng})`);
          }
          
          // Log successful distance calculation for debugging
          console.log(`📍 Distance for post ${post.id} in ${locationName} = ${distance.toFixed(2)} miles`);
          
          // Add the distance to the post
          return { ...post, distance };
        } catch (err) {
          console.error(`❌ Error calculating distance for post ${post.id}:`, err);
          return { ...post, distance: Infinity };
        }
      });

      console.log(`✅ Distance calculation completed for ${withDistance.length} posts`);
      
      // Enhanced logging for debugging - show all posts with distances
      const validDistances = withDistance
        .filter(p => typeof p.distance === 'number' && isFinite(p.distance) && p.distance !== Infinity)
        .sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity));
      
      if (validDistances.length > 0) {
        console.log(`📊 Found ${validDistances.length} posts with valid distances:`);
        validDistances.forEach(post => {
          const locationName = post.location?.name || 'Unknown';
          console.log(`  📍 Post ${post.id} at ${locationName}: ${post.distance?.toFixed(2)} miles`);
        });
        
        // Show specific debugging for our problem locations
        const problemLocations = validDistances.filter(post => {
          const locationName = post.location?.name?.toLowerCase() || '';
          return locationName.includes('holmes') || 
                 locationName.includes('chapel') || 
                 locationName.includes('byfleet') ||
                 locationName.includes('west');
        });
        
        if (problemLocations.length > 0) {
          console.log(`🔍 DEBUGGING - Problem locations found:`, problemLocations.map(p => ({
            id: p.id,
            name: p.location?.name,
            distance: p.distance?.toFixed(2) + ' miles',
            coords: `${p.location?.lat}, ${p.location?.lng}`
          })));
        }
      } else {
        console.warn('⚠️ No posts with valid distances found. Check location data in posts.');
      }
      
      setPostsWithDistance(withDistance);
    } catch (err) {
      console.error('❌ Error in distance calculation:', err);
      // Return posts without distances on error
      setPostsWithDistance(posts.map(post => ({ ...post, distance: Infinity })));
    }
  }, [posts, filterCoordinates, searchLocation]);

  return { postsWithDistance };
}
