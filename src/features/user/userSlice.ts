import { registerUserApi, TLoginData } from './../../utils/burger-api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { TUser } from '@utils-types';
import { loginUserApi } from '@api';

// export const loginUserThunk = createAsyncThunk(
//   'users/loginUser',
//   (data): TLoginData =>
//     loginUserApi(data).then((token) => {
//       localStorage.setItem('token', token);
//       return token;
//     })
// );

// export const getUserThunk = createAsyncThunk(
//   'users/getUser',
//   ({ token }: { token: string }) => getUser({ token })
// );

// export const loadIngredientList = createAsyncThunk('ingredientList', async () =>

// );

export interface UserState {
  isAuthChecked: boolean;
  isLoading: boolean;
  user: TUser | null;
  error: string | null;
}

const initialState: UserState = {
  isAuthChecked: false,
  isLoading: false,
  user: null,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    init: (state) => {
      state.isAuthChecked = true;
    }
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(checkUserAuth.fulfilled, (state, action) => {
  //       // state.data = action.payload.user;
  //       state.requestStatus = RequestStatus.Success;
  //     })
  //     .addCase(registerUserApi.fulfilled, (state, action) => {
  //       // state.data = action.payload.user;
  //       state.requestStatus = RequestStatus.Success;
  //     })
  //     .addCase(loginUser.fulfilled, (state, action) => {
  //       // state.data = action.payload.user;
  //       state.requestStatus = RequestStatus.Success;
  //     })
  //     .addMatcher(isActionPending(USER_SLICE_NAME), (state) => {
  //       state.requestStatus = RequestStatus.Loading;
  //     })
  //     .addMatcher(isActionRejected(USER_SLICE_NAME), (state) => {
  //       state.requestStatus = RequestStatus.Failed;
  //     });
  // },
  selectors: {
    getUser: (state) => state.user,
    getIsAuthChecked: (state) => state.isAuthChecked
  }
});

export const { init } = userSlice.actions;

export const { getUser, getIsAuthChecked } = userSlice.selectors;
