import React from 'react';
import Map, { Marker } from 'react-map-gl';
import { MapPin } from 'lucide-react';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Restaurant {
  id: number;
  name: string;
  lat: number;
  lng: number;
}

interface MapViewProps {
  restaurants: Restaurant[];
  onRestaurantClick: (id: number) => void;
}

export default function MapView({ restaurants, onRestaurantClick }: MapViewProps) {
  return (
    <Map
      initialViewState={{
        latitude: 52.52,
        longitude: 13.405,
        zoom: 11
      }}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/light-v11"
      mapboxAccessToken="pk.eyJ1IjoibW9tb2NvZGVyIiwiYSI6ImNtMzl4MmFnMjEzdmcybHI2NjA0bzg5Y3cifQ.vVysQkr6pnzA4UHhk0ga8g"
    >
      {restaurants.map((restaurant) => (
        <Marker
          key={restaurant.id}
          latitude={restaurant.lat}
          longitude={restaurant.lng}
          onClick={() => onRestaurantClick(restaurant.id)}
        >
          <MapPin className="w-8 h-8 text-red-500 -translate-y-full cursor-pointer hover:text-red-600 transition-colors" />
        </Marker>
      ))}
    </Map>
  );
}