import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';
import { initializeAPI } from '../components/services/api';

export const api = initializeAPI();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});