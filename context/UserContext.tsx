'use client'
import React, { ReactNode, Suspense, useState } from 'react';

interface UserContextProviderProps { children: ReactNode }
interface UserContextProps {
    userInfo: any[];
    isLoggedIn: boolean;
    setUserInfo: (args: any) => void;
}

const UserContext = React.createContext<UserContextProps | null>(null);

export const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {

    const [ userInfo, setUserInfo ] = useState<any[]>([]);

    const isLoggedIn = userInfo.length > 0 ? true : false;

    return (
        <Suspense fallback={<>Loading..</>}>
            <UserContext.Provider
                value={{
                    userInfo,
                    isLoggedIn,
                    setUserInfo,
                }}
            >
                { children }
            </UserContext.Provider>
        </Suspense>
    )
};

export default UserContext;