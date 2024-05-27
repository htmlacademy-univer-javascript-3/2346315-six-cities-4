import { createReducer } from '@reduxjs/toolkit';
import { listFilling, cityChange, sortTypeSelect, currentMarker } from './action';
import { offers } from '../mocks/offers';
import { initialStateType } from '../types/initial-state';

const initialState: initialStateType = {
  city: 'Paris',
  offers: [],
  sortType: 'Popular',
  selectedMarker: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(cityChange, (state, action) => {
      state.city = action.payload;
    })
    .addCase(listFilling, (state) => {
      state.offers = offers;
    })
    .addCase(sortTypeSelect, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(currentMarker, (state, action) => {
      state.selectedMarker = action.payload;
    });
});

export { reducer };