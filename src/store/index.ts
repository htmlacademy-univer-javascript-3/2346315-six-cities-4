import { configureStore } from '@reduxjs/toolkit';
import { initializeAPI } from '../services/api';
import { rootReducer } from './root-reducer';

import redirectMiddleware from './redirect';

export const api = initializeAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirectMiddleware),
});
