
import React from 'react';
import { MapPin } from 'lucide-react';
import { PlaceSuggestion } from '@/hooks/useLocationSearch';

interface LocationSuggestionListProps {
  suggestions: PlaceSuggestion[];
  showSuggestions: boolean;
  onSuggestionClick: (suggestion: PlaceSuggestion) => void;
}

const LocationSuggestionList = ({ 
  suggestions, 
  showSuggestions, 
  onSuggestionClick 
}: LocationSuggestionListProps) => {
  if (!showSuggestions || suggestions.length === 0) {
    return null;
  }

  const handleSuggestionClick = (suggestion: PlaceSuggestion, event: React.MouseEvent) => {
    // Stop propagation and prevent default to avoid any interference
    event.preventDefault();
    event.stopPropagation();
    
    // Log the click for debugging
    console.log('Suggestion clicked in LocationSuggestionList:', suggestion);
    console.log('Full suggestion data:', JSON.stringify(suggestion));
    
    // Call the passed click handler
    onSuggestionClick(suggestion);
  };

  return (
    <div 
      className="absolute z-50 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto border border-[#90b5cd]"
      data-testid="suggestion-list"
    >
      {suggestions.map((suggestion) => (
        <div
          key={suggestion.id}
          onClick={(e) => handleSuggestionClick(suggestion, e)}
          className="p-3 hover:bg-[#f0f7fc] cursor-pointer flex items-start"
          data-testid={`suggestion-item-${suggestion.id}`}
        >
          <MapPin size={16} className="mt-1 mr-2 text-[#2977b7]" />
          <div>
            <div className="font-medium text-[#2977b7]">{suggestion.name}</div>
            {suggestion.description && (
              <div className="text-sm text-gray-500">{suggestion.description}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LocationSuggestionList;
