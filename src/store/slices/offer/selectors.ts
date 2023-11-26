import { NameSpace } from '../../../const/const';
import { State } from '../../../types/state';

export const getOffer = (state: State) => state[NameSpace.Offer].offer;

export const getOfferLoadingStatus = (state: State) => state[NameSpace.Offer].isOfferLoading;
