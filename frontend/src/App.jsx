import React, { useState } from 'react';
import { AuthProvider, useAuth } from './AuthContext';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';

function AppContent() {
  const { user } = useAuth();
  const [page, setPage] = useState('login');

  if (user) {
    return <Dashboard />;
  }

  return page === 'login' ? (
    <Login onSuccess={() => {}} onSignup={() => setPage('signup')} />
  ) : (
    <Signup onSuccess={() => setPage('login')} />
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
