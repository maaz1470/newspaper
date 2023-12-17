/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(true)

    useEffect(() => {
        // axios.get()
    },[])

    const userInfo = {
        auth
    }
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider
