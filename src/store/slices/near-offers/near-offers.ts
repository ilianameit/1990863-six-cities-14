import { createSlice } from '@reduxjs/toolkit';
import { OfferPreview } from '../../../types/offer-preview';
import { NameSpace } from '../../../const/const';
import { fetchNearOffersAction } from '../../api-actions';

type NearOffersStateType = {
  nearOffers: OfferPreview[];
}

const initialState: NearOffersStateType = {
  nearOffers: [],
};

export const nearOffersSlice = createSlice({
  name: NameSpace.NearOffers,
  initialState,
  reducers: {
    dropNearOffers: (state) => {
      state.nearOffers = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchNearOffersAction.fulfilled, (state, action) => {
        state.nearOffers = action.payload;
      });
  },
});

export const { dropNearOffers } = nearOffersSlice.actions;
