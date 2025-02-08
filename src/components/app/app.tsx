import React, { useEffect } from 'react';

import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { ProtectedRoute } from '../ProtectedRoute';
import { ROLE } from 'src/constants';
import { useDispatch, AppDispatch } from '../../services/store';
import {
  loadIngredientList,
  loadOrders
} from '../../features/product/productSlice';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadIngredientList());
    dispatch(loadOrders());

    //   const token = localStorage.getItem('token');
    //   if (token) {
    //     // dispatch(getUserThunk({ token }));
    //   } else {
    //     // dispatch(init());
    //   }
  }, []);

  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <Routes>
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/feed' element={<Feed />} />

          <Route
            path='/login'
            element={
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path='/register'
            element={
              <ProtectedRoute>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path='/forgot-password'
            element={
              <ProtectedRoute>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='/reset-password'
            element={
              <ProtectedRoute>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile/orders'
            element={
              <ProtectedRoute>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<NotFound404 />} />
        </Routes>

        {/* <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title={'Детали ингредиента'}
                onClose={}
                children={<OrderInfo />}
              ></Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title={'Детали ингредиента'}
                onClose={}
                children={<IngredientDetails />}
              ></Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal children={<OrderInfo />}></Modal>
              </ProtectedRoute>
            }
          />
        </Routes> */}
      </div>
    </>
  );
}

export default App;
