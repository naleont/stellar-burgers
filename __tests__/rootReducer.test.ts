import { rootReducer } from '../src/services/store';

const constructorInitialState = {
  selectedIngredients: [],
  loading: false,
  error: undefined,
  orderRequested: false,
  currentOrder: null
};

const burgerInitialState = {
  ingredients: [],
  loading: false,
  error: undefined
};

const orderInitialState = {
  feeds: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: undefined
};

const userInitialState = {
  user: null,
  error: null,
  isAuthChecked: false
};

describe('rootReducer', () => {
  test('тест на обработку неизвестного экшена', () => {
    const fakeAction = { type: 'UNKNOWN_ACTION' };
    const state = rootReducer(undefined, fakeAction);

    expect(state).toEqual({
      burger: burgerInitialState,
      burgerConstructor: constructorInitialState,
      order: orderInitialState,
      user: userInitialState
    });
  });
});
