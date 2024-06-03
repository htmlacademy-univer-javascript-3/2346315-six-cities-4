import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer.ts';
import { OffersState } from '../../types/state.ts';
import { StateKey } from '../../constants/constants.ts';
import { OfferData } from '../../types/offer-data.ts';
import { Review } from '../../types/review.ts';
import { updateOffer } from '../../utils.ts';

const initialState: OffersState = {
  currentOffer: {
    offerInfo: null,
    nearbyOffers: [],
    reviews: [],
  },
  offers: [],
  activeMarker: null,
  isLoading: false,
  favorites: []
};

export const offersSlice = createSlice({
  name: StateKey.Offers,
  initialState,
  reducers: {
    loadOffers(state, action: PayloadAction<Offer[]>) {
      state.offers = action.payload;
      state.favorites = action.payload.filter((it) => it.isFavorite);
    },
    updateOffers: (state, action: PayloadAction<Offer>) => {
      state.offers = updateOffer(state.offers, action.payload);
      state.favorites = state.offers.filter((it) => it.isFavorite);
    },
    setOffersDataLoadingStatus(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    loadOfferDetails(state, action: PayloadAction<OfferData>) {
      const { offerInfo, nearbyOffers, reviews } = action.payload;
      state.currentOffer.offerInfo = offerInfo;
      state.currentOffer.nearbyOffers = nearbyOffers;
      state.currentOffer.reviews = reviews;
      state.activeMarker = { id: offerInfo.id };
    },
    sendReview(state, action: PayloadAction<Review>) {
      state.currentOffer.reviews.push(action.payload);
    },
    setCurrentMarker(state, action: PayloadAction<{ id: string } | null>) {
      state.activeMarker = action.payload;
    },
    loadFavorites(state, action: PayloadAction<Offer[]>){
      state.favorites = action.payload;
    },
  },
});

export const {
  loadOffers,
  updateOffers,
  setOffersDataLoadingStatus,
  loadOfferDetails,
  sendReview,
  setCurrentMarker,
  loadFavorites
} = offersSlice.actions;
