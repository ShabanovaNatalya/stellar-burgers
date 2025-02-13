import React, { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import store, { RootState, useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { TUser } from '@utils-types';
import {
  getIsAuthChecked,
  getUser
} from '../../services/slices/user/userSlice';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useSelector(getUser);
  const isAuthChecked = useSelector(getIsAuthChecked);

  // if (isAuthChecked && user.name) {
  //   console.log('NAVIGATE FROM /');
  //   return <Navigate replace to={'/'} />;
  // }

  if (!isAuthChecked) {
    console.log('NAVIGATE FROM PAGE TO LOGIN');
    return <Navigate replace to={'/login'} />;
  }

  console.log('RENDER COMPONENT');

  return children;
};
