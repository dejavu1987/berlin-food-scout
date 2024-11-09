import React, { useState } from 'react';
import { Map as MapIcon, Utensils } from 'lucide-react';
import RestaurantCard from '../components/RestaurantCard';
import MapView from '../components/Map';
import SearchBar from '../components/SearchBar';
import { useNavigate } from 'react-router-dom';
import { SAMPLE_RESTAURANTS } from '../data/restaurants';

export default function HomePage() {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [restaurants, setRestaurants] = useState(SAMPLE_RESTAURANTS);
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setRestaurants(SAMPLE_RESTAURANTS);
      return;
    }

    const lowercaseQuery = query.toLowerCase();
    const filtered = SAMPLE_RESTAURANTS.filter(restaurant => 
      restaurant.name.toLowerCase().includes(lowercaseQuery) ||
      restaurant.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
    setRestaurants(filtered);
  };

  const handleRestaurantClick = (id: number) => {
    navigate(`/restaurant/${id}`);
  };

  return (
    <>
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-end">
            <button
              onClick={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              {viewMode === 'list' ? <MapIcon className="w-5 h-5" /> : <Utensils className="w-5 h-5" />}
              <span>{viewMode === 'list' ? 'Map View' : 'List View'}</span>
            </button>
          </div>
          <div className="mt-4">
            <SearchBar 
              onSearch={handleSearch}
              restaurants={SAMPLE_RESTAURANTS}
            />
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {viewMode === 'list' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                {...restaurant}
                onClick={() => handleRestaurantClick(restaurant.id)}
              />
            ))}
          </div>
        ) : (
          <div className="h-[calc(100vh-12rem)] rounded-xl overflow-hidden">
            <MapView
              restaurants={restaurants}
              onRestaurantClick={handleRestaurantClick}
            />
          </div>
        )}
      </main>
    </>
  );
}