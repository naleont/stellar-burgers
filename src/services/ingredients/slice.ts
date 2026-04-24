import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredients } from './actions';

export type TBurgerState = {
  ingredients: TIngredient[];
  current?: TIngredient;
  loading: boolean;
  error: string | undefined;
};

const initialState: TBurgerState = {
  ingredients: [],
  loading: false,
  error: undefined
};

export const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    selectIngredient: (state, action: PayloadAction<string>) => {
      state.current = state.ingredients.find(
        (element) => element._id === action.payload
      );
    }
  },
  selectors: {
    ingredients: (state) => state.ingredients,
    currentIngredient: (state) => state.current,
    isIngredientsLoading: (state) => state.loading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      });
  }
});

export const { ingredients, currentIngredient, isIngredientsLoading } =
  burgerSlice.selectors;
export const burgerActions = burgerSlice.actions;
export const reducer = burgerSlice.reducer;
