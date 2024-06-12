'use client'
import React, { ReactNode, Suspense, useEffect, useState } from 'react';

interface UserContextProviderProps { children: ReactNode }
interface UserContextProps {
    userInfo: any[];
    isLoggedIn: boolean;
    setUserInfo: (args: any) => void;
    token: string | null;
}

const UserContext = React.createContext<UserContextProps | null>(null);

export const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {

    const [ userInfo, setUserInfo ] = useState<any[]>([]);

    const [ token, setUserToken ] = useState('');

    const isLoggedIn = userInfo?.length > 0 ? true : false;

    const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : '';

    const paramValue = urlParams == '' ? '' : urlParams.get('token');

    useEffect(() => {

        if(paramValue){
            localStorage.setItem('token', paramValue);
            setUserToken(paramValue);
        }
        else if(!paramValue && !token){
            const storageToken = localStorage.getItem('token');
            setUserToken(storageToken || '')
        }

    }, [ paramValue ])
    

    return (
        <Suspense fallback={<>Loading..</>}>
            <UserContext.Provider
                value={{
                    userInfo,
                    isLoggedIn,
                    setUserInfo,
                    token,
                }}
            >
                { children }
            </UserContext.Provider>
        </Suspense>
    )
};

export default UserContext;