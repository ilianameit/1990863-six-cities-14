import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { Offer } from '../types/offer';
import { APIRoute, AuthorizationStatus } from '../const/const';
import { addNewReview, fetchFavoriteOffers, fetchNearOffers, fetchOffer, fetchReviews, loadOffers, requireAuthorization, setOfferLoadingStatus, setOffersLoadingStatus, setUser } from './actions';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { dropToken, saveToken } from '../services/token';
import { OfferPreview } from '../types/offer-preview';
import { ReviewShortType, ReviewType } from '../types/review';

type AsyncActionType = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};


export const fetchOffersAction = createAsyncThunk<
  void,
  undefined,
  AsyncActionType
>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    try{
      dispatch(setOffersLoadingStatus(true));
      const {data} = await api.get<Offer[]>(APIRoute.Offers);
      dispatch(loadOffers(data));
    } finally {
      dispatch(setOffersLoadingStatus(false));
    }
  },
);

export const fetchOfferAction = createAsyncThunk<
  void,
  Offer['id'],
  AsyncActionType
>(
  'data/fetchOffer',
  async (id, {dispatch, extra: api }) => {
    try{
      dispatch(setOfferLoadingStatus(true));
      const {data} = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
      dispatch(fetchOffer(data));
    } finally {
      dispatch(setOfferLoadingStatus(false));
    }
  }
);

export const fetchFavoriteOffersAction = createAsyncThunk<
  void,
  undefined,
  AsyncActionType
>(
  'data/fetchFavorites',
  async (_arg, {dispatch, extra: api }) => {
    const {data} = await api.get<OfferPreview[]>(APIRoute.Favorite);
    dispatch(fetchFavoriteOffers(data));
  }
);

export const fetchNearOffersAction = createAsyncThunk<
  void,
  OfferPreview['id'],
  AsyncActionType
>(
  'data/fetchNearby',
  async (id, {dispatch, extra: api }) => {
    const {data} = await api.get<OfferPreview[]>(`${APIRoute.Offers}/${id + APIRoute.Nearby}`);
    dispatch(fetchNearOffers(data));
  }
);

export const fetchReviewsAction = createAsyncThunk<
  void,
  Offer['id'],
  AsyncActionType
>(
  'data/fetchReviews',
  async (id, {dispatch, extra: api }) => {
    const {data} = await api.get<ReviewType[]>(`${APIRoute.Comments}/${id}`);
    dispatch(fetchReviews(data));
  }
);

export const addNewReviewAction = createAsyncThunk<
  void,
  [Offer['id'], ReviewShortType],
  AsyncActionType
>(
  'data/postReview',
  async ([id, formData], {dispatch, extra: api }) => {
    const {data} = await api.post<ReviewType>(`${APIRoute.Comments}/${id}`, formData);
    dispatch(addNewReview(data));
  }
);

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  AsyncActionType
>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const { data } = await api.get<UserData>(APIRoute.Login);
      dispatch(setUser(data));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

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
        dispatch(requireAuthorization(AuthorizationStatus.Auth));
        dispatch(setUser(data));
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
