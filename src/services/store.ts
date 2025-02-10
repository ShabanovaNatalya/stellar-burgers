import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { productSlice } from './slices/productSlice';
import { userSlice } from './slices/user/userSlice';
import { feedSlice } from './slices/feed/feedSlices';
import { ingredientsSlice } from './slices/ingredients/ingredientSlice';
import { ordersSlice } from './slices/orders/ordersSlices';

const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [productSlice.name]: productSlice.reducer,
  [feedSlice.name]: feedSlice.reducer,
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [ordersSlice.name]: ordersSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
