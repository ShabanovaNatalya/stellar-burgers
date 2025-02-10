import { getFeedsApi, getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient, TOrder, TOrdersData, TUserBurger } from '@utils-types';

export const loadIngredientList = createAsyncThunk(
  'ingredients/fetch',
  async () => getIngredientsApi()
);

export interface ProductState {
  userBurger: TUserBurger;

  error: string | undefined;
}

export const initialState: ProductState = {
  userBurger: {
    bun: undefined,
    ingredients: []
  },
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
  extraReducers: (builder) => {},
  selectors: {}
});

export const { init, handleAddIngredient } = productSlice.actions;
