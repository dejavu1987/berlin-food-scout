import React, { useState, useRef, useEffect } from 'react';
import { Search, Tag, MapPin } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  restaurants: Array<{
    name: string;
    tags: string[];
  }>;
}

export default function SearchBar({ onSearch, restaurants }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Array<{ type: 'restaurant' | 'tag'; value: string }>>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getSuggestions = (input: string) => {
    if (!input.trim()) return [];

    const lowercaseInput = input.toLowerCase();
    const results: Array<{ type: 'restaurant' | 'tag'; value: string }> = [];
    
    // Get restaurant name matches
    restaurants.forEach(restaurant => {
      if (restaurant.name.toLowerCase().includes(lowercaseInput)) {
        results.push({ type: 'restaurant', value: restaurant.name });
      }
    });

    // Get unique tags that match
    const uniqueTags = new Set<string>();
    restaurants.forEach(restaurant => {
      restaurant.tags.forEach(tag => {
        if (tag.toLowerCase().includes(lowercaseInput)) {
          uniqueTags.add(tag);
        }
      });
    });
    uniqueTags.forEach(tag => {
      results.push({ type: 'tag', value: tag });
    });

    return results.slice(0, 6); // Limit to 6 suggestions
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSuggestions(getSuggestions(value));
    setIsOpen(true);
    onSearch(value);
  };

  const handleSuggestionClick = (suggestion: { type: 'restaurant' | 'tag'; value: string }) => {
    setQuery(suggestion.value);
    onSearch(suggestion.value);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <input
        type="text"
        value={query}
        placeholder="Search restaurants, cuisines, or locations..."
        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        onChange={handleInputChange}
        onFocus={() => query && setIsOpen(true)}
      />
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
      
      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200 max-h-[300px] overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={`${suggestion.type}-${suggestion.value}-${index}`}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 border-b last:border-b-0 border-gray-100"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.type === 'restaurant' ? (
                <MapPin className="w-4 h-4 text-gray-400" />
              ) : (
                <Tag className="w-4 h-4 text-gray-400" />
              )}
              <span>{suggestion.value}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}