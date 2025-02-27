import { expect, test } from '@jest/globals';
import { orderBurger, OrderState, reducer } from './orderSlices';

describe('Test orderSlice', () => {
  const initialState: OrderState = {
    orderModalData: null,
    lastOrderName: '',
    isOrderLoading: false,
    orderRequest: false,
    orderAccept: false,
    error: ''
  };

  const dataBurger = [
    '643d69a5c3f7b9001cfa093c',
    '643d69a5c3f7b9001cfa0941',
    '643d69a5c3f7b9001cfa0943',
    '643d69a5c3f7b9001cfa093c'
  ];

  test('Тест заказа pending', () => {
    const actualState = reducer(
      initialState,
      orderBurger.pending('', dataBurger)
    );

    const expectedState: OrderState = {
      orderModalData: null,
      lastOrderName: '',
      isOrderLoading: true,
      orderRequest: true,
      orderAccept: false,
      error: ''
    };

    expect(actualState).toEqual(expectedState);
  });

  test('Тест заказа rejected', () => {
    const error = new Error('Test error');

    const expectedState: OrderState = {
      orderModalData: null,
      lastOrderName: '',
      isOrderLoading: false,
      orderRequest: true,
      orderAccept: false,
      error: error.message
    };

    const actualState = reducer(
      { ...initialState, isOrderLoading: true, orderRequest: true },
      orderBurger.rejected(error, '', dataBurger)
    );

    expect(actualState).toEqual(expectedState);
  });

  test('Тест заказа fulfilled', () => {
    const orderList = {
      success: true,
      name: 'Краторный space био-марсианский бургер',
      order: {
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa0943',
          '643d69a5c3f7b9001cfa093c'
          //   {
          //     _id: '643d69a5c3f7b9001cfa093c',
          //     name: 'Краторная булка N-200i',
          //     type: 'bun',
          //     proteins: 80,
          //     fat: 24,
          //     carbohydrates: 53,
          //     calories: 420,
          //     price: 1255,
          //     image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          //     image_mobile:
          //       'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          //     image_large:
          //       'https://code.s3.yandex.net/react/code/bun-02-large.png',
          //     __v: 0
          //   },
          //   {
          //     _id: '643d69a5c3f7b9001cfa0941',
          //     name: 'Биокотлета из марсианской Магнолии',
          //     type: 'main',
          //     proteins: 420,
          //     fat: 142,
          //     carbohydrates: 242,
          //     calories: 4242,
          //     price: 424,
          //     image: 'https://code.s3.yandex.net/react/code/meat-01.png',
          //     image_mobile:
          //       'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
          //     image_large:
          //       'https://code.s3.yandex.net/react/code/meat-01-large.png',
          //     __v: 0
          //   },
          //   {
          //     _id: '643d69a5c3f7b9001cfa0943',
          //     name: 'Соус фирменный Space Sauce',
          //     type: 'sauce',
          //     proteins: 50,
          //     fat: 22,
          //     carbohydrates: 11,
          //     calories: 14,
          //     price: 80,
          //     image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
          //     image_mobile:
          //       'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
          //     image_large:
          //       'https://code.s3.yandex.net/react/code/sauce-04-large.png',
          //     __v: 0
          //   },
          //   {
          //     _id: '643d69a5c3f7b9001cfa093c',
          //     name: 'Краторная булка N-200i',
          //     type: 'bun',
          //     proteins: 80,
          //     fat: 24,
          //     carbohydrates: 53,
          //     calories: 420,
          //     price: 1255,
          //     image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          //     image_mobile:
          //       'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          //     image_large:
          //       'https://code.s3.yandex.net/react/code/bun-02-large.png',
          //     __v: 0
          //   }
        ],
        _id: '67c0a89f133acd001be543a6',
        // owner: {
        //   name: 'Natalya',
        //   email: 'tashka131@mail.ru',
        //   createdAt: '2025-02-09T12:02:36.543Z',
        //   updatedAt: '2025-02-15T13:13:16.478Z'
        // },
        status: 'done',
        name: 'Краторный space био-марсианский бургер',
        createdAt: '2025-02-27T18:02:07.782Z',
        updatedAt: '2025-02-27T18:02:08.594Z',
        number: 69637
        // ,
        // price: 3014
      }
    };

    const actualState = reducer(
      { ...initialState, isOrderLoading: true, orderRequest: true },
      orderBurger.fulfilled(orderList, '', dataBurger)
    );

    const expectedState: OrderState = {
      orderModalData: { ...orderList.order },
      lastOrderName: orderList.order.name,
      isOrderLoading: false,
      orderRequest: false,
      orderAccept: true,
      error: ''
    };

    expect(actualState).toEqual(expectedState);
  });
});
