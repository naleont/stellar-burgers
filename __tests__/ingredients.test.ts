import {
  burgerSlice,
  burgerActions,
  reducer
} from '../src/services/ingredients/slice';
import { getIngredients } from '../src/services/ingredients/actions';

jest.mock('@api', () => ({
  getIngredientsApi: jest.fn()
}));

const mockIngredients = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  }
];

const initialState = {
  ingredients: [],
  loading: false,
  error: undefined
};

describe('Редьюсеры ingredients', () => {
  test('тест на выбор текущего ингредиента', () => {
    const state = {
      ...initialState,
      ingredients: mockIngredients
    };

    const action = burgerActions.selectIngredient(mockIngredients[0]._id);
    const newState = reducer(state, action);

    expect(newState.current).toEqual(mockIngredients[0]);
  });

  test('тест на получение ингредиентов - успешный запрос', () => {
    const action = {
      type: getIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const newState = reducer(initialState, action);

    expect(newState.loading).toBe(false);
    expect(newState.ingredients).toEqual(mockIngredients);
    expect(newState.error).toBeUndefined();
  });

  test('тест на получение ингредиентов - запрос в ожидании', () => {
    const action = { type: getIngredients.pending.type };
    const newState = reducer(initialState, action);

    expect(newState.loading).toBe(true);
    expect(newState.error).toBeUndefined();
    expect(newState.ingredients).toEqual([]);
  });

  test('тест на получение ингредиентов - неуспешный запрос', () => {
    const stateWithError = {
      ...initialState,
      ingredients: mockIngredients,
      loading: true
    };
    const errorMessage = 'Failed to fetch ingredients';
    const action = {
      type: getIngredients.rejected.type,
      error: { message: errorMessage }
    };
    const newState = reducer(stateWithError, action);

    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(errorMessage);
    expect(newState.ingredients).toEqual(mockIngredients);
  });
});

describe('Cелекторы ingredients', () => {
  const state = {
    burger: {
      ingredients: mockIngredients,
      current: mockIngredients[0],
      loading: true,
      error: undefined
    }
  };

  test('тест на получение списка ингредиентов', () => {
    const result = burgerSlice.selectors.ingredients(state);
    expect(result).toEqual(mockIngredients);
  });

  test('тест на получение текущего ингредиента', () => {
    const result = burgerSlice.selectors.currentIngredient(state);
    expect(result).toEqual(mockIngredients[0]);
  });

  test('тест на получение состояния загрузки', () => {
    const result = burgerSlice.selectors.isIngredientsLoading(state);
    expect(result).toBe(true);
  });
});
