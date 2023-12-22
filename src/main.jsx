import React from 'react';
import ReactDOM from 'react-dom/client';
import Routers from './router.jsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'react-toastify/dist/ReactToastify.css';
import App from './App.jsx'




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Routers /> */}
    <App />
  </React.StrictMode>,
)

