import {
  getUserApi,
  isTokenExists,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userActions } from './slice';

export const login = createAsyncThunk('user/login', async (data: TLoginData) =>
  loginUserApi(data)
);

export const logout = createAsyncThunk('user/logout', async () => logoutApi());

export const checkUserAuth = createAsyncThunk(
  'user/checkAuth',
  async (_, { dispatch }) => {
    if (isTokenExists()) {
      getUserApi()
        .then((user) => {
          dispatch(userActions.setUser(user));
        })
        .finally(() => userActions.setIsAuthChecked(true));
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

// const f = (dispatch, store) => {
//   dispatch({ type: 'user/login/pending'})
// };

// gc.then(dispatch({ type: 'user/login/fulfilled', payload: x })).catch(...);

// все проверки и логика только в функциях api\
