import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { addIngredient } from './actions';

type TConstructorState = {
  selectedIngredients: TConstructorIngredient[];
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
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.selectedIngredients = state.selectedIngredients.filter(
        (item) => item.id !== action.payload
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
  },
  extraReducers: (builder) => {
    builder.addCase(
      addIngredient,
      (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.selectedIngredients = state.selectedIngredients.filter(
            (element) => element.type !== 'bun'
          );
          state.selectedIngredients.push(action.payload);
        } else {
          state.selectedIngredients.push(action.payload);
        }
      }
    );
  }
});

export const { selectedIngredients, requestOrderState, currentOrder } =
  constructorSlice.selectors;
export const constructorActions = constructorSlice.actions;
export const reducer = constructorSlice.reducer;
