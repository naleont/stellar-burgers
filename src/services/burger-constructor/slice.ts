import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TConstructorState = {
  selected: TIngredient[];
  loading: boolean;
  error: string | undefined;
};

const initialState: TConstructorState = {
  selected: [],
  loading: false,
  error: undefined
};

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.selected.push(action.payload);
    },
    // rewriteBuger: (state, action: PayloadAction<TIngredient[]>) => {
    //   state.selected = action.payload;
    // }
    moveDown: (state, action: PayloadAction<number>) => {
      const ingredientToMove = state.selected[action.payload + 1];
      const neighbour = state.selected[action.payload + 2];
      state.selected = state.selected
        .with(action.payload + 1, neighbour)
        .with(action.payload + 2, ingredientToMove);
    },
    moveUp: (state, action: PayloadAction<number>) => {
      const ingredientToMove = state.selected[action.payload + 1];
      const neighbour = state.selected[action.payload];
      state.selected = state.selected
        .with(action.payload + 1, neighbour)
        .with(action.payload, ingredientToMove);
    }
  },
  selectors: {
    selected: (state) => state.selected
  }
});

export const { selected } = constructorSlice.selectors;
export const constructorActions = constructorSlice.actions;
export const reducer = constructorSlice.reducer;
