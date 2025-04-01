import { expect, test } from '@jest/globals';
import {
  IngredientsState,
  loadIngredientList,
  reducer,
  initialState
} from './ingredientSlice';

describe('Test ingredientsSlice', () => {
  test('Тест начального состояния', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const state = reducer(undefined, action);
    expect(state).toEqual(initialState);
  }),
    test('Тест загрузки списка ингридиентов pending', () => {
      const actualState = reducer(initialState, loadIngredientList.pending(''));

      const expectedState: IngredientsState = {
        ingredientList: [],
        buns: [],
        mains: [],
        sauces: [],
        isIngredientsLoading: true,
        error: ''
      };

      expect(actualState).toEqual(expectedState);
    });

  test('Тест загрузки списка ингридиентов rejected', () => {
    const error = new Error('Test error');

    const expectedState: IngredientsState = {
      ingredientList: [],
      buns: [],
      mains: [],
      sauces: [],
      isIngredientsLoading: false,
      error: error.message
    };

    const actualState = reducer(
      initialState,
      loadIngredientList.rejected(error, '')
    );

    expect(actualState).toEqual(expectedState);
  });

  test('Тест загрузки списка ингридиентов fulfilled', () => {
    const ingredientList = [
      {
        _id: '643d69a5c3f7b9001cfa093d',
        name: 'Флюоресцентная булка R2-D3',
        type: 'bun',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa0945',
        name: 'Соус с шипами Антарианского плоскоходца',
        type: 'sauce',
        proteins: 101,
        fat: 99,
        carbohydrates: 100,
        calories: 100,
        price: 88,
        image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa094a',
        name: 'Сыр с астероидной плесенью',
        type: 'main',
        proteins: 84,
        fat: 48,
        carbohydrates: 420,
        calories: 3377,
        price: 4142,
        image: 'https://code.s3.yandex.net/react/code/cheese.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/cheese-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/cheese-large.png',
        __v: 0
      }
    ];

    const actualState = reducer(
      { ...initialState, isIngredientsLoading: true },
      loadIngredientList.fulfilled(ingredientList, '')
    );

    const expectedState: IngredientsState = {
      ingredientList: [...ingredientList],
      buns: [ingredientList[0]],
      mains: [ingredientList[2]],
      sauces: [ingredientList[1]],
      isIngredientsLoading: false,
      error: ''
    };

    expect(actualState).toEqual(expectedState);
  });
});
