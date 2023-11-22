import { createReducer } from '@reduxjs/toolkit';
import { City } from '../types/city';
import { OfferPreview } from '../types/offer-preview';
import { ReviewType } from '../types/review';
import { dropOffer, fetchNearOffers, fetchReviews, setActiveCity, fetchFavoriteOffers, setSortingItem, loadOffers, setOffersLoadingStatus, requireAuthorization, fetchOffer, setUser, setOfferLoadingStatus, addNewReview } from './actions';
import { Offer } from '../types/offer';
import { Sorting } from '../types/sorting';
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
  isOfferLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
} = {
  activeCity: 'Paris',
  offers: [],
  nearOffers: [],
  offer: null,
  reviews: [],
  favorites: [],
  sotringByItem: 'Popular',
  isOffersLoading: false,
  isOfferLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

const reducer = createReducer(initialState, (bulder) => {
  bulder
    .addCase(fetchOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(fetchNearOffers, (state, action) => {
      state.nearOffers = action.payload;
    })
    .addCase(fetchReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(addNewReview, (state, action) => {
      state.reviews.push(action.payload);
    })
    .addCase(dropOffer, (state) => {
      state.offer = null;
      state.nearOffers = [];
      state.reviews = [];
    })
    .addCase(setActiveCity, (state, action) => {
      state.activeCity = action.payload;
    })
    .addCase(fetchFavoriteOffers, (state, action) => {
      state.favorites = action.payload;
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
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(setOfferLoadingStatus, (state, action) => {
      state.isOfferLoading = action.payload;
    });
});

export {reducer};
