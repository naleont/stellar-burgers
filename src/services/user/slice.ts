import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { login, logout } from './actions';
import { TLoginData } from '@api';

type TUserState = {
  user: TUser | null;
  error: string | null;
  isAuthChecked: boolean;
};

export const initialState: TUserState = {
  user: null,
  error: null,
  isAuthChecked: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    }
  },
  selectors: {
    user: (state) => state.user,
    isAuthChecked: (state) => state.isAuthChecked,
    error: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.error = null;
      })
      .addCase(login.rejected, (state) => {
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<TLoginData>) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(logout.pending, (state) => {
        state.error = null;
      })
      .addCase(logout.rejected, (state) => {
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null;
      });
  }
});

export const { user, isAuthChecked, error } = userSlice.selectors;
export const userActions = userSlice.actions;
export const reducer = userSlice.reducer;
