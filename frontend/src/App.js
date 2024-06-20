import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/App.css';

import HomePage from './screens/HomePage';
import LoginPage from './screens/LoginPage';
import MyPigs from './screens/MyPigs';
import NewRecord from './screens/NewRecord';
import Profile from './screens/Profile';
import Settings from './screens/Settings';
import Shop from './screens/Shop';
import Wishlist from './screens/Wishlist';
import Transactions from './screens/Transactions';
import PrivateRoute from './components/PrivateRoute';
import ChangePassword from './screens/ChangePassword';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />   {/* Don't comment this line out */}
          <Route path="/resetpassword/:userId/:token" element={<ChangePassword/>} />

          {/* <Route path="/my-pigs" element={<MyPigs />} />
          <Route path="/new-record" element={<NewRecord />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/" element={<HomePage />} /> */}

          {
          /* For ease of testing, block of code below is commented out.
             When testing login, functionality, uncomment the block of code below. 
             and comment out the block above.
           */}


          <Route path="/my-pigs" element={<PrivateRoute><MyPigs /></PrivateRoute>} />
          <Route path="/new-record" element={<PrivateRoute><NewRecord/></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile/> </PrivateRoute>} />
          <Route path="/settings" element={<PrivateRoute> <Settings/> </PrivateRoute>} />
          <Route path="/shop" element={<PrivateRoute> <Shop/> </PrivateRoute>} />
          <Route path="/transactions" element={<PrivateRoute> <Transactions/> </PrivateRoute>} />
          <Route path="/wishlist" element={<PrivateRoute> <Wishlist/> </PrivateRoute>} />
          <Route path="/" element={<PrivateRoute> <HomePage/> </PrivateRoute>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}