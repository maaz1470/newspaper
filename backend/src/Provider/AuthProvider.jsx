/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(false)
    const [loading, setLoading] = useState(true)

    const checkUser = () => {
        axios.get('/checkAuth').then(response => {
            setLoading(false)
            if(response.data.status === 200){
                setAuth(true)
            }
        }).catch(error => {
            setLoading(false)
            // console.clear()
        })
    }

    useEffect(() => {
        checkUser()
        return () => checkUser()
    },[])

    

    const userInfo = {
        loading,
        auth,
        checkUser
    }
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider
