import {AppRootState} from '../../state/store';

export const selectorIsLoggedIn = (state: AppRootState) => state.auth.isLoggedIn;
