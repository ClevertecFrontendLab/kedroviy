import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    registerUser as registerUserApi,
    loginUser,
    checkEMail as checkEMailEffect,
    confirmEMailAPI,
    changePasswordAPI,
} from '../shared';

interface UserState {
    user: null | object;
    error: null | string;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: UserState = {
    user: null,
    error: null,
    status: 'idle',
};

export const registerUser = createAsyncThunk(
    'auth/REGISTRATION',
    async (userData: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await registerUserApi(userData);
            if (response?.error?.statusCode) {
                return rejectWithValue(response?.error);
            }
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const authUser = createAsyncThunk(
    'auth/LOGIN',
    async (userData: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await loginUser(userData);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const checkEmailStore = createAsyncThunk(
    'auth/CHECK_EMAIL',
    async (userData: { email: string; }, { rejectWithValue }) => {
        try {
            const response = await checkEMailEffect(userData);
            if (response?.error?.statusCode) {
                return rejectWithValue(response?.error);
            }
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const confirmEMailStore = createAsyncThunk(
    'auth/CONFIRM_EMAIL',
    async (userData: { email: string; code: string }, { rejectWithValue }) => {
        try {
            const response = await confirmEMailAPI(userData);
            if (response?.error?.statusCode) {
                return rejectWithValue(response?.error);
            }
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const changePasswordStore = createAsyncThunk(
    'auth/CHANGE_PASSWORD',
    async (password: { password: string; confirmPassword: string }, { rejectWithValue }) => {
        try {
            const response = await changePasswordAPI(password);
            if (response?.error?.statusCode) {
                return rejectWithValue(response?.error);
            }
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const revertAll = createAction('REVERT_ALL')

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(authUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(authUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(authUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(checkEmailStore.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(checkEmailStore.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(checkEmailStore.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(confirmEMailStore.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(confirmEMailStore.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(confirmEMailStore.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(changePasswordStore.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(changePasswordStore.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(changePasswordStore.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(revertAll, () => initialState)
    },
});

export default authSlice.reducer;