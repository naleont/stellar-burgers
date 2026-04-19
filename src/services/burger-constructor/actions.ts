import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../../utils/burger-api';
import { constructorActions } from './slice';
import { getFeeds } from '../order/actions';
import { TIngredient } from '../../utils/types';
import { v4 as uuidv4 } from 'uuid';

export const addIngredient = createAction(
  'ingredients/add',
  function prepare(item: TIngredient) {
    return {
      payload: {
        ...item,
        id: uuidv4()
      }
    };
  }
);

export const postOrder = createAsyncThunk(
  'order/post',
  async (ingredients: string[], { dispatch }) => {
    orderBurgerApi(ingredients).then((orderResponse) => {
      dispatch(constructorActions.clearSelected());
      dispatch(constructorActions.setCurrentOrder(orderResponse.order));
      dispatch(constructorActions.requestToggle(false));
      dispatch(getFeeds());
    });
  }
);
