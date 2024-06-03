export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  Comments = '/comments'
}

export enum AuthorizationStatus {
  Auth ='AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export const URL_MARKER_DEFAULT = '/img/pin.svg';
export const URL_MARKER_CURRENT = '/img/pin-active.svg';

export const CARD_WIDTH = '260';
export const CARD_HEIGHT = '260';

export const BOOKMARK_ICON_WIDTH = '18';
export const BOOKMARK_ICON_HEIGHT = '19';

export const AVATAR_WIDTH = '54';
export const AVATAR_HEIGHT = '54';

export const LOGIN_LOGO_WIDTH = '81';
export const LOGIN_LOGO_HEIGHT = '41';

export const FAVORITES_LOGO_WIDTH = '64';
export const FAVORITES_LOGO_HEIGHT = '33';

export const SORTING_WIDTH = '7';
export const SORTING_HEIGHT = '4';

export enum MapClasses {
  SectionMainMapClass = 'cities__map map',
  SectionPropertyMapClass = 'offer__map map',
}

export enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments'
}

export const SORT_TYPES = {
  0: 'Popular',
  1: 'Price: low to high',
  2: 'Price: high to low',
  3: 'Top rated first',
};

export const TIMEOUT_SHOW_ERROR = 2000;

export enum StateKey {
  AppSettings = 'APPSETTINGS',
  Offers = 'OFFERS',
  User = 'USER',
}
