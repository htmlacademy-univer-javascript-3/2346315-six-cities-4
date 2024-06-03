import { State } from '../../types/state.ts';
import { StateKey } from '../../constants/constants.ts';

export const getOffers = (state: State) => state[StateKey.Offers].offers;
export const getOffersLoadingStatus = (state: State) => state[StateKey.Offers].isLoading;
export const getCurrentMarker = (state: State) => state[StateKey.Offers].activeMarker;
export const getFavorites = (state: State) => state[StateKey.Offers].favorites;
