import {
  getUserApi,
  isTokenExists,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { userActions } from './slice';

export const login = createAsyncThunk('user/login', async (data: TLoginData) =>
  loginUserApi(data)
);

export const logout = createAsyncThunk('user/logout', async () => logoutApi());

export const checkUserAuth = createAsyncThunk(
  'user/checkAuth',
  async (_, { dispatch }) => {
    if (isTokenExists()) {
      try {
        const user = await getUserApi();
        dispatch(userActions.setUser(user.user));
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        dispatch(userActions.setIsAuthChecked(true));
      }
    } else {
      dispatch(userActions.setIsAuthChecked(true));
      dispatch(userActions.setUser(null));
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData, { dispatch }) => {
    registerUserApi(data)
      .then((user) => dispatch(userActions.setUser(user)))
      .finally(() => userActions.setIsAuthChecked(true));
  }
);

export const updateUserInfo = createAsyncThunk(
  'user/update',
  async (userData: Partial<TRegisterData>, { dispatch }) => {
    updateUserApi(userData).then((data) => {
      dispatch(userActions.setUser(data.user));
    });
  }
);