import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import RestaurantDetail from './pages/RestaurantDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/restaurant/:id" element={<RestaurantDetail />} />
      </Route>
    </Routes>
  );
}

export default App;