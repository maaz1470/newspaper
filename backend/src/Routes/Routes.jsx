import DashboardLayout from "./../views/Layout/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./../views/dashboard/Dashboard";
import AuthLayout from "./../views/pages/Auth/AuthLayout";
import Login from "./../views/pages/login/Login";
import Register from "./../views/pages/register/Register";
import { createBrowserRouter, Navigate } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: '/',
        element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
        children: [
            {
                path: '',
                element: <Dashboard />
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: '',
                element: <Navigate to={'/auth/login'} replace />
            },
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'register',
                element: <Register />,
            },
        ]
    },
    {
        path: '*',
        element: <h1>404 Error</h1>,
    },
])

export default router;