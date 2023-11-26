import { NameSpace } from '../../../const/const';
import { State } from '../../../types/state';

export const getOffers = (state: State) => state[NameSpace.Offers].offers;

export const getActiveCity = (state: State) => state[NameSpace.Offers].activeCity;

export const getOffersLoadingStatus = (state: State) => state[NameSpace.Offers].isOffersLoading;

export const getSortingItem = (state: State) => state[NameSpace.Offers].sotringByItem;
