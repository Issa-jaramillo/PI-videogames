import React from 'react';
import App from './App';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client'; 


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
