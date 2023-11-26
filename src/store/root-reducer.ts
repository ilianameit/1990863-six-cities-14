import {combineReducers} from '@reduxjs/toolkit';
import { NameSpace } from '../const/const';
import { favoritesSlice } from './slices/favorites/favorites';
import { nearOffersSlice } from './slices/near-offers/near-offers';
import { offerSlice } from './slices/offer/offer';
import { offersSlice } from './slices/offers/offers';
import { reviewsSlice } from './slices/reviews/reviews';
import { userSlice } from './slices/user/user';


export const rootReducer = combineReducers({
  [NameSpace.Favorites]: favoritesSlice.reducer,
  [NameSpace.NearOffers]: nearOffersSlice.reducer,
  [NameSpace.Offer]: offerSlice.reducer,
  [NameSpace.Offers]: offersSlice.reducer,
  [NameSpace.Reviews]: reviewsSlice.reducer,
  [NameSpace.User]: userSlice.reducer
});
