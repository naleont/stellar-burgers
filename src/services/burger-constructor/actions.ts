import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../../utils/burger-api';
import { constructorActions } from './slice';
import { getFeeds } from '../order/actions';

export const postOrder = createAsyncThunk(
  'order/post',
  async (ingredients: string[], { dispatch }) => {
    orderBurgerApi(ingredients).then((orderResponse) => {
      console.log(orderResponse.name);
      dispatch(constructorActions.clearSelected());
      dispatch(constructorActions.setCurrentOrder(orderResponse.order));
      dispatch(constructorActions.requestToggle(false));
      dispatch(getFeeds());
    });
  }
);
