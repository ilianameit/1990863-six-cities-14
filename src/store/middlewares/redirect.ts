import { Middleware, PayloadAction } from '@reduxjs/toolkit';
import { reducer } from '../reducer';

import browserHistory from '../../browser-history';
import { redirectToRoute } from '../actions';

type Reducer = ReturnType<typeof reducer>

export const redirect: Middleware<Reducer> = () => (next) => (action: PayloadAction<string>) => {
  if (typeof action.type === redirectToRoute.toString()) {
    browserHistory.push(action.payload);
  }

  return next(action);
};
