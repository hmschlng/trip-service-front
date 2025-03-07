// src/App.tsx
import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useAuth } from './hooks/useAuth';
import { theme } from './styles/theme';
import Layout from './components/common/Layout';
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
import ReviewUpdate from './pages/review/ReviewUpdate';

// 인증이 필요한 라우트를 위한 래퍼 컴포넌트
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { auth, checkAuth } = useAuth();
  
  useEffect(() => {
    if (!auth.isAuthenticated) {
      checkAuth();
    }
  }, [auth.isAuthenticated, checkAuth]);
  
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              
              <Route path="/plans" element={
                <ProtectedRoute>
                  <PlanList />
                </ProtectedRoute>
              } />
              <Route path="/plans/:planId" element={
                <ProtectedRoute>
                  <PlanDetail />
                </ProtectedRoute>
              } />
              <Route path="/plans/new" element={
                <ProtectedRoute>
                  <PlanCreate />
                </ProtectedRoute>
              } />
              
              <Route path="/recommendations" element={<RecommendList />} />
              <Route path="/recommendations/:placeId" element={<RecommendDetail />} />
              
              <Route path="/reviews" element={
                <ProtectedRoute>
                  <ReviewList />
                </ProtectedRoute>
              } />
              <Route path="/reviews/:reviewId" element={<ReviewDetail />} />
              <Route path="/reviews/new" element={
                <ProtectedRoute>
                  <ReviewCreate />
                </ProtectedRoute>
              } />
              <Route path="/reviews/edit/:reviewId" element={
                <ProtectedRoute>
                  <ReviewUpdate />
                </ProtectedRoute>
              } />
            </Route>
          </Routes>
        </LocalizationProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;