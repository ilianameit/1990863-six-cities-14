import { createReducer } from '@reduxjs/toolkit';
import { City } from '../types/city';
import { OfferPreview } from '../types/offer-preview';
import { ReviewType } from '../types/review';
import { dropOffer, fetchNearOffers, fetchOffer, fetchReviews, setActiveCity, fetchFavoriteOffers, setSortingItem, loadOffers, setOffersLoadingStatus } from './actions';
import { reviews } from '../mocks/reviews';
import { Offer } from '../types/offer';
import { Sorting } from '../types/sorting';
import { offers } from '../mocks/offers';

const initialState: {
  activeCity: City['name'];
  offers: Offer[];
  nearOffers: OfferPreview[];
  offer: Offer| null;
  reviews: ReviewType[];
  favorites: OfferPreview[];
  sotringByItem: Sorting;
  isOffersLoading: boolean;
} = {
  activeCity: 'Paris',
  offers: [],
  nearOffers: [],
  offer: null,
  reviews: [],
  favorites: [],
  sotringByItem: 'Popular',
  isOffersLoading: false
};

const reducer = createReducer(initialState, (bulder) => {
  bulder
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
    })
    .addCase(setSortingItem, (state, action) => {
      state.sotringByItem = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersLoadingStatus, (state, action) => {
      state.isOffersLoading = action.payload;
    });
});

export {reducer};
