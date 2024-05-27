import { Offer } from './offer';
import { AuthorizationStatus } from '../components/constants/constants';

export type InitialStateType = {
    error: string | null;
    city: string;
    offers: Offer[];
    sortType: string;
    selectedMarker: {id: string} | null;
    authorizationStatus: AuthorizationStatus;
    isOffersDataLoading: boolean;
  }