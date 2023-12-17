/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './../../../Provider/AuthProvider';

const AuthLayout = ({children}) => {
    const {auth} = useContext(AuthContext)
    if(auth){
        return <Navigate to={'/'} />
    }
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default AuthLayout;