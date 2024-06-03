import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateKey } from '../../constants/constants.ts';
import { AppState } from '../../types/state.ts';

const initialState: AppState = {
  cityName: 'Paris',
  currentSortType: 'Popular',
  errorMessage: null,
};

export const appSettingsSlice = createSlice({
  name: StateKey.AppSettings,
  initialState,
  reducers: {
    changeCity(state, action: PayloadAction<string>) {
      state.cityName = action.payload;
    },
    selectSortType(state, action: PayloadAction<string>) {
      state.currentSortType = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.errorMessage = action.payload;
    },
  },
});

export const { changeCity, selectSortType, setError } = appSettingsSlice.actions;
