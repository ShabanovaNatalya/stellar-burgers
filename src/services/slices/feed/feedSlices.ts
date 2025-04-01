import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';

export const loadFeeds = createAsyncThunk('feedsList/fetch', getFeedsApi);

export interface FeedState {
  feedList: TOrder[];
  feedListInfo: {
    total: number;
    totalToday: number;
  };
  isFeedListsLoading: boolean;
  error: string | undefined;
}

export const initialState: FeedState = {
  feedList: [],
  feedListInfo: {
    total: 0,
    totalToday: 0
  },
  isFeedListsLoading: false,
  error: ''
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Лист заказов
      .addCase(loadFeeds.pending, (state) => {
        state.isFeedListsLoading = true;
        state.error = '';
      })
      .addCase(loadFeeds.rejected, (state, action) => {
        state.isFeedListsLoading = false;
        state.error = action.error.message;
      })
      .addCase(loadFeeds.fulfilled, (state, action) => {
        state.isFeedListsLoading = false;
        state.feedList = action.payload.orders;
        state.feedListInfo.total = action.payload.total;
        state.feedListInfo.totalToday = action.payload.totalToday;
      });
  },
  selectors: {
    getFeedList: (state) => state.feedList
  }
});

export const { getFeedList } = feedSlice.selectors;

export const reducer = feedSlice.reducer;
