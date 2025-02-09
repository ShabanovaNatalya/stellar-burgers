import { getFeedsApi, getIngredientsApi } from '@api';
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
  error: string | undefined;
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
    bun: undefined,
    ingredients: []
  },
  isIngredientsLoading: false,
  isOrdersListsLoading: false,
  error: ''
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    init: (state) => {},
    handleAddIngredient: (state, action) => {
      // if (action.type === 'bun') {
      //   state.userBurger.bun.name = action.payload.name;
      //   state.userBurger.bun.image = action.payload.image;
      //   state.userBurger.bun.price = action.payload.price;
      // } else if (action.type === 'main') {
      //   state.userBurger.bun.image = action.payload.image;
      // } else if (action.type === 'sauce') {
      //   state.userBurger.ingredients = [
      //     ...state.userBurger.ingredients,
      //     action.payload
      //   ];
      // }
    }
  },
  extraReducers: (builder) => {
    builder
      // Лист ингридиентов
      .addCase(loadIngredientList.pending, (state) => {
        state.error = '';
        state.isIngredientsLoading = true;
      })
      .addCase(loadIngredientList.rejected, (state, action) => {
        state.isIngredientsLoading = false;
        state.error = action.error.message;
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
      // Лист заказов
      .addCase(loadOrders.pending, (state) => {
        state.isOrdersListsLoading = true;
        state.error = '';
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
    getOrdersList: (state) => state.ordersList,
    getIsIngredientsLoading: (state) => state.isIngredientsLoading
  }
});

export const { init, handleAddIngredient } = productSlice.actions;

export const {
  getIngredientList,
  getOrderData,
  getIsIngredientsLoading,
  getOrdersList
} = productSlice.selectors;
