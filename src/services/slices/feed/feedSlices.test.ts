import { expect, test } from '@jest/globals';
import { FeedState, loadFeeds, reducer } from './feedSlices';

describe('Test feedSlices', () => {
  const initialState: FeedState = {
    feedList: [],
    feedListInfo: {
      total: 0,
      totalToday: 0
    },
    isFeedListsLoading: false,
    error: ''
  };

  test('Тест загрузки списка общих заказов pending', () => {
    const actualState = reducer(initialState, loadFeeds.pending(''));
    const expectedState: FeedState = {
      feedList: [],
      feedListInfo: {
        total: 0,
        totalToday: 0
      },
      isFeedListsLoading: true,
      error: ''
    };

    expect(actualState).toEqual(expectedState);
  });

  test('Тест загрузки списка общих заказов rejected', () => {
    const error = new Error('Test error');

    const expectedState: FeedState = {
      feedList: [],
      feedListInfo: {
        total: 0,
        totalToday: 0
      },
      isFeedListsLoading: false,
      error: error.message
    };

    const actualState = reducer(initialState, loadFeeds.rejected(error, ''));

    expect(actualState).toEqual(expectedState);
  });

  test('Тест загрузки списка общих заказов fulfilled', () => {
    const feedList = {
      success: true,
      orders: [
        {
          _id: '67bdfe2f133acd001be53af3',
          ingredients: [
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa0940',
            '643d69a5c3f7b9001cfa0947',
            '643d69a5c3f7b9001cfa0949',
            '643d69a5c3f7b9001cfa094a',
            '643d69a5c3f7b9001cfa093c'
          ],
          status: 'done',
          name: 'Астероидный фалленианский краторный экзо-плантаго люминесцентный метеоритный бургер',
          createdAt: '2025-02-25T17:30:23.703Z',
          updatedAt: '2025-02-25T17:30:24.455Z',
          number: 69421
        },
        {
          _id: '67bde8ab133acd001be53acc',
          ingredients: [
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa0946',
            '643d69a5c3f7b9001cfa0949',
            '643d69a5c3f7b9001cfa0943',
            '643d69a5c3f7b9001cfa0946',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093c'
          ],
          status: 'done',
          name: 'Space краторный минеральный экзо-плантаго люминесцентный бургер',
          createdAt: '2025-02-25T15:58:35.444Z',
          updatedAt: '2025-02-25T15:58:36.045Z',
          number: 69420
        }
      ],
      total: 69047,
      totalToday: 71
    };

    const actualState = reducer(
      { ...initialState, isFeedListsLoading: true },
      loadFeeds.fulfilled(feedList, '')
    );

    const expectedState: FeedState = {
      feedList: [...feedList.orders],
      feedListInfo: {
        total: feedList.total,
        totalToday: feedList.totalToday
      },
      isFeedListsLoading: false,
      error: ''
    };

    expect(actualState).toEqual(expectedState);
  });
});
