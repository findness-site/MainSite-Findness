
import { useState } from 'react';
import { useGooglePlacesApi } from '@/hooks/useGooglePlacesApi';
import { useToast } from '@/hooks/use-toast';

export interface PlaceSuggestion {
  id: string;
  name: string;
  description?: string;
}

interface UseLocationSearchReturn {
  query: string;
  setQuery: (value: string) => void;
  suggestions: PlaceSuggestion[];
  isLoading: boolean;
  error: string | null;
  showSuggestions: boolean;
  setShowSuggestions: (value: boolean) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleSuggestionClick: (suggestion: PlaceSuggestion) => void;
  handleSearch: (e: React.FormEvent) => void;
}

interface UseLocationSearchProps {
  onSearch: (data: { location: string; radius: number }) => void;
  searchInputRef?: React.RefObject<HTMLInputElement>;
}

// Fixed radius constant (10 miles)
const FIXED_RADIUS = 10;

export const useLocationSearch = ({ onSearch, searchInputRef }: UseLocationSearchProps): UseLocationSearchReturn => {
  const [query, setQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const { isLoaded, error, getPlaceSuggestions } = useGooglePlacesApi();
  const { toast } = useToast();

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log('Input changed to:', value);
    setQuery(value);
    
    if (value.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    
    if (!isLoaded) {
      console.log('Google Places API not loaded yet');
      return;
    }
    
    setIsLoading(true);
    setShowSuggestions(true);
    
    try {
      console.log('Fetching suggestions for:', value);
      const results = await getPlaceSuggestions(value);
      console.log('Got suggestions:', results);
      
      // If we have results from the API, use them
      if (results.length > 0) {
        setSuggestions(results);
      }
      // If no results from API but input is longer than 3 chars, add it as manual suggestion
      else if (value.trim().length > 3) {
        // Create a manual suggestion from the user's input
        const manualSuggestion: PlaceSuggestion = {
          id: `manual-${Date.now()}`,
          name: value.trim(),
          description: `Search for "${value.trim()}"`
        };
        setSuggestions([manualSuggestion]);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: PlaceSuggestion) => {
    // Always use the full description for more accurate geocoding
    const locationText = suggestion.description || suggestion.name;
    
    console.log('Selected suggestion with full description:', locationText);
    setQuery(locationText);
    
    if (searchInputRef?.current) {
      searchInputRef.current.value = locationText;
      const event = new Event('input', { bubbles: true });
      searchInputRef.current.dispatchEvent(event);
    }
    
    setSuggestions([]);
    setShowSuggestions(false);
    
    // Trigger search with complete location text
    onSearch({
      location: locationText,
      radius: FIXED_RADIUS
    });
    
    toast({
      title: "Location selected",
      description: `Searching ${FIXED_RADIUS} miles around ${locationText}`,
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query || query.trim() === '') {
      toast({
        title: "Please enter a location",
        description: "Location is required for search",
        variant: "destructive"
      });
      return;
    }
    
    // Ensure we have a clean, complete search text
    const searchText = query.trim();
    
    console.log('Form submitted with location:', searchText);
    
    onSearch({ 
      location: searchText, 
      radius: FIXED_RADIUS 
    });
    
    setShowSuggestions(false);
    
    toast({
      title: "Search initiated",
      description: `Searching ${FIXED_RADIUS} miles around ${searchText}`,
    });
  };

  return {
    query,
    setQuery,
    suggestions,
    isLoading,
    error,
    showSuggestions,
    setShowSuggestions,
    handleInputChange,
    handleSuggestionClick,
    handleSearch
  };
};
