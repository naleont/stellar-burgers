import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFeeds, getOrderByNumber } from './actions';
import { TOrder } from '@utils-types';

type TOrderState = {
  feeds: TOrder[];
  currentOrder?: TOrder;
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | undefined;
};

const initialState: TOrderState = {
  feeds: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: undefined
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    selectOrder: (state, action: PayloadAction<string>) => {
      state.currentOrder = state.feeds.find(
        (element) => element.number === Number(action.payload)
      );
    }
  },
  selectors: {
    feeds: (state) => state.feeds,
    order: (state) => state.currentOrder,
    total: (state) => state.total,
    totalToday: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.feeds = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload.orders[0];
      });
  }
});

export const { feeds, order, total, totalToday } = orderSlice.selectors;
export const orderActions = orderSlice.actions;
export const reducer = orderSlice.reducer;
