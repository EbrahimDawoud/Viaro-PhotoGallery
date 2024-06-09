import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignIn from '../components/Auth/SignIn';
import SignUp from '../components/Auth/SignUp';
import PhotoGrid from '../pages/HomePage';
import Favorites from '../pages/Favourite';
import NotFound from  '../pages/NotFound';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/common/Loading';
import ResetPassword from '../components/Auth/ResetPassword';

const AllRoutes = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <Routes>
      {/* Redirect Authenticated Users */}
      <Route path="/signup" element={!currentUser ? <SignUp /> : <Navigate to="/home" />} />
      <Route path="/Login" element={!currentUser ? <SignIn /> : <Navigate to="/home" />} />
      <Route path="/ResetPassword" element={!currentUser ? <ResetPassword /> : <Navigate to="/home" />} />


      {/* Protected Routes */}
      <Route path="/home" element={currentUser ? <PhotoGrid /> : <Navigate to="/Login" />} />
      <Route path="/Favorites" element={currentUser ? <Favorites /> : <Navigate to="/Login" />} />

      {/* Catch-All Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AllRoutes;
