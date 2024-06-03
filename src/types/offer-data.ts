import { Review } from './review';
import { ExtendedOffer, Offer } from './offer';

export type OfferData = {
  offerInfo: ExtendedOffer;
  nearbyOffers: Offer[];
  reviews: Review[];
};
