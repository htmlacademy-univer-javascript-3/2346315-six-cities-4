import { createReducer } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { listFilling, cityChange } from './action';
import { offers as mockOffers } from '../mocks/offers';
import { initialStateType } from '../types/initial-state';

const initialState: initialStateType = {
  city: {
    name: 'Paris',
    location: {
      latitude: 48.8566,
      longitude: 2.3522,
      zoom: 13
    }
  },
  offers: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(cityChange, (state, { payload }) => {
      state.city.name = payload as unknown as string;
    })
    .addCase(listFilling, (state, { payload }) => {
      state.offers = payload ? (payload as Offer[]) : mockOffers;
    });
});

export { reducer };
