import { loginUserApi, logoutApi, TLoginData } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const login = createAsyncThunk('user/login', async (data: TLoginData) =>
  loginUserApi(data)
);

export const logout = createAsyncThunk('user/logout', async () => logoutApi());

// const f = (dispatch, store) => {
//   dispatch({ type: 'user/login/pending'})
// };

// gc.then(dispatch({ type: 'user/login/fulfilled', payload: x })).catch(...);

// все проверки и логика только в функциях api\
