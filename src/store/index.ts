import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';
import { initializeAPI } from '../services/api';
import redirectMiddleware from './redirect';

export const api = initializeAPI();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirectMiddleware),
});
