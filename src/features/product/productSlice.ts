import { getFeedsApi, getIngredientsApi, TFeedsResponse } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient, TOrder, TOrdersData, TUserBurger } from '@utils-types';

export const loadIngredientList = createAsyncThunk(
  'ingredients/fetch',
  async () => getIngredientsApi()
);

export const loadOrders = createAsyncThunk('ordersList/fetch', async () =>
  getFeedsApi()
);

export interface ProductState {
  ingredientList: TIngredient[] | [];
  buns: TIngredient[] | [];
  mains: TIngredient[] | [];
  sauces: TIngredient[] | [];
  ordersList: TOrder[];
  ordersListInfo: {
    total: number;
    totalToday: number;
  };
  ordersData: TOrdersData | null;
  userBurger: TUserBurger;
  isIngredientsLoading: boolean;
  isOrdersListsLoading: boolean;
  error: string | null;
}

export const initialState: ProductState = {
  ingredientList: [],
  buns: [],
  mains: [],
  sauces: [],
  ordersList: [],
  ordersListInfo: {
    total: 0,
    totalToday: 0
  },
  ordersData: null,
  userBurger: {
    bun: {
      name: '',
      price: 0,
      image: ''
    },
    ingredients: []
  },
  isIngredientsLoading: false,
  isOrdersListsLoading: false,
  error: null
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    init: (state) => {}
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadIngredientList.pending, (state) => {
        state.error = null;
        state.isIngredientsLoading = true;
      })
      .addCase(loadIngredientList.rejected, (state, action) => {
        state.isIngredientsLoading = false;
        // state.error = action.error.message;
      })
      .addCase(loadIngredientList.fulfilled, (state, action) => {
        state.isIngredientsLoading = false;
        state.ingredientList = action.payload;
        state.buns = action.payload;
        state.ingredientList.map((item: TIngredient) => {
          if (item.type === 'bun') {
            state.buns = [...state.buns, item];
          } else if (item.type === 'main') {
            state.mains = [...state.mains, item];
          } else if (item.type === 'sauce') {
            state.sauces = [...state.sauces, item];
          }
        });
      })
      .addCase(loadOrders.pending, (state) => {
        state.isOrdersListsLoading = true;
        state.error = null;
      })
      .addCase(loadOrders.rejected, (state, action) => {
        state.isOrdersListsLoading = false;
        // state.error = action.error.message;
      })
      .addCase(loadOrders.fulfilled, (state, action) => {
        state.isOrdersListsLoading = false;
        state.ordersList = action.payload.orders;
        state.ordersListInfo.total = action.payload.total;
        state.ordersListInfo.totalToday = action.payload.totalToday;
      });
  },
  selectors: {
    getIngredientList: (state) => state.ingredientList,
    getOrderData: (state) => state.ordersData,
    getIsIngredientsLoading: (state) => state.isIngredientsLoading
  }
});

export const { init } = productSlice.actions;

export const {
  getIngredientList,
  // getOrder,
  getOrderData,
  getIsIngredientsLoading
} = productSlice.selectors;
