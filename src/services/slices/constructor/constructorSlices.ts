import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export interface ConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

export const initialState: ConstructorState = {
  bun: null,
  ingredients: []
};

export const constructorSlices = createSlice({
  name: 'constructorBurger',
  initialState,
  reducers: {
    handleAddIngredient: {
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        if (payload.type === 'bun') {
          state.bun = payload;
        } else {
          state.ingredients.push(payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuid() }
      })
    },
    handleDeleteIngredient: (
      state,
      { payload }: PayloadAction<TConstructorIngredient>
    ) => {
      if (payload.type === 'bun') {
        state.bun = null;
      } else {
        state.ingredients = state.ingredients.filter(
          (item: TConstructorIngredient) => {
            if (item.id !== payload.id) {
              return item;
            }
          }
        );
      }
    }
  },
  extraReducers: (builder) => {},
  selectors: {
    getIsBurger: (state) => ({
      bun: state.bun,
      ingredients: state.ingredients
    })
  }
});

export const { handleAddIngredient, handleDeleteIngredient } =
  constructorSlices.actions;

export const { getIsBurger } = constructorSlices.selectors;
