import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { Offer, ExtendedOffer } from '../types/offer';
import { redirectToRoute } from './action';
import { store } from './index';
import { APIRoute, AppRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../constants/constants.ts';
import { removeToken, saveToken } from '../services/token';
import { UserData } from '../types/user-data';
import { AuthData } from '../types/auth-data';
import { Review } from '../types/review';
import { CommentFormData } from '../types/comment-form-data.ts';
import { requireAuthorization } from './user-slice/user-slice.ts';
import { loadOfferDetails, loadOffers, sendReview, setOffersDataLoadingStatus, loadFavorites, updateOffers } from './offers-slice/offers-slice.ts';
import { setError } from './app-settings-slice/app-settings-slice.ts';
import { CheckFavoriteButton } from '../types/check-favorite-button.ts';
import { saveEmail, removeEmail } from '../services/email.ts';
import { removeProfilePicture, saveProfilePicture } from '../services/profile-picture.ts';

export const fetchOffers = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/fetchOffers',
  async (_, { dispatch, extra: api }) => {
    dispatch(setOffersDataLoadingStatus(true));
    try {
      const { data } = await api.get<Offer[]>(APIRoute.Offers);
      dispatch(loadOffers(data));
    } finally {
      dispatch(setOffersDataLoadingStatus(false));
    }
  }
);

export const fetchOfferDataAction = createAsyncThunk<void, { id: string }, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('offers/fetchOfferData',
  async ({id}, { dispatch, extra: api }) => {
    const {data: offerInfo} = await api.get<ExtendedOffer>(
      `${APIRoute.Offers}/${id}`
    );
    const {data: nearbyOffers} = await api.get<Offer[]>(
      `${APIRoute.Offers}/${id}/nearby`
    );
    const {data: reviews} = await api.get<Review[]>(
      `${APIRoute.Comments}/${id}`
    );
    dispatch(loadOfferDetails({offerInfo, nearbyOffers, reviews}));
  });

export const sendCommentAction = createAsyncThunk<void, {comment: CommentFormData; id: string},
  { dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('offers/sendComment',
  async ({comment, id}, {dispatch, extra: api}) => {
    const {data: review} = await api.post<Review>(`${APIRoute.Comments}/${id}`, comment);
    dispatch(sendReview(review));
  });

export const checkAuth = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  }
);

export const logout = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    removeEmail();
    removeToken();
    removeProfilePicture();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
);

export const clearError = createAsyncThunk<void, undefined>(
  'other/clearError',
  () => {
    setTimeout(() => store.dispatch(setError(null)), TIMEOUT_SHOW_ERROR);
  }
);

export const fetchFavoritesAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/fetchFavorites',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer[]>(`${APIRoute.Favorite}`);
    dispatch(loadFavorites(data));
  },
);

export const changeFavoriteStatusAction = createAsyncThunk<void, CheckFavoriteButton, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'offers/changeFavoriteStatus',
    async ({ status, offerId }, {extra: api, dispatch}) => {
      const { data } = await api.post<Offer>(`${APIRoute.Favorite}/${offerId}/${status}`);
      dispatch(updateOffers(data));
      dispatch(fetchFavoritesAction());
    },
  );

export const loginAction = createAsyncThunk<void, AuthData, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'user/login',
    async ({email: email, password}, {dispatch, extra: api}) => {
      const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(token);
      saveEmail(email);
      dispatch(fetchOffers());
      dispatch(fetchFavoritesAction());
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(redirectToRoute(AppRoute.Main));
      const {data} = await api.get<UserData>(APIRoute.Login);
      saveProfilePicture(data.avatarUrl);
    },
  );
