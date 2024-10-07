import React from 'react';
import StartPage from './StartPage';
import { AuthProvider } from './contexts/Auth';

export default function Index() {
  return (
    <AuthProvider>
      <StartPage />
    </AuthProvider>
  );
}
