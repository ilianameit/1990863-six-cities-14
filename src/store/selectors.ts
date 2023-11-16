import { createSelector } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { OfferPreview } from '../types/offer-preview';
import { Sorting } from '../types/sorting';

const getFavoritesItems = (favorites: OfferPreview[]) => favorites;

export const favoriteOffersSelector = createSelector(getFavoritesItems, (items) =>
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
