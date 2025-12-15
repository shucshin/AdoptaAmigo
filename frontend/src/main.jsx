// xim28-25/adoptamascota/AdoptaMascota-Slytherin/Aplicacion/frontend/src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/AuthContext.jsx'; // <-- Importar AuthProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* <-- ENVOLVER LA APP CON EL PROVEEDOR */}
      <App />
    </AuthProvider>
  </React.StrictMode>,
);