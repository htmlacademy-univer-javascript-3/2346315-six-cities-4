import { Offer } from './offer';

export type initialStateType = {
    city: string;
    offers: Offer[];
    sortType: string;
    selectedMarker: {id: string} | null;
  }