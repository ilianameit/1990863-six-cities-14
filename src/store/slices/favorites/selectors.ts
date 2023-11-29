import { NameSpace } from '../../../const/const';
import { State } from '../../../types/state';

export const getFavorites = (state: State) => state[NameSpace.Favorites].favorites;
export const isNeedFavoriteUpdateStatus = (state: State) => state[NameSpace.Favorites].isNeedFavoriteUpdate;

