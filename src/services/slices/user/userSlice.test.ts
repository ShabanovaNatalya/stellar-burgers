import { expect, test } from '@jest/globals';
import {
  checkUserAuth,
  loginUser,
  reducer,
  UserState,
  initialState
} from './userSlice';

describe('Test userSlice', () => {
  const userLoginData = {
    email: 'test1@mail.ru',
    password: 'test'
  };

  const userData = {
    success: true,
    accessToken:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YTg5OTVjMTMzYWNkMDAxYmU0ZmIwMCIsImlhdCI6MTc0MDMzODU1OCwiZXhwIjoxNzQwMzM5NzU4fQ.WiffTBZFkDD_drkjBTglMDePCpTm4OHALrXqGkyWBZs',
    refreshToken:
      '479c628d0601d24757469d9135aa98a3c060226964c9552fffa5e92179c427f34c082706cffd3251',
    user: {
      email: 'test1@mail.ru',
      name: 'Test'
    }
  };
  test('Тест начального состояния', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const state = reducer(undefined, action);
    expect(state).toEqual(initialState);
  }),
    test('Проверка пользователя rejected', () => {
      const error = new Error('Test error');

      const expectedState: UserState = {
        isAuthChecked: true,
        userData: null,
        errorMessage: error.message,
        error: undefined
      };

      const actualState = reducer(
        initialState,
        checkUserAuth.rejected(error, '')
      );

      expect(actualState).toEqual(expectedState);
    });

  test('Проверка пользователя fulfilled', () => {
    const actualState = reducer(
      { ...initialState, isAuthChecked: true },
      checkUserAuth.fulfilled(userData, '')
    );

    const expectedState: UserState = {
      isAuthChecked: true,
      userData: userData.user,
      errorMessage: '',
      error: undefined
    };

    expect(actualState).toEqual(expectedState);
  });

  test('Тест Вход пользователя pending', () => {
    const actualState = reducer(
      initialState,
      loginUser.pending('', userLoginData)
    );
    expect(actualState).toEqual(initialState);
  });

  test('Тест Вход пользователя rejected', () => {
    const error = new Error('Test error');

    const expectedState: UserState = {
      isAuthChecked: false,
      userData: null,
      errorMessage: error.message,
      error: undefined
    };

    const actualState = reducer(
      initialState,
      loginUser.rejected(error, '', userLoginData)
    );

    expect(actualState).toEqual(expectedState);
  });

  test('Тест Вход пользователя  fulfilled', () => {
    const actualState = reducer(
      initialState,
      loginUser.fulfilled(userData, '', userLoginData)
    );

    const expectedState: UserState = {
      isAuthChecked: true,
      userData: { ...userData.user },
      errorMessage: '',
      error: undefined
    };

    expect(actualState).toEqual(expectedState);
  });
});
