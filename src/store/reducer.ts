import { createReducer } from '@reduxjs/toolkit';
import { changeCity, selectSortType, setCurrentMarker, loadOffers, setError, setAuthorizationStatus, setOffersLoadingStatus, loadOfferDetails, sendReview, saveEmail } from './action';
import { AuthorizationStatus } from '../components/constants/constants';
import { InitialStateType } from '../types/initial-state';

const initialState: InitialStateType = {
  city: 'Paris',
  offers: [],
  sortType: 'Popular',
  selectedMarker: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersDataLoading: false,
  error: null,
  currentOffer: {
    offerInfo: null,
    nearestOffers: [],
    reviews: [],
  },
  userEmail: null
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(selectSortType, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(setCurrentMarker, (state, action) => {
      state.selectedMarker = action.payload;
    })
    .addCase(loadOffers, (state, {payload}) => {
      state.offers = payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setOffersLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(loadOfferDetails, (state, { payload }) => {
      state.selectedMarker = { id: payload.offerInfo.id };
      state.currentOffer = { ...payload };
    })
    .addCase(sendReview, (state, { payload }) => {
      state.currentOffer.reviews = [...state.currentOffer.reviews, payload];
    })
    .addCase(saveEmail, (state, action) => {
      state.userEmail = action.payload;
    });
});

export { reducer };
