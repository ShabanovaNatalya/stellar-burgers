import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import store, { RootState, useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { TUser } from '@utils-types';
import { getIsAuthChecked, getUser } from '../../features/user/userSlice';

interface ProtectedRouteProps {
  children: ReactElement;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useSelector(getUser);
  const isAuthChecked = useSelector(getIsAuthChecked);

  if (!user) {
    return <Navigate replace to='/login' />;
  }

  // if (!isAuthChecked) {
  //   return <Preloader />;
  // }

  return children;
};
