import {AppRootState} from '../state/store';

export const selectRequestStatus = (state: AppRootState) => {
   return state.app.status
};
export const selectIsInitialized = (state: AppRootState) => {
    return  state.app.isInitialized;
}
export const selectAppError = (state: AppRootState) => state.app.error;
