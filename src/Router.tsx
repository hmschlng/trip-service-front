// src/Router.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import PlanList from './pages/plan/PlanList';
import PlanCreate from './pages/plan/PlanCreate';
import RecommendList from './pages/recommend/RecommendList';
import RecommendDetail from './pages/recommend/RecommendDetail';
import ReviewList from './pages/review/ReviewList';
import ReviewDetail from './pages/review/ReviewDetail';
import ReviewCreate from './pages/review/ReviewCreate';
import ProtectedRoute from './components/common/ProtectedRoute';

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<Layout />}>
        <Route index element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/plans" element={
          <ProtectedRoute>
            <PlanList />
          </ProtectedRoute>
        } />
        <Route path="/plans/new" element={
          <ProtectedRoute>
            <PlanCreate />
          </ProtectedRoute>
        } />
        <Route path="/recommendations" element={
          <ProtectedRoute>
            <RecommendList />
          </ProtectedRoute>
        } />
        <Route path="/recommendations/:placeId" element={
          <ProtectedRoute>
            <RecommendDetail />
          </ProtectedRoute>
        } />
        <Route path="/reviews" element={
          <ProtectedRoute>
            <ReviewList />
          </ProtectedRoute>
        } />
        <Route path="/reviews/:reviewId" element={
          <ProtectedRoute>
            <ReviewDetail />
          </ProtectedRoute>
        } />
        <Route path="/reviews/new" element={
          <ProtectedRoute>
            <ReviewCreate />
          </ProtectedRoute>
        } />
      </Route>
    </Routes>
  );
};

export default Router;