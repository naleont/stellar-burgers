import { orderSlice, orderActions, reducer } from '../src/services/order/slice';
import { getFeeds, getOrderByNumber } from '../src/services/order/actions';

jest.mock('@api', () => ({
  getFeedsApi: jest.fn(),
  getOrderByNumberApi: jest.fn()
}));

const initialState = {
  feeds: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: undefined
};

const mockOrders = [
  {
    _id: 'order-1',
    number: 12345,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:30:00Z',
    status: 'done',
    name: 'Флюоресцентный бургер',
    ingredients: ['ing-1', 'ing-2']
  },
  {
    _id: 'order-2',
    number: 12346,
    createdAt: '2024-01-01T11:00:00Z',
    updatedAt: '2024-01-01T11:30:00Z',
    status: 'pending',
    name: 'Классический бургер',
    ingredients: ['ing-3', 'ing-4']
  }
];

const mockFeedsResponse = {
  orders: mockOrders,
  total: 100,
  totalToday: 5
};

describe('Редьюсеры order', () => {
  test('тест на получение заказа но номеру', () => {
    const state = {
      ...initialState,
      feeds: mockOrders
    };

    const action = orderActions.selectOrder(String(mockOrders[0].number));
    const newState = reducer(state, action);

    expect(newState.currentOrder).toEqual(mockOrders[0]);
  });

  test('тест на состояние pending', () => {
    const action = { type: getFeeds.pending.type };
    const newState = reducer(initialState, action);

    expect(newState.loading).toBe(true);
    expect(newState.error).toBeUndefined();
    expect(newState.feeds).toEqual([]);
  });

  test('тест на получение ленты заказов', () => {
    const action = {
      type: getFeeds.fulfilled.type,
      payload: mockFeedsResponse
    };
    const newState = reducer(initialState, action);

    expect(newState.loading).toBe(false);
    expect(newState.feeds).toEqual(mockOrders);
    expect(newState.total).toBe(100);
    expect(newState.totalToday).toBe(5);
    expect(newState.error).toBeUndefined();
  });

  const mockOrderResponse = {
    orders: [mockOrders[0]]
  };

  test('тест на получение заказа по номеру', () => {
    const action = {
      type: getOrderByNumber.fulfilled.type,
      payload: mockOrderResponse
    };
    const newState = reducer(initialState, action);

    expect(newState.loading).toBe(false);
    expect(newState.currentOrder).toEqual(mockOrders[0]);
    expect(newState.error).toBeUndefined();
  });
});

describe('Селекторы order', () => {
  const state = {
    order: {
      feeds: mockOrders,
      currentOrder: mockOrders[0],
      total: 100,
      totalToday: 5,
      loading: false,
      error: undefined
    }
  };

  test('получение списка заказов', () => {
    const result = orderSlice.selectors.feeds(state);
    expect(result).toEqual(mockOrders);
  });

  test('получение текущего заказа', () => {
    const result = orderSlice.selectors.order(state);
    expect(result).toEqual(mockOrders[0]);
  });

  test('получение общего количества заказов', () => {
    const result = orderSlice.selectors.total(state);
    expect(result).toBe(100);
  });

  test('получение количества заказов за сегодня', () => {
    const result = orderSlice.selectors.totalToday(state);
    expect(result).toBe(5);
  });
});
