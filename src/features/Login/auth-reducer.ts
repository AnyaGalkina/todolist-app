import {RESULT_CODES} from "../../state/types/types";
import {authAPI, LoginParamsType} from "../../api/authAPI";
import {setAppStatus} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FieldsErrorType} from "../../api/todolistsAPI";

export type InitialStateType = typeof initialState;

const initialState = {
    isLoggedIn: false
}

export const login = createAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType, { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldsErrorType> } }>(
    "auth/login", async (data, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({status: "loading"}));
        try {
            const res = await authAPI.login(data);
            if (res.data.resultCode === RESULT_CODES.succeeded) {
                thunkAPI.dispatch(setAppStatus({status: "succeeded"}));
                // return {isLoggedIn: true};
            } else {
                handleServerAppError(res.data, thunkAPI.dispatch);
                return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors});
            }
        } catch (error: any) {
            // if (axios.isAxiosError(error)) {
            handleServerNetworkError(error, thunkAPI.dispatch);
            return thunkAPI.rejectWithValue({errors: [error], fieldsErrors: undefined});
            // }
        }
    })

export const logout = createAsyncThunk("auth/logout", async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: "loading"}));
    try {
        const res = await authAPI.logout();
        if (res.data.resultCode === RESULT_CODES.succeeded) {
            thunkAPI.dispatch(setAppStatus({status: "succeeded"}));
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch);
            return thunkAPI.rejectWithValue(null);
        }
    } catch (error: any) {
        // if (axios.isAxiosError(error)) {
        //     const error: AxiosError = err;
        handleServerNetworkError(error, thunkAPI.dispatch);
        return thunkAPI.rejectWithValue(null);
        // }
    }
})

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
            state.isLoggedIn = action.payload.isLoggedIn
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoggedIn = true
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            state.isLoggedIn = false
        })
    }
})

export const authReducer = slice.reducer;
export const {setIsLoggedIn} = slice.actions;


// export const loginTC = (data: LoginParamsType) => async (dispatch: Dispatch) => {
//     dispatch(setAppStatus({status: "loading"}));
//     try {
//         const res = await authAPI.login(data);
//         if (res.data.resultCode === RESULT_CODES.succeeded) {
//             dispatch(setIsLoggedIn({isLoggedIn: true}));
//             dispatch(setAppStatus({status: "succeeded"}));
//         } else {
//             handleServerAppError(res.data, dispatch)
//         }
//     } catch (error) {
//         if (axios.isAxiosError(error)) {
//             handleServerNetworkError(error, dispatch);
//         }
//     }
// }

// export const logout = () => async (dispatch: Dispatch) => {
//     dispatch(setAppStatus({status: "loading"}));
//     try {
//         const res = await authAPI.logout();
//         if (res.data.resultCode === RESULT_CODES.succeeded) {
//             dispatch(setIsLoggedIn({isLoggedIn: false}));
//             dispatch(setAppStatus({status: "succeeded"}));
//         } else {
//             handleServerAppError(res.data, dispatch)
//         }
//     } catch (error) {
//         if (axios.isAxiosError(error)) {
//             handleServerNetworkError(error, dispatch);
//         }
//     }
//
// }
