
import React from 'react';
import { Post } from '@/data/mockPosts';
import PostCard from './PostCard';

interface PostsListProps {
  posts: Post[];
  location?: string;
  radius?: number;
  noResultsFound?: boolean;
}

const PostsList = ({ posts, location, radius, noResultsFound = false }: PostsListProps) => {
  const isFiltered = !!location;
  const hasPosts = posts && posts.length > 0;
  
  console.log(`PostsList: Rendering with ${posts.length} posts, location: ${location || 'none'}, noResultsFound: ${noResultsFound}`);
  
  return (
    <div className="mt-4">
      <p className="text-[#2977b7] font-nunito ml-10 mb-2.5 text-[26.5px]">
        Tap a photo for directions
      </p>
      
      {/* Show the posts if we have any, otherwise show appropriate message */}
      {hasPosts ? (
        <div className="flex flex-col">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        !location ? (
          <p className="text-[#2977b7] font-nunito text-lg px-4 mb-4">
            Enter a location above to search for items near you.
          </p>
        ) : (
          <div className="px-4 mb-4">
            <p className="text-[#2977b7] font-nunito text-lg mb-3">
              No items available within {radius} miles of {location}.
            </p>
            <p className="text-[#2977b7] font-nunito text-base opacity-80">
              Try searching a different location or increasing your search radius.
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default PostsList;
