import React, { ReactNode, Suspense, useState } from 'react';

interface DashboardContextProviderProps { children: ReactNode }
interface DashboardContextProps {
    issues: any[];
    setIssues: (args: any) => void;
    urgentIssues: any[];
    setUrgentIssuesData: (args: any) => void;
    issueCountTotal: string;
    setIssueCountTotalFun: (args: any) => void;
}

const DashboardContext = React.createContext<DashboardContextProps | null>(null)

export const DashboardContextProvider: React.FC<DashboardContextProviderProps> = ({ children }) => {

    const [ issues, setIssues ] = useState<any[]>([]);

    const [ issueCountTotal, setIssueCountTotal ] = useState<string>('0');

    const [ urgentIssues, setUrgentIssues ] = useState<any[]>([]);


    const setTotalIssuesData = ( data: any[] ) => {
        setIssues(data)
    };

    const setUrgentIssuesData = ( data: any[] ) => {
        setUrgentIssues(data);
    };

    const setIssueCountTotalFun = ( data: any[] ) => {

        setIssueCountTotal(data[0].totalCount)
    }
    

    return (
        <Suspense fallback={<>Loading...</>}>
            <DashboardContext.Provider
                value={{
                    issues,
                    setIssues,
                    urgentIssues,
                    setUrgentIssuesData,
                    issueCountTotal,
                    setIssueCountTotalFun
                }}
            >
                { children }
            </DashboardContext.Provider>
        </Suspense>
    )
};

export default DashboardContext;