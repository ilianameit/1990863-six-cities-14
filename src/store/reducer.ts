import { createReducer } from '@reduxjs/toolkit';
import { City } from '../types/city';
import { OfferPreview } from '../types/offer-preview';
import { ReviewType } from '../types/review';
import { dropOffer, fetchNearOffers, fetchReviews, setActiveCity, fetchFavoriteOffers, setSortingItem, loadOffers, setOffersLoadingStatus, requireAuthorization, setError, fetchOffer, setUser } from './actions';
import { Offer } from '../types/offer';
import { Sorting } from '../types/sorting';
import { offers } from '../mocks/offers';
import { AuthorizationStatus } from '../const/const';
import { UserData } from '../types/user-data';

const initialState: {
  activeCity: City['name'];
  offers: Offer[];
  nearOffers: OfferPreview[];
  offer: Offer| null;
  reviews: ReviewType[];
  favorites: OfferPreview[];
  sotringByItem: Sorting;
  isOffersLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
  error: string | null;
} = {
  activeCity: 'Paris',
  offers: [],
  nearOffers: [],
  offer: null,
  reviews: [],
  favorites: [],
  sotringByItem: 'Popular',
  isOffersLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  error: null,
};

const reducer = createReducer(initialState, (bulder) => {
  bulder
    .addCase(fetchOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(fetchNearOffers, (state, action) => {
      state.nearOffers = offers.filter((offer) => offer.id !== action.payload);
    })
    .addCase(fetchReviews, (state, action) => {
      state.reviews = action.payload;
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
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    });
});

export {reducer};
