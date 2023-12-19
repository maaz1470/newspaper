/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './../Provider/AuthProvider';

const ProtectedRoute = ({children}) => {
    const {auth, loading} = useContext(AuthContext)
    if(loading){
        return 'Loading...';
    }
    if(auth){
        return children;
    }else{
        return <Navigate to={'/auth/login'} replace />
    }
};

export default ProtectedRoute;