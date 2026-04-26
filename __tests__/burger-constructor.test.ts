import {
  constructorSlice,
  constructorActions
} from '../src/services/burger-constructor/slice';
import { addIngredient } from '../src/services/burger-constructor/actions';

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'test-unique-id-4--')
}));

const initialConstructor = [
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
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0,
    id: 'test-unique-id-1--'
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
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0,
    id: 'test-unique-id-2--'
  },
  {
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    __v: 0,
    id: 'test-unique-id-3--'
  }
];

const newIngredient = {
  _id: '643d69a5c3f7b9001cfa0944',
  name: 'Соус традиционный галактический',
  type: 'sauce',
  proteins: 42,
  fat: 24,
  carbohydrates: 42,
  calories: 99,
  price: 15,
  image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png',
  __v: 0
};

// обработку экшена добавления ингредиента;
// обработку экшена удаления ингредиента;
// обработку экшена изменения порядка ингредиентов в начинке;

const initialState = {
  selectedIngredients: [],
  loading: false,
  error: undefined,
  orderRequested: false,
  currentOrder: null
};

describe('Работа редюсера burgerConstructor', () => {
  test('тест на добавление ингредиента в конец списка', () => {
    const state = {
      ...initialState,
      selectedIngredients: [...initialConstructor]
    };

    const action = addIngredient(newIngredient);
    const newState = constructorSlice.reducer(state, action);

    expect(newState.selectedIngredients).toHaveLength(4);
    expect(newState.selectedIngredients[3]).toEqual({
      ...newIngredient,
      id: 'test-unique-id-4--'
    });
  });

  test('тест на удаление ингредиента по id', () => {
    const state = {
      ...initialState,
      selectedIngredients: [...initialConstructor]
    };

    const ingredientToDelete = initialConstructor[1];
    const action = constructorActions.removeIngredient(ingredientToDelete.id);
    const newState = constructorSlice.reducer(state, action);

    expect(newState.selectedIngredients).toHaveLength(2);
    expect(
      newState.selectedIngredients.find((i) => i.id === ingredientToDelete.id)
    ).toBeUndefined();
  });

  test('тест на перемещение ингредиента вверх', () => {
    const state = {
      ...initialState,
      selectedIngredients: [initialConstructor[1], initialConstructor[2]]
    };

    const action = constructorActions.moveUp(1);
    const newState = constructorSlice.reducer(state, action);

    expect(newState.selectedIngredients[0]).toEqual(initialConstructor[2]);
    expect(newState.selectedIngredients[1]).toEqual(initialConstructor[1]);
  });

  test('тест на перемещение ингредиента вниз', () => {
    const state = {
      ...initialState,
      selectedIngredients: [initialConstructor[1], initialConstructor[2]]
    };

    const action = constructorActions.moveDown(0);
    const newState = constructorSlice.reducer(state, action);

    expect(newState.selectedIngredients[0]).toEqual(initialConstructor[2]);
    expect(newState.selectedIngredients[1]).toEqual(initialConstructor[1]);
  });
});
