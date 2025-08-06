
import React, { useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useLocationSearch } from '@/hooks/useLocationSearch';
import LocationSuggestionList from './LocationSuggestionList';
import { useToast } from '@/hooks/use-toast';

interface LocationSearchFormProps {
  onSearch: (data: { location: string; radius: number }) => void;
}

const LocationSearchForm = ({ onSearch }: LocationSearchFormProps) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const { 
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
  } = useLocationSearch({ 
    onSearch,
    searchInputRef
  });

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formContainerRef.current && !formContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowSuggestions]);

  return (
    <div className="pt-10" style={{ paddingLeft: '25px', paddingRight: '25px' }} ref={formContainerRef}>
      <div className="flex flex-col gap-4">
        <div className="relative w-full" style={{ marginTop: '10px' }}>
          <div className="relative">
            <div
              style={{
                backgroundColor: '#90b5cd',
                width: 'calc(100% + 4px)',
                height: '56px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: '-2px'
              }}
            >
              <Input
                ref={searchInputRef}
                type="text"
                placeholder="Start typing location..."
                value={query}
                onChange={handleInputChange}
                onClick={() => {
                  if (suggestions.length > 0) {
                    setShowSuggestions(true);
                  }
                }}
                className="absolute w-full h-full bg-transparent border-none text-[#2977b7] placeholder:text-[#f7f4e3] px-4 py-2 pr-10"
                style={{
                  fontSize: query ? '16pt' : '14pt',
                  fontWeight: query ? 300 : 300,
                  outline: 'none',
                  WebkitAppearance: 'none',
                  WebkitTapHighlightColor: 'transparent',
                  touchAction: 'none',
                  userSelect: 'text',
                  cursor: 'text'
                }}
                data-testid="location-search-input"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#f7f4e3] pointer-events-none">
                <Search size={18} />
              </div>
            </div>
          </div>
          
          <LocationSuggestionList 
            suggestions={suggestions} 
            showSuggestions={showSuggestions}
            onSuggestionClick={handleSuggestionClick}
          />
          
          {isLoading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="w-4 h-4 border-2 border-t-2 border-[#2977b7] rounded-full animate-spin border-t-transparent"></div>
            </div>
          )}

          {error && !isLoading && (
            <div className="mt-2 text-red-500 text-sm text-center">
              {error}. Using fallback search.
            </div>
          )}
        </div>

        <div className="text-[#2977b7] text-sm" style={{ fontSize: '12pt', textAlign: 'left', marginTop: '-13px', marginLeft: '-2px' }}>
          We'll show you all results within ten miles.
        </div>
      </div>
    </div>
  );
};

export default LocationSearchForm;
