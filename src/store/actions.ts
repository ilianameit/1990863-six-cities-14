import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/city';
import { Offer } from '../types/offer';
import { Sorting } from '../types/sorting';
import { AuthorizationStatus } from '../const/const';
import { ReviewType } from '../types/review';
import { UserData } from '../types/user-data';
import { OfferPreview } from '../types/offer-preview';

export const loadOffers = createAction<Offer[]>('data/loadOffers');

export const fetchOffer = createAction<Offer>('offers/getOffer');

export const dropOffer = createAction('offer/dropOffer');

export const fetchNearOffers = createAction<OfferPreview[]>('nearOffers/fetch');

export const fetchReviews = createAction<ReviewType[]>('reviews/fetch');

export const addNewReview = createAction<ReviewType>('reviews/addNewReview');

export const fetchFavoriteOffers = createAction<OfferPreview[]>('favorites/fetch');

export const setOffersLoadingStatus = createAction<boolean>('data/setOffersLoadingStatus');
export const setOfferLoadingStatus = createAction<boolean>('data/setOfferLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setSortingItem = createAction<Sorting>('sorting/setSortingItem');

export const setActiveCity = createAction<City['name']>('offers/setActiveCity');

export const setUser = createAction<UserData | null>('user/setUser');

export const setError = createAction<string | null>('page/setError');

