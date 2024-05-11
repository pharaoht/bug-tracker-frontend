import React, { ReactNode, Suspense, useState } from 'react';

interface DashboardContextProviderProps { children: ReactNode }
interface DashboardContextProps {
    totalIssues: any[];
    setTotalIssuesData: (args: any) => void;
}

const DashboardContext = React.createContext<DashboardContextProps | null>(null)

export const DashboardContextProvider: React.FC<DashboardContextProviderProps> = ({ children }) => {

    const [ totalIssues, setTotalIssues ] = useState<any[]>([]);

    const setTotalIssuesData = ( data: any[] ) => {
        console.log(data)
        setTotalIssues(data)
    };
    

    return (
        <Suspense fallback={<>Loading...</>}>
            <DashboardContext.Provider
                value={{
                    totalIssues,
                    setTotalIssuesData
                }}
            >
                { children }
            </DashboardContext.Provider>
        </Suspense>
    )
};

export default DashboardContext;