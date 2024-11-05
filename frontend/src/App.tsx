import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { StudentProvider } from './context/StudentContext';
import Login from './components/auth/Login';
import Dashboard from './components/student/Dashboard';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <StudentProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              success: {
                style: {
                  background: 'white',
                  color: '#10B981',
                },
              },
              error: {
                style: {
                  background: 'white',
                  color: '#EF4444',
                },
              },
            }}
          />
        </Router>
      </StudentProvider>
    </AuthProvider>
  );
};

export default App;