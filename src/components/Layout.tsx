import React from 'react';
import { Outlet } from 'react-router-dom';
import { Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/" className="flex items-center gap-2 w-fit">
            <Utensils className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Berlin Food Scout</h1>
          </Link>
        </div>
      </header>

      <Outlet />
    </div>
  );
}