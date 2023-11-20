import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/city';
import { Offer } from '../types/offer';
import { Sorting } from '../types/sorting';
import { AuthorizationStatus } from '../const/const';
import { ReviewType } from '../types/review';
import { User } from '../types/user';

export const fetchOffer = createAction<Offer>('offers/getOffer');

export const fetchNearOffers = createAction<Offer['id']>('nearOffers/fetch');

export const fetchReviews = createAction<ReviewType[]>('reviews/fetch');

export const dropOffer = createAction('offer/dropOffer');

export const setActiveCity = createAction<City['name']>('offers/setActiveCity');

export const fetchFavoriteOffers = createAction('favorites/fetch');

export const setSortingItem = createAction<Sorting>('sorting/setSortingItem');

export const loadOffers = createAction<Offer[]>('data/loadOffers');

export const setOffersLoadingStatus = createAction<boolean>('data/setOffersLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setUser = createAction<User | null>('user/setUser');

export const setError = createAction<string | null>('page/setError');
