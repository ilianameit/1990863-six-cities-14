import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/city';
import { Offer } from '../types/offer';

export const fetchOffers = createAction('offers/fetch');

export const fetchOffer = createAction<Offer['id']>('offer/fetch');

export const fetchNearOffers = createAction<Offer['id']>('nearOffers/fetch');

export const fetchReviews = createAction<Offer['id']>('reviews/fetch');

export const dropOffer = createAction('offer/dropOffer');

export const setActiveCity = createAction<City['name']>('offers/setActiveCity');

export const fetchFavoriteOffers = createAction('favorites/fetch');
