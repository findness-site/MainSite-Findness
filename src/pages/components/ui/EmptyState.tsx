
import React from 'react';

interface EmptyStateProps {
  radius?: number;
}

const EmptyState = ({ radius }: EmptyStateProps) => {
  return (
    <div className="mt-6 p-4 text-center">
      <p className="text-[#2977b7] font-nunito">No posts found in this area</p>
      {radius && (
        <p className="text-sm text-gray-500">Try increasing your search radius</p>
      )}
    </div>
  );
};

export default EmptyState;
