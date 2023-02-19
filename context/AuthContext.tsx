import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'
import firebase from "firebase/app"
import {User} from '@firebase/auth-types'


 
export interface AuthContextType {
    currentUser: firebase.User | null;
    signup: (email: string, password: string) => Promise<firebase.auth.UserCredential>;
    login: (email: string, password: string) => Promise<firebase.auth.UserCredential>;
    logout: () => Promise<void>;
  }

const AuthContext = React.createContext < AuthContextType > ({} as AuthContextType);

export function useAuth() {
    return useContext(AuthContext);
}
 
export function AuthProvider({ children }:{children: React.ReactNode}) {
    const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
    const [loading, setLoading] = useState<boolean>(true)

    const  signup = (email:string, password:string) => {
       return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email:string, password:string) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        return signOut(auth)
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        logout,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}