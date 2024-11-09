import React from 'react';
import { Star, MapPin, Tag } from 'lucide-react';

interface RestaurantCardProps {
  id: number;
  name: string;
  rating: number;
  image: string;
  address: string;
  tags: string[];
  reviews: number;
  onClick: () => void;
}

export default function RestaurantCard({ name, rating, image, address, tags, reviews, onClick }: RestaurantCardProps) {
  return (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02] cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-48">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="font-semibold">{rating.toFixed(1)}</span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
        <div className="flex items-center gap-2 text-gray-600 mb-3">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{address}</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>
        <div className="text-sm text-gray-500">
          {reviews} reviews
        </div>
      </div>
    </div>
  );
}