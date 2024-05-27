import { PayloadAction } from '@reduxjs/toolkit';
import { Middleware } from 'redux';
import { reducer } from './reducer';
import { browserHistory } from '../browser-history.ts';

type Reducer = ReturnType<typeof reducer>;

const redirectMiddleware: Middleware<unknown, Reducer> = () => (next) => (action: PayloadAction<string>) => {
  if (action.type === 'redirectToRoute') {
    browserHistory.push(action.payload);
  }

  return next(action);
};

export default redirectMiddleware;