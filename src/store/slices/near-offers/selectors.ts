import { NameSpace } from '../../../const/const';
import { State } from '../../../types/state';

export const getNearOffers = (state: State) => state[NameSpace.NearOffers].nearOffers;
