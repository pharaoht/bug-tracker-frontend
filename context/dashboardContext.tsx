import React, { ReactNode, Suspense, useState } from 'react';

interface DashboardContextProviderProps { children: ReactNode }
interface DashboardContextProps {
    totalIssues: any[]
}

const DashboardContext = React.createContext<DashboardContextProps | null>(null)

export const DashboardContextProvider: React.FC<DashboardContextProviderProps> = ({ children }) => {

    const [ totalIssues, setTotalIssues ] = useState<any[]>([]);

    return (
        <Suspense fallback={<>Loading...</>}>
            <DashboardContext.Provider
                value={{
                    totalIssues
                }}
            >
                { children }
            </DashboardContext.Provider>
        </Suspense>
    )
};