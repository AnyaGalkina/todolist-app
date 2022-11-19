import {AppRootState} from '../state/store';

export const selectRequestStatus = (state: AppRootState) => state.app.status;
export const selectIsInitialized = (state: AppRootState) => state.app.isInitialized;
