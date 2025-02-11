// import { getFeedsApi, getIngredientsApi } from '@api';
// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { TIngredient, TOrder, TOrdersData, TUserBurger } from '@utils-types';

// export const loadIngredientList = createAsyncThunk(
//   'ingredients/fetch',
//   async () => getIngredientsApi()
// );

// export interface ProductState {
//   userBurger: TUserBurger;

//   error: string | undefined;
// }

// export const initialState: ProductState = {
//   userBurger: {
//     bun: undefined,
//     ingredients: []
//   },
//   error: ''
// };

// export const productSlice = createSlice({
//   name: 'product',
//   initialState,
//   reducers: {
//     init: (state) => {}
//   },
//   extraReducers: (builder) => {},
//   selectors: {}
// });

// export const { init } = productSlice.actions;
