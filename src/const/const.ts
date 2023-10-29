import { checkAuthorizationStatus } from '../utils/authorixation-status/check-authorization-status';

const SETTING = {
  offers: 5
};

const COUNT_OFFER_IMAGES = 6;

const MAX_COMMENT_LENGTH = 300;
const MIN_COMMENT_LENGTH = 50;

const ratingStarsName = {
  '1': 'terribly',
  '2': 'badly',
  '3': 'not bad',
  '4': 'good',
  '5': 'perfect'
};

enum AppRoutes {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
}

enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

const CityName = {
  Paris: 'Paris',
  Cologne: 'Cologne',
  Brussels: 'Brussels',
  Amsterdam: 'Amsterdam',
  Hamburg: 'Hamburg',
  Dusseldorf: 'Dusseldorf'

} as const;
const authorizationStatus = AuthorizationStatus.Auth;
const isLogged = checkAuthorizationStatus(authorizationStatus);

export {
  SETTING,
  COUNT_OFFER_IMAGES,
  MAX_COMMENT_LENGTH,
  MIN_COMMENT_LENGTH,
  ratingStarsName,
  AppRoutes,
  AuthorizationStatus,
  CityName,
  authorizationStatus,
  isLogged
};
