import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { AppRoute, AuthorizationStatus } from '../components/constants/constants';
import { OfferData } from '../types/offer-data';
import { Review } from '../types/review';

export const changeCity = createAction<string>('city/change');

export const fillList = createAction('list/fill');

export const setCurrentMarker = createAction<{ id: string } | null>('marker/setCurrent');

export const selectSortType = createAction<string>('sort/selectType');

export const loadOffers = createAction<Offer[]>('offers/load');

export const setOffersLoadingStatus = createAction<boolean>('offers/setLoadingStatus');

export const setError = createAction<string | null>('error/set');

export const setAuthorizationStatus = createAction<AuthorizationStatus>('auth/setStatus');

export const saveEmail = createAction<string>('user/saveEmail');

export const redirectToRoute = createAction<AppRoute>('route/redirect');

export const loadOfferDetails = createAction<OfferData>('offer/loadDetails');

export const sendReview = createAction<Review>('review/sendReview');
