import {
  userSlice,
  userActions,
  reducer,
  initialState
} from '../src/services/user/slice';
import { login, logout } from '../src/services/user/actions';

jest.mock('@api', () => ({
  loginUserApi: jest.fn(),
  logoutApi: jest.fn(),
  getUserApi: jest.fn(),
  registerUserApi: jest.fn(),
  updateUserApi: jest.fn(),
  isTokenExists: jest.fn()
}));

const mockUser = {
  email: 'testuser@example.com',
  name: 'Test User'
};

describe('Редьюсеры user', () => {
  test('тест на установление пользователя', () => {
    const action = userActions.setUser(mockUser);
    const newState = reducer(initialState, action);

    expect(newState.user).toEqual(mockUser);
  });

  test('тест на флаг авторизации', () => {
    const action = userActions.setIsAuthChecked(true);
    const newState = reducer(initialState, action);

    expect(newState.isAuthChecked).toBe(true);
  });

  test('тест login', () => {
    const action = {
      type: login.fulfilled.type,
      payload: mockUser
    };
    const newState = reducer(initialState, action);

    expect(newState.user).toEqual(mockUser);
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.error).toBeNull();
  });

  test('тест logout', () => {
    const stateWithUser = {
      ...initialState,
      user: mockUser,
      isAuthChecked: false
    };

    const action = { type: logout.fulfilled.type };
    const newState = reducer(stateWithUser, action);

    expect(newState.user).toBeNull();
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.error).toBeNull();
  });
});

describe('Селекторы user', () => {
  const state = {
    user: {
      user: mockUser,
      isAuthChecked: true,
      error: null
    }
  };

  test('тест на получение пользователя', () => {
    const result = userSlice.selectors.selectUser(state);
    expect(result).toEqual(mockUser);
  });

  test('тест на получение значения флага авторизации', () => {
    const result = userSlice.selectors.selectIsAuthChecked(state);
    expect(result).toBe(true);
  });
});
