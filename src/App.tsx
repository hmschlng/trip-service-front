// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { SnackbarProvider } from 'notistack';
import { theme } from './styles/theme';
import Layout from './components/common/Layout';
import ProtectedRoute from './components/common/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import PlanList from './pages/plan/PlanList';
import PlanDetail from './pages/plan/PlanDetail';
import PlanCreate from './pages/plan/PlanCreate';
import RecommendList from './pages/recommend/RecommendList';
import RecommendDetail from './pages/recommend/RecommendDetail';
import ReviewList from './pages/review/ReviewList';
import ReviewDetail from './pages/review/ReviewDetail';
import ReviewCreate from './pages/review/ReviewCreate';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
        <CssBaseline />
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
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;