// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './styles/theme';
import Layout from './components/common/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import PlanList from './pages/plan/PlanList';
// import PlanDetail from './pages/plan/PlanDetail';
import PlanCreate from './pages/plan/PlanCreate';
import RecommendList from './pages/recommend/RecommendList';
import RecommendDetail from './pages/recommend/RecommendDetail';
import ReviewList from './pages/review/ReviewList';
import ReviewDetail from './pages/review/ReviewDetail';
import ReviewCreate from './pages/review/ReviewCreate';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/plans" element={<PlanList />} />
          {/* <Route path="/plans/:planId" element={<PlanDetail />} /> */}
          <Route path="/plans/new" element={<PlanCreate />} />
          <Route path="/recommendations" element={<RecommendList />} />
          <Route path="/recommendations/:placeId" element={<RecommendDetail />} />
          <Route path="/reviews" element={<ReviewList />} />
          <Route path="/reviews/:reviewId" element={<ReviewDetail />} />
          <Route path="/reviews/new" element={<ReviewCreate />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;