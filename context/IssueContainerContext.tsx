import React, { Suspense, useState } from "react";
import { ReactNode } from "react";

interface IssueContextProviderProps { children: ReactNode };
interface IssueContextProps {
    teamIssues: any[];
    setTeamIssues: (args: any) => void;
    issueAssign: any[];
    setIssueAssign: (args: any) => void;
    highPriorityIssues: any[];
    setHighPriorityIssues: (args: any) => void;
    inProgressIssues: any[];
    setInProgressIssues: (args: any) => void;
};

const IssueContext = React.createContext<IssueContextProps | null>(null);

export const IssueContextProvider: React.FC<IssueContextProviderProps> = ({ children }) => {

    const [ teamIssues, setTeamIssues ] = useState<any[]>([]);

    const [ issueAssign, setIssueAssign ] = useState<any[]>([]);

    const [ highPriorityIssues, setHighPriorityIssues ] = useState<any[]>([]);

    const [ inProgressIssues, setInProgressIssues ] = useState<any[]>([]);

    return (
        <Suspense fallback={<>Loading...</>}>
            <IssueContext.Provider
                value={{
                    teamIssues,
                    setTeamIssues,
                    issueAssign,
                    setIssueAssign,
                    highPriorityIssues,
                    setHighPriorityIssues,
                    inProgressIssues,
                    setInProgressIssues
                }}
            >
                { children }
            </IssueContext.Provider>
        </Suspense>
    )
}

export default IssueContext;