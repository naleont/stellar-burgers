import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../../utils/burger-api';
import { constructorActions } from './slice';
import { getFeeds, getOrderByNumber } from '../order/actions';

export const postOrder = createAsyncThunk(
  'order/post',
  async (ingredients: string[], { dispatch }) => {
    orderBurgerApi(ingredients).then((orderResponse) => {
      dispatch(constructorActions.setOrderNumber(orderResponse.order.number));
      dispatch(constructorActions.clearSelected());
      dispatch(constructorActions.requestToggle(false));
      dispatch(getOrderByNumber(orderResponse.order.number));
    });
  }
);
