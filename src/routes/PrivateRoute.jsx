import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Navigate, useLocation } from 'react-router';
import { UsersIcon } from '@heroicons/react/16/solid';

const PrivateRoute = ({ children }) => {
    const { user, userStatus } = useContext(AuthContext)

    const location = useLocation()

  if (!user|| userStatus!=='active') {
    return <Navigate state={location.pathname} to="/login" />;
  }
  return children
};

export default PrivateRoute;