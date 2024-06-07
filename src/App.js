import React from 'react';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/App.css';

import HomePage from './screens/HomePage';
import LoginPage from './screens/LoginPage';
import MyPigs from './screens/MyPigs';
import NewTransaction from './screens/NewTransaction';
import Profile from './screens/Profile';
import Settings from './screens/Settings';
import Shop from './screens/Shop';
import Wishlist from './screens/Wishlist';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* TODO logic for logging in */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/my-pigs" element={<MyPigs />} />
          <Route path="/new-transaction" element={<NewTransaction />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}