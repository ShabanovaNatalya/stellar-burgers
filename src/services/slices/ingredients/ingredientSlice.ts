import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export const loadIngredientList = createAsyncThunk(
  'ingredients/fetch',
  async () => getIngredientsApi()
);

export interface IngredientsState {
  ingredientList: TIngredient[] | [];
  buns: TIngredient[] | [];
  mains: TIngredient[] | [];
  sauces: TIngredient[] | [];
  isIngredientsLoading: boolean;
  error: string | undefined;
}

export const initialState: IngredientsState = {
  ingredientList: [],
  buns: [],
  mains: [],
  sauces: [],
  isIngredientsLoading: false,
  error: ''
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
        state.ingredientList.map((item: TIngredient) => {
          if (item.type === 'bun') {
            state.buns = [...state.buns, item];
          } else if (item.type === 'main') {
            state.mains = [...state.mains, item];
          } else if (item.type === 'sauce') {
            state.sauces = [...state.sauces, item];
          }
        });
      });
  },
  selectors: {
    getIngredientsList: (state) => state.ingredientList,
    getIsIngredientsLoading: (state) => state.isIngredientsLoading
  }
});

export const { getIngredientsList, getIsIngredientsLoading } =
  ingredientsSlice.selectors;
