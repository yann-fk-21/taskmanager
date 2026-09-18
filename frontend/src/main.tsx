import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import MyTasks from './pages/MyTasks';
import NotFoundPage from './pages/NotFoundPage';
import { Toaster } from '../app/components/ui/toast';
import ProtectedRoute from './components/ProtectedRoute';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route
          path="/my-tasks"
          element={
            <ProtectedRoute>
              <MyTasks />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
    <Toaster />
  </StrictMode>,
);
