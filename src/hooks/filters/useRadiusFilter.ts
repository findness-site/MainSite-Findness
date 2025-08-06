
import { useState, useEffect } from 'react';
import { Post } from '@/data/mockPosts';

export function useRadiusFilter(
  postsWithDistance: Post[],
  searchRadius?: number,
  searchLocation?: string
) {
  const [filteredByRadius, setFilteredByRadius] = useState<Post[]>([]);

  useEffect(() => {
    try {
      console.log(`🔍 useRadiusFilter called with ${postsWithDistance.length} posts and radius ${searchRadius || 'unspecified'} for location "${searchLocation || 'none'}"`);
      
      // Use provided radius or default to 10 miles
      const effectiveRadius = typeof searchRadius === 'number' && searchRadius > 0 ? searchRadius : 10;
      console.log(`📏 Using effective radius of ${effectiveRadius} miles`);
      
      // Skip filtering if no search location is provided
      if (!searchLocation) {
        console.log('⏭️ No search location provided, skipping radius filtering');
        setFilteredByRadius(postsWithDistance);
        return;
      }
      
      // Find all posts with valid distances
      const validPosts = postsWithDistance.filter(post => 
        typeof post.distance === 'number' && 
        isFinite(post.distance) && 
        post.distance !== Infinity && 
        !isNaN(post.distance)
      );
      
      console.log(`✅ Found ${validPosts.length} posts with valid distances out of ${postsWithDistance.length} total`);
      
      // Log all posts with their distances for debugging
      validPosts.forEach(post => {
        const locationName = post.location?.name || 'Unknown';
        console.log(`📍 Post ${post.id} in ${locationName}: ${post.distance?.toFixed(2)} miles`);
      });
      
      // Apply radius filtering - include posts within the radius
      const withinRadius = validPosts.filter(post => {
        const isWithinRadius = post.distance !== undefined && post.distance <= effectiveRadius;
        const locationName = post.location?.name || 'Unknown';
        
        if (isWithinRadius) {
          console.log(`✅ Post ${post.id} in ${locationName} at ${post.distance?.toFixed(2)} miles is WITHIN ${effectiveRadius} miles radius`);
        } else {
          console.log(`❌ Post ${post.id} in ${locationName} at ${post.distance?.toFixed(2)} miles is OUTSIDE ${effectiveRadius} miles radius`);
        }
        
        return isWithinRadius;
      });

      console.log(`🎯 After radius filtering: ${withinRadius.length}/${validPosts.length} posts match within ${effectiveRadius} miles radius for "${searchLocation}"`);
      
      // Enhanced debug output showing actual locations
      if (withinRadius.length === 0 && validPosts.length > 0) {
        const closest = validPosts
          .sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity))
          .slice(0, 10); // Show more posts for debugging
          
        console.log(`❌ No posts found within ${effectiveRadius} miles of "${searchLocation}". Closest ${closest.length} posts:`);
        closest.forEach((post, index) => {
          const locationName = post.location?.name || 'Unknown';
          console.log(`  ${index + 1}. ${locationName}: ${post.distance?.toFixed(2)} miles away (${post.distance! > effectiveRadius ? 'OUTSIDE' : 'INSIDE'} radius)`);
        });
        
        // Special debugging for our problem locations
        const problemPosts = closest.filter(post => {
          const locationName = post.location?.name?.toLowerCase() || '';
          return locationName.includes('holmes') || 
                 locationName.includes('chapel') || 
                 locationName.includes('byfleet') ||
                 locationName.includes('west');
        });
        
        if (problemPosts.length > 0) {
          console.log(`🔍 DEBUGGING - Found problem location posts:`, problemPosts.map(p => ({
            id: p.id,
            name: p.location?.name,
            distance: p.distance?.toFixed(2) + ' miles',
            coords: `${p.location?.lat}, ${p.location?.lng}`,
            withinRadius: p.distance! <= effectiveRadius
          })));
        }
      } else if (withinRadius.length > 0) {
        console.log(`✅ Found posts in these locations within ${effectiveRadius} miles of "${searchLocation}":`);
        withinRadius.forEach((post, index) => {
          const locationName = post.location?.name || 'Unknown';
          console.log(`  ${index + 1}. ${locationName}: ${post.distance?.toFixed(2)} miles away`);
        });
      }
      
      // Set the filtered posts
      setFilteredByRadius(withinRadius);
    } catch (error) {
      console.error('❌ Error in useRadiusFilter:', error);
      setFilteredByRadius([]);
    }
  }, [postsWithDistance, searchRadius, searchLocation]);

  return { filteredByRadius };
}
