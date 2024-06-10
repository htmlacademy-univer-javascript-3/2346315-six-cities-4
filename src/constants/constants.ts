export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  Comments = '/comments',
}

export enum FavoriteStatus {
  Add = 1,
  Remove = 0,
}

export enum AuthorizationStatus {
  Auth ='AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export const enum Card {
  Size = 260
}

export const enum Bookmark {
  Width = 18,
  Height = 19
}

export enum Avatar {
  Size = 54
}

export enum LoginLogo {
  Width = 81,
  Height = 41
}

export enum FavoritesLogo {
  Width = 64,
  Height = 33
}

export enum Sorting {
  Width = 7,
  Height = 4
}

export enum FavoriteCard {
  Width = 150,
  Height = 110
}

export enum URL {
  Default = '/img/pin.svg',
  Current = '/img/pin-active.svg'
}

export enum MapClasses {
  SectionMainMapClass = 'cities__map map',
  SectionPropertyMapClass = 'offer__map map',
}

export enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  Favorite = '/favorite'
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

export const citiesForRandomString = ['Amsterdam', 'Paris', 'Cologne', 'Brussels', 'Hamburg', 'Dusseldorf'];
