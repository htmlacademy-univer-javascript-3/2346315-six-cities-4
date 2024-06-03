import { Offer, ExtendedOffer } from './offer';
import { AuthorizationStatus } from '../constants/constants';
import { Review } from './review';

export type InitialStateType = {
    error: string | null;
    city: string;
    offers: Offer[];
    sortType: string;
    selectedMarker: {id: string} | null;
    authorizationStatus: AuthorizationStatus;
    isOffersDataLoading: boolean;
    currentOffer: {
      offerInfo: ExtendedOffer | null;
      nearestOffers: Offer[];
      reviews: Review[];
    };
    userEmail: string | null;
  }
