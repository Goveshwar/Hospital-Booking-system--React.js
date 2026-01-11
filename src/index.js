import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';

// 👇 CHANGE THIS LINE to match your filename
import './App.css'; 

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);