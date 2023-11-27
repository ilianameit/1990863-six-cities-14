import { createSlice } from '@reduxjs/toolkit';
import { OfferPreview } from '../../../types/offer-preview';
import { NameSpace } from '../../../const/const';
import { changeFavoriteStatusAction, fetchFavoriteOffersAction } from '../../api-actions';

type FavoritesStateType = {
  favorites: OfferPreview[];
  hasError: boolean;
}

const initialState: FavoritesStateType = {
  favorites: [],
  hasError: false
};

export const favoritesSlice = createSlice({
  name: NameSpace.Favorites,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(changeFavoriteStatusAction.pending, (state) => {
        state.hasError = false;
      })
      .addCase(changeFavoriteStatusAction.fulfilled, (state, action) => {
        const isFavorite = action.payload.isFavorite;

        if(isFavorite) {
          state.favorites.push(action.payload);
        }
        if(!isFavorite) {
          state.favorites = state.favorites.filter(
            (offer) => offer.id !== action.payload.id
          );
        }
        state.hasError = false;
      })
      .addCase(changeFavoriteStatusAction.rejected, (state) => {
        state.hasError = true;
      });
  },
});
