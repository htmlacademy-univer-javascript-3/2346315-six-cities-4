import { StateKey } from '../../constants/constants';
import { State } from '../../types/state';

export const getAuthorizationStatus = (state: State) => state[StateKey.User].authorizationStatus;
export const getEmail = (state: State) => state[StateKey.User].email;
