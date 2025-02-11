import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TUserBurger } from '@utils-types';

export const orderBurger = createAsyncThunk(
  'order/post',
  async (data: string[]) => orderBurgerApi(data)
);

export interface ProductState {
  userBurger: TUserBurger;
  ingredients: string[];
  lastOrder: TOrder | undefined;
  lastOrderName: string;
  isOrderLoading: boolean;
  error: string | undefined;
}

export const initialState: ProductState = {
  userBurger: {
    bun: undefined,
    ingredients: []
  },
  lastOrder: undefined,
  lastOrderName: '',
  isOrderLoading: false,
  ingredients: [],
  error: ''
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    handleAddIngredient: (state, action) => {
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.isOrderLoading = true;
        state.error = '';
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.error = action.error.message;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.lastOrder = action.payload.order;
        state.lastOrderName = action.payload.name;
      });
  },
  selectors: {}
});

// export const { } = productSlice.actions;
