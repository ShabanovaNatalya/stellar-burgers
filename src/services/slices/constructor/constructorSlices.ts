import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { TConstructorIngredient, TIngredient, TMoveInfo } from '@utils-types';

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
          (item: TConstructorIngredient) => item.id !== payload.id
        );
      }
    },
    sortIngredients: (state, action: PayloadAction<TMoveInfo>) => {
      state.ingredients.splice(
        action.payload.to,
        0,
        state.ingredients.splice(action.payload.from, 1)[0]
      );
    },
    clearConstructorBurger: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  extraReducers: () => {},
  selectors: {
    getIsBurger: (state) => ({
      bun: state.bun,
      ingredients: state.ingredients
    })
  }
});

export const {
  handleAddIngredient,
  handleDeleteIngredient,
  sortIngredients,
  clearConstructorBurger
} = constructorSlices.actions;

export const { getIsBurger } = constructorSlices.selectors;

export const reducer = constructorSlices.reducer;
