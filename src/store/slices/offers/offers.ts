import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../../const/const';
import { City } from '../../../types/city';
import { Offer } from '../../../types/offer';
import { Sorting } from '../../../types/sorting';
import { fetchOffersAction } from '../../api-actions';

type OffersStateType = {
  activeCity: City['name'];
  offers: Offer[];
  isOffersLoading: boolean;
  sotringByItem: Sorting;
}

const initialState: OffersStateType = {
  activeCity: 'Paris',
  offers: [],
  isOffersLoading: false,
  sotringByItem: 'Popular',
};

export const offersSlice = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    setActiveCity: (state, action: PayloadAction<City['name']>) => {
      state.activeCity = action.payload;
    },
    setSortingItem: (state, action: PayloadAction<Sorting>) => {
      state.sotringByItem = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersLoading = false;
      });
  },
});

export const { setActiveCity, setSortingItem } = offersSlice.actions;