import { createSelector } from 'reselect';
import { store } from './index';
import { StateKey } from '../constants/constants.ts';

type State = ReturnType<typeof store.getState>;

const getCurrentOffer = (state: State) => state[StateKey.Offers].currentOffer;

const getOfferInfo = createSelector(
  [getCurrentOffer],
  (currentOffer) => currentOffer.offerInfo
);

const getNearestOffers = createSelector(
  [getCurrentOffer],
  (currentOffer) => currentOffer.nearbyOffers
);

const getReviews = createSelector(
  [getCurrentOffer],
  (currentOffer) => currentOffer.reviews
);

export const getCurrentOfferData = createSelector(
  [getOfferInfo, getNearestOffers, getReviews],
  (offerInfo, nearbyOffers, reviews) => ({
    offerInfo,
    nearbyOffers,
    reviews,
  })
);
