import { expect, test } from '@jest/globals';
import { orderBurger, OrderState, reducer, initialState } from './orderSlices';

describe('Test orderSlice', () => {
  const dataBurger = [
    '643d69a5c3f7b9001cfa093c',
    '643d69a5c3f7b9001cfa0941',
    '643d69a5c3f7b9001cfa0943',
    '643d69a5c3f7b9001cfa093c'
  ];

  test('Тест начального состояния', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const state = reducer(undefined, action);
    expect(state).toEqual(initialState);
  }),
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
        ],
        _id: '67c0a89f133acd001be543a6',

        status: 'done',
        name: 'Краторный space био-марсианский бургер',
        createdAt: '2025-02-27T18:02:07.782Z',
        updatedAt: '2025-02-27T18:02:08.594Z',
        number: 69637
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
