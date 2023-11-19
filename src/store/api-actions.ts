import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { Offer } from '../types/offer';
import { APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const/const';
import { loadOffers, requireAuthorization, setError, setOffersLoadingStatus, setUser } from './actions';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { dropToken, saveToken } from '../services/token';
import { store } from '.';

type AsyncActionType = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

export const clearErrorAction = createAsyncThunk(
  'page/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const fetchOffersAction = createAsyncThunk<
  void,
  undefined,
  AsyncActionType
>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersLoadingStatus(true));
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(setOffersLoadingStatus(false));
    dispatch(loadOffers(data));
  },
);

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  AsyncActionType
>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

//всегда NoAuth статус
export const loginAction = createAsyncThunk<
  void,
  AuthData,
  AsyncActionType
  >(
    'user/login',
    async ({email, password}, {dispatch, extra: api}) => {
      try {
        const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
        const {token} = data;
        saveToken(token);
        dispatch(setUser(data));
        dispatch(requireAuthorization(AuthorizationStatus.Auth));
      } catch {
        dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      }
    }
  );

export const logoutAction = createAsyncThunk<void, undefined, AsyncActionType>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(setUser(null));
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
);
