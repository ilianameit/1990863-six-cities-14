import { createReducer } from '@reduxjs/toolkit';
import { City } from '../types/city';
import { OfferPreview } from '../types/offer-preview';
import { offers } from '../mocks/offers';
import { ReviewType } from '../types/review';
import { dropOffer, fetchNearOffers, fetchOffer, fetchOffers, fetchReviews, setActiveCity, fetchFavoriteOffers } from './actions';
import { reviews } from '../mocks/reviews';
import { Offer } from '../types/offer';

const initialState: {
  activeCity: City['name'];
  offers: Offer[];
  nearOffers: OfferPreview[];
  offer: Offer| null;
  reviews: ReviewType[];
  favorites: OfferPreview[];
} = {
  activeCity: 'Paris',
  offers,
  nearOffers: [],
  offer: null,
  reviews: [],
  favorites: []
};

const reducer = createReducer(initialState, (bulder) => {
  bulder
    .addCase(fetchOffers, (state) => {
      state.offers = offers;
    })
    .addCase(fetchOffer, (state, action) => {
      state.offer = offers.find((offer) => offer.id === action.payload) ?? null;
    })
    .addCase(fetchNearOffers, (state, action) => {
      state.nearOffers = offers.filter((offer) => offer.id !== action.payload);
    })
    .addCase(fetchReviews, (state) => {
      state.reviews = reviews;
    })
    .addCase(dropOffer, (state) => {
      state.offer = null;
      state.nearOffers = [];
    })
    .addCase(setActiveCity, (state, action) => {
      state.activeCity = action.payload;
    })
    .addCase(fetchFavoriteOffers, (state) => {
      state.favorites = offers.filter((offer) => offer.isFavorite);
    });
});

export {reducer};
