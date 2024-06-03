import { PayloadAction } from '@reduxjs/toolkit';
import { Middleware } from 'redux';
import { rootReducer } from './root-reducer.ts';
import { browserHistory } from '../browser-history.ts';

type Reducer = ReturnType<typeof rootReducer>;

const redirectMiddleware: Middleware<unknown, Reducer> = () => (next) => (action: PayloadAction<string>) => {
  if (action.type === 'route/redirect') {
    browserHistory.push(action.payload);
  }

  return next(action);
};

export default redirectMiddleware;
