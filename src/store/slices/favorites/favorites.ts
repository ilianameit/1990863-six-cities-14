import { createSlice } from '@reduxjs/toolkit';
import { OfferPreview } from '../../../types/offer-preview';
import { NameSpace } from '../../../const/const';
import { fetchFavoriteOffersAction } from '../../api-actions';

type FavoritesStateType = {
  favorites: OfferPreview[];
}

const initialState: FavoritesStateType = {
  favorites: []
};

export const favoritesSlice = createSlice({
  name: NameSpace.Favorites,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
      });
  },
});
