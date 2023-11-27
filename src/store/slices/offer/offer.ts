import { createSlice } from '@reduxjs/toolkit';
import { Offer } from '../../../types/offer';
import { NameSpace } from '../../../const/const';
import { fetchOfferAction } from '../../api-actions';

type OfferStateType = {
  offer: Offer| null;
  isOfferLoading: boolean;
}

const initialState: OfferStateType = {
  offer: null,
  isOfferLoading: false,
};

export const offerSlice = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {
    dropOffer: (state) => {
      state.offer = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOfferAction.pending, (state) => {
        state.isOfferLoading = true;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.isOfferLoading = false;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.isOfferLoading = false;
      });
  },
});

export const { dropOffer } = offerSlice.actions;
