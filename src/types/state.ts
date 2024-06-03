import { store } from '../store/index';
import { AuthorizationStatus } from '../constants/constants';
import { ExtendedOffer, Offer } from './offer';
import { Review } from './review';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserState = {
  authorizationStatus: AuthorizationStatus;
  email: string | null;
};

export type OfferDetails = {
  offerInfo: ExtendedOffer | null;
  nearbyOffers: Offer[];
  reviews: Review[];
};

export type OffersState = {
  currentOffer: OfferDetails;
  offers: Offer[];
  activeMarker: {
    id: string;
  } | null;
  isLoading: boolean;
};

export type AppState = {
  cityName: string;
  currentSortType: string;
  errorMessage: string | null;
};
