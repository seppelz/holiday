import React from 'react';
import { MainLayout } from './layouts/MainLayout';
import { PersonProvider } from './contexts/PersonContext';
import { NotificationProvider } from './contexts/NotificationContext';

function App() {
  return (
    <NotificationProvider>
      <PersonProvider>
        <MainLayout />
      </PersonProvider>
    </NotificationProvider>
  );
}

export default App;
