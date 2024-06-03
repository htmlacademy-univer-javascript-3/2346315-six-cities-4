import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../../types/state.ts';
import { AuthorizationStatus, StateKey } from '../../constants/constants.ts';

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  email: '',
};

export const userSlice = createSlice({
  name: StateKey.User,
  initialState,
  reducers: {
    requireAuthorization(state, action: PayloadAction<AuthorizationStatus>) {
      state.authorizationStatus = action.payload;
    },
    saveEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
  },
});

export const { requireAuthorization, saveEmail } = userSlice.actions;
