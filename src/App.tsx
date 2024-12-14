import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { MainLayout } from './layouts/MainLayout';
import { LandingPage } from './pages/LandingPage/LandingPage';
import { StatePage } from './pages/StatePage';
import { PersonProvider } from './contexts/PersonContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { Navbar } from './components/Navigation/Navbar';

// Wrapper components for different layouts
const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

function App() {
  return (
    <HelmetProvider>
      <Router basename="/holiday">
        <NotificationProvider>
          <PersonProvider>
            <Routes>
              <Route path="/" element={
                <DefaultLayout>
                  <LandingPage />
                </DefaultLayout>
              } />
              <Route path="/app" element={<MainLayout />} />
              <Route path="/state/:stateId" element={
                <DefaultLayout>
                  <StatePage />
                </DefaultLayout>
              } />
              <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
          </PersonProvider>
        </NotificationProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;
