import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.config';
import Loader from '../Utility/Loader';
import axios from 'axios';
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null)



const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [role, setRole] = useState('')
    const [userStatus, setUserStatus] = useState([])


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])


    // current user role and status
    useEffect(() => {
        if (!user) return
        axios.get(`https://red-love-backend.vercel.app/users/role/${user?.email}`)
            .then(res => {
                setRole(res.data.role)
                setUserStatus(res.data.status)
            })
            .catch(error => console.log(error))
    }, [user])




    const info = {
        user,
        setUser,
        loading,
        setLoading,
        userStatus,
        role
    }

    if (loading) {
        return <Loader />

    }
    return (
        <AuthContext value={info}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;