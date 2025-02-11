import {
  forgotPasswordApi,
  logoutApi,
  refreshToken,
  registerUserApi,
  resetPasswordApi,
  TAuthResponse,
  TLoginData,
  TRefreshResponse,
  TRegisterData
} from '../../../utils/burger-api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { RequestStatus, TUser } from '@utils-types';
import { loginUserApi } from '@api';
import { setCookie, getCookie } from '../../../utils/cookie';

// export const getUserThunk = createAsyncThunk(
//   'users/getUser',
//   ({ token }: { token: string }) => getUser({ token })
// );

//       "email": "tashka131@mail.ru",987654321
//       "name": "Natalya"

export const checkUserAuth = createAsyncThunk('user/checkUser', async () => {
  await refreshToken().then((data: TRefreshResponse) => data);
});

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData) =>
    await loginUserApi(data).then((data: TAuthResponse) => {
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data;
    })
);

// {
//   "success": true,
//   "accessToken": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YTg5OTVjMTMzYWNkMDAxYmU0ZmIwMCIsImlhdCI6MTczOTExODE0NCwiZXhwIjoxNzM5MTE5MzQ0fQ.pUsmz7qQQjm-EPJ9reT4JfXTnFRFvze2MMWTOeqiMQU",
//   "refreshToken": "7df3a511f41c05d2ac902b691f6786094e63aaf68c2074d4e34dd6bb16f9c3ba6ef769568d61e014",
//   "user": {
//       "email": "tashka131@mail.ru",987654321
//       "name": "Natalya"
//   }
// }

export const registerUser = createAsyncThunk(
  'user/registerData',
  async (registerData: TRegisterData) =>
    await registerUserApi(registerData).then((data: TAuthResponse) => {
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.accessToken);
      return data;
    })
);

export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (data: { email: string }) =>
    await forgotPasswordApi(data).then((data) => data)
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (data: { password: string; token: string }) =>
    await resetPasswordApi(data).then((data) => data)
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async () => await logoutApi().then((data) => data)
);

export interface UserState {
  isAuthChecked: boolean; // флаг для статуса проверки токена пользователя
  userData: TUser;
  requestStatus: RequestStatus;
  error: string | undefined;
}

const initialState: UserState = {
  isAuthChecked: false,
  userData: {
    name: '',
    email: ''
  },
  requestStatus: RequestStatus.Idle,
  error: undefined
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authCheck: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      // Проверка
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.isAuthChecked = true;
      })

      // Вход
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.isAuthChecked = true;
        state.requestStatus = RequestStatus.Success;
      })
      // Регистрация
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.isAuthChecked = true;
        state.requestStatus = RequestStatus.Success;
      })
      // Выход
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.userData = {
          name: '',
          email: ''
        };
        state.isAuthChecked = false;
        state.requestStatus = RequestStatus.Success;
      })
      // Отправка почты для смены пароля (проверка на ошибку)
      .addCase(forgotPassword.rejected, (state, action) => {
        state.error = action.error.message;
      })
      // Смена пароля (проверка на ошибку)
      .addCase(resetPassword.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },

  selectors: {
    getUser: (state) => state.userData,
    getIsAuthChecked: (state) => state.isAuthChecked
  }
});

export const { authCheck } = userSlice.actions;

export const { getUser, getIsAuthChecked } = userSlice.selectors;
