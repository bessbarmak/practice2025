// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { GlobalStyle } from './styles/GlobalStyles';
import { AppLayout } from './AppLayout';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <React.StrictMode>
    <GlobalStyle />
    <AppLayout />
  </React.StrictMode>
  </BrowserRouter>
);