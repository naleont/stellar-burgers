import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TOrder } from '@utils-types';

type TConstructorState = {
  selectedIngredients: TIngredient[];
  loading: boolean;
  error: string | undefined;
  orderRequested: boolean;
  currentOrder: TOrder | null;
};

const initialState: TConstructorState = {
  selectedIngredients: [],
  loading: false,
  error: undefined,
  orderRequested: false,
  currentOrder: null
};

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      if (action.payload.type === 'bun') {
        state.selectedIngredients = state.selectedIngredients.filter(
          (element) => element.type !== 'bun'
        );
        state.selectedIngredients.push(action.payload);
      } else {
        state.selectedIngredients.push(action.payload);
      }
    },
    removeIngredient: (state, action: PayloadAction<number>) => {
      state.selectedIngredients = state.selectedIngredients.filter(
        (_, index) => index !== action.payload
      );
    },
    moveDown: (state, action: PayloadAction<number>) => {
      const ingredientToMove = state.selectedIngredients[action.payload + 1];
      const neighbour = state.selectedIngredients[action.payload + 2];
      state.selectedIngredients = state.selectedIngredients
        .with(action.payload + 1, neighbour)
        .with(action.payload + 2, ingredientToMove);
    },
    moveUp: (state, action: PayloadAction<number>) => {
      const ingredientToMove = state.selectedIngredients[action.payload + 1];
      const neighbour = state.selectedIngredients[action.payload];
      state.selectedIngredients = state.selectedIngredients
        .with(action.payload + 1, neighbour)
        .with(action.payload, ingredientToMove);
    },
    requestToggle: (state, action: PayloadAction<boolean>) => {
      state.orderRequested = action.payload;
    },
    clearSelected: (state) => {
      state.selectedIngredients = [];
    },
    setCurrentOrder: (state, action: PayloadAction<TOrder | null>) => {
      state.currentOrder = action.payload;
    }
  },
  selectors: {
    selectedIngredients: (state) => state.selectedIngredients,
    requestOrderState: (state) => state.orderRequested,
    currentOrder: (state) => state.currentOrder
  }
});

export const { selectedIngredients, requestOrderState, currentOrder } =
  constructorSlice.selectors;
export const constructorActions = constructorSlice.actions;
export const reducer = constructorSlice.reducer;
