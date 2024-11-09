import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  editable?: boolean;
}

export default function RatingStars({ rating, onRatingChange, editable = false }: RatingStarsProps) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-6 h-6 ${
            star <= rating
              ? 'text-yellow-400 fill-yellow-400'
              : 'text-gray-300'
          } ${editable ? 'cursor-pointer' : ''}`}
          onClick={() => editable && onRatingChange(star)}
        />
      ))}
    </div>
  );
}