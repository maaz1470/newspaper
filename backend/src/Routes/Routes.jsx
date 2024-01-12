import DashboardLayout from "./../views/Layout/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./../views/dashboard/Dashboard";
import AuthLayout from "./../views/pages/Auth/AuthLayout";
import Login from "./../views/pages/login/Login";
import Register from "./../views/pages/register/Register";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Categories from "../views/pages/Category/Categories";
import CategoryLayout from "../views/pages/Category/CategoryLayout";
import AddCategory from "../views/pages/Category/AddCategory";
import EditCategory from "../views/pages/Category/EditCategory";

const router = createBrowserRouter([
    {
        path: '/',
        element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
        children: [
            {
                path: '',
                element: <Dashboard />
            },
            {
                path: 'category',
                element: <CategoryLayout />,
                children: [
                    {
                        path: '',
                        element: <Categories />
                    },
                    {
                        path: 'add',
                        element: <AddCategory />
                    },
                    {
                        path: 'edit/:id',
                        element: <EditCategory />
                    }
                ]
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