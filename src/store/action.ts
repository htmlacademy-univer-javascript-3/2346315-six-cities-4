import {createAction} from '@reduxjs/toolkit';

export const cityChange = createAction<string>('сityChange');

export const listFilling = createAction('listFilling');

export const currentMarker = createAction<{ id: string } | null>('currentMarker');

export const sortTypeSelect = createAction<string>('sortTypeSelect');