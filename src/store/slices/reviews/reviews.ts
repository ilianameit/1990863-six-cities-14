import { createSlice } from '@reduxjs/toolkit';
import { ReviewType } from '../../../types/review';
import { addNewReviewAction, fetchReviewsAction } from '../../api-actions';
import { NameSpace } from '../../../const/const';

type ReviewsStateType = {
  reviews: ReviewType[];
}

const initialState: ReviewsStateType = {
  reviews: [],
};

export const reviewsSlice = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {
    dropReviews: (state) => {
      state.reviews = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(addNewReviewAction.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
      });
  },
});

export const { dropReviews } = reviewsSlice.actions;
