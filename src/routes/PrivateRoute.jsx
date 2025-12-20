import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Navigate, useLocation } from 'react-router';
import { UsersIcon } from '@heroicons/react/16/solid';
import Loader from '../Utility/Loader';

const PrivateRoute = ({ children }) => {
  const { user, userStatus, loading } = useContext(AuthContext)

  const location = useLocation()

     if(loading){
        return <Loader/>
    }

    if(user||userStatus === 'active'){
        return children
    }

    return <Navigate state={location.pathname} to="/login" />;
};

export default PrivateRoute;