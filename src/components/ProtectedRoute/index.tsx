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
  children: ReactElement;
  onlyUnAuth?: boolean;
}

export const ProtectedRoute = ({
  children,
  onlyUnAuth
}: ProtectedRouteProps) => {
  const user = useSelector(getUser);
  const isAuthChecked = useSelector(getIsAuthChecked);

  if (!isAuthChecked) {
    console.log('WAIT USER CHECKOUT');
    return <Preloader />;
  }

  if (isAuthChecked && user) {
    console.log('NAVIGATE FROM LOGIN TO INDEX');
    return <Navigate replace to={'/'} />;
  }

  if (!isAuthChecked && !user) {
    console.log('NAVIGATE FROM PAGE TO LOGIN');
    return <Navigate replace to={'/login'} />;
  }

  console.log('RENDER COMPONENT');

  return children;
};
