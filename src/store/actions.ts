import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/city';
import { Offer } from '../types/offer';
import { Sorting } from '../types/sorting';

export const fetchOffer = createAction<Offer['id']>('offers/getOffer');

export const fetchNearOffers = createAction<Offer['id']>('nearOffers/fetch');

export const fetchReviews = createAction<Offer['id']>('reviews/fetch');

export const dropOffer = createAction('offer/dropOffer');

export const setActiveCity = createAction<City['name']>('offers/setActiveCity');

export const fetchFavoriteOffers = createAction('favorites/fetch');

export const setSortingItem = createAction<Sorting>('sorting/setSortingItem');

export const loadOffers = createAction<Offer[]>('data/loadOffers');
export const setOffersLoadingStatus = createAction<boolean>('data/setOffersLoadingStatus');
