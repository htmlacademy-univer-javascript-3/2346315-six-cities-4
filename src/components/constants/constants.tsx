export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id'
}

export enum AuthorizationStatus {
  Auth ='AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}


export const URL_MARKER_DEFAULT = 'public/img/pin.svg';

export const URL_MARKER_CURRENT = 'public/img/pin-active.svg';

export const CARD_WIDTH = '260';

export const CARD_HEIGHT = '260';

export const BOOKMARK_ICON_WIDTH = '18';

export const BOOKMARK_ICON_HEIGHT = '19';

export const AVATAR_WIDTH = '54';

export const AVATAR_HEIGHT = '54';

export enum MapClasses {
  SectionMainMapClass = 'cities__map map',
  SectionPropertyMapClass = 'offer__map map',
}

export const SORT_TYPES = {
  0: 'Popular',
  1: 'Price: low to high',
  2: 'Price: high to low',
  3: 'Top rated first',
};

export const SORTING_WIDTH = '7';

export const SORTING_HEIGHT = '4';