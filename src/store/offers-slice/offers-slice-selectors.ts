import { State } from '../../types/state.ts';
import { StateKey } from '../../constants/constants.ts';

export const getOffers = (state: State) => state[StateKey.Offers].offers;
export const getOffersLoadingStatus = (state: State) => state[StateKey.Offers].isLoading;
export const getCurrentOffer = (state: State) => state[StateKey.Offers].currentOffer;
export const getCurrentMarker = (state: State) => state[StateKey.Offers].activeMarker;
export const getReviews = (state: State) => state[StateKey.Offers].currentOffer.reviews;
