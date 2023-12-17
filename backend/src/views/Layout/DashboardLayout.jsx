/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContext } from './../../Provider/AuthProvider';
import { AppFooter, AppHeader, AppSidebar } from './../../components/index';

const DashboardLayout = () => {
    return (
        <div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <AppHeader />
                <div className="body flex-grow-1 px-3">
                    <Outlet />
                </div>
                <AppFooter />
            </div>
            
        </div>
    );
};

export default DashboardLayout;