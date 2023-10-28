export const SETTING = {
  offers: 5
};

export const COUNT_OFFER_IMAGES = 6;

export enum AppRoutes {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const CityName = {
  Paris: 'Paris',
  Cologne: 'Cologne',
  Brussels: 'Brussels',
  Amsterdam: 'Amsterdam',
  Hamburg: 'Hamburg',
  Dusseldorf: 'Dusseldorf'

} as const;

export const authorizationStatus = AuthorizationStatus.Auth;
