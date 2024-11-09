import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Tag, ArrowLeft, Send } from 'lucide-react';
import RatingStars from '../components/RatingStars';
import MapView from '../components/Map';
import { SAMPLE_RESTAURANTS } from '../data/restaurants';

export default function RestaurantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const restaurant = SAMPLE_RESTAURANTS.find(r => r.id === Number(id));
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(0);

  if (!restaurant) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Restaurant not found</h2>
          <button
            onClick={() => navigate('/')}
            className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="w-4 h-4" /> Back to restaurants
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate('/')}
        className="mb-6 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
      >
        <ArrowLeft className="w-4 h-4" /> Back to restaurants
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <img src={restaurant.image} alt={restaurant.name} className="w-full h-64 object-cover" />
            <div className="p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{restaurant.name}</h1>
              
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <MapPin className="w-5 h-5" />
                <span>{restaurant.address}</span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <RatingStars rating={restaurant.rating} onRatingChange={() => {}} />
                <span className="text-gray-600">({restaurant.reviews} reviews)</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {restaurant.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Write a Review</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
              <RatingStars rating={newRating} onRatingChange={setNewRating} editable />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
              <textarea
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Share your experience..."
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
              />
            </div>
            <button
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => {
                console.log('Submitting review:', { rating: newRating, review: newReview });
                setNewReview('');
                setNewRating(0);
              }}
            >
              <Send className="w-4 h-4" />
              Submit Review
            </button>
          </div>
        </div>

        <div className="h-[calc(100vh-8rem)] sticky top-24">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full">
            <MapView
              restaurants={[restaurant]}
              onRestaurantClick={() => {}}
            />
          </div>
        </div>
      </div>
    </main>
  );
}