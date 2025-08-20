import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Standard import for global styles
import App from './App'; // Import the main App component

// This code finds the 'root' div in your public/index.html and renders the App component into it.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);