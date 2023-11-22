import { createSelector } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { OfferPreview } from '../types/offer-preview';
import { Sorting } from '../types/sorting';
import { ReviewType } from '../types/review';
import { MAX_COMMENT_COUNT } from '../const/const';

const getFavoritesItems = (favorites: OfferPreview[]) => favorites;

export const favoriteOffersSortSelector = createSelector(getFavoritesItems, (items) =>
  items.sort((a, b) => (a.city.name > b.city.name ? 1 : -1))
);

const getOffers = (state: {offers: Offer[]; sortingItem: Sorting}) => state.offers;
const getSortingItem = (state: {offers: Offer[]; sortingItem: Sorting}) => state.sortingItem;

export const getSortedOffers = createSelector(
  [ getOffers, getSortingItem ],
  (offers, sortingItem) => {
    switch (sortingItem) {
      case 'Popular':
        return offers;
      case 'HighToLow':
        return offers.slice().sort((a, b) => b.price - a.price);
      case 'LowToHigh':
        return offers.slice().sort((a, b) => a.price - b.price);
      case 'TopRated':
        return offers.slice().sort((a, b) => b.rating - a.rating);
    }
  }
);

const getReviews = (reviews: ReviewType[]) => reviews;

export const reviewsSelector = createSelector(
  getReviews, (reviews) =>
    reviews.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, MAX_COMMENT_COUNT)
);
