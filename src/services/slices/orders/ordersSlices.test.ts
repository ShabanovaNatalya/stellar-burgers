import { expect, test } from '@jest/globals';
import { loadOrders, OrdersState, reducer } from './ordersSlices';

describe('Test OrdersSlice', () => {
  const initialState: OrdersState = {
    ordersList: [],
    isOrdersListsLoading: false,
    error: ''
  };

  test('Тест загрузки списка заказов pending', () => {
    const actualState = reducer(initialState, loadOrders.pending(''));

    const expectedState: OrdersState = {
      ordersList: [],
      isOrdersListsLoading: true,
      error: ''
    };

    expect(actualState).toEqual(expectedState);
  });

  test('Тест загрузки списка заказов rejected', () => {
    const error = new Error('Test error');

    const expectedState: OrdersState = {
      ordersList: [],
      isOrdersListsLoading: false,
      error: error.message
    };

    const actualState = reducer(initialState, loadOrders.rejected(error, ''));

    expect(actualState).toEqual(expectedState);
  });

  test('Тест загрузки списка заказов fulfilled', () => {
    const ordersList = {
      success: true,
      orders: [
        {
          _id: '67b0d767133acd001be51159',
          ingredients: [
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093c'
          ],
          status: 'done',
          name: 'Краторный люминесцентный бургер',
          createdAt: '2025-02-15T18:05:27.571Z',
          updatedAt: '2025-02-15T18:05:28.195Z',
          number: 68458
        },
        {
          _id: '67b0d789133acd001be5115a',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Флюоресцентный люминесцентный бургер',
          createdAt: '2025-02-15T18:06:01.462Z',
          updatedAt: '2025-02-15T18:06:02.137Z',
          number: 68459
        },
        {
          _id: '67b199c2133acd001be51356',
          ingredients: [
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093c'
          ],
          status: 'done',
          name: 'Краторный люминесцентный бургер',
          createdAt: '2025-02-16T07:54:42.985Z',
          updatedAt: '2025-02-16T07:54:43.697Z',
          number: 68534
        }
      ],
      total: 69264,
      totalToday: 148
    };

    const actualState = reducer(
      { ...initialState, isOrdersListsLoading: true },
      loadOrders.fulfilled(ordersList.orders, '')
    );

    const expectedState: OrdersState = {
      ordersList: [...ordersList.orders],
      isOrdersListsLoading: false,
      error: ''
    };

    expect(actualState).toEqual(expectedState);
  });
});
