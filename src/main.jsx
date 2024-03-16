import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './satoshi.css';
import { Provider } from 'react-redux';
import store from "./Redux/Store/Store";

ReactDOM.createRoot(document.getElementById('abdush')).render(
  <React.StrictMode>
     <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
);
