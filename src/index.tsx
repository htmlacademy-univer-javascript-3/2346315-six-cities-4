import { Provider } from 'react-redux';
import { store } from './store';
import { checkAuth, fetchOffers } from './store/api-actions.ts';

import ErrorMessage from './components/error-message/error-message';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

store.dispatch(fetchOffers());
store.dispatch(checkAuth());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App />
    </Provider>
  </React.StrictMode>
);
