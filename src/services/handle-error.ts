import { store } from '../store';
import { setError } from '../store/app-settings-slice/app-settings-slice';
import { clearError } from '../store/api-actions';

export const handleError = (errorMessage: string): void => {
  store.dispatch(setError(errorMessage));
  store.dispatch(clearError());
};
