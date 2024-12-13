import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import App from './App';
import Cookies from 'js-cookie';
import { registerServiceWorker } from './registerSW';

// Clear the cookie on startup
Cookies.remove('holiday-planner-persons');

// Register service worker
registerServiceWorker();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
