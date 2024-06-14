import React, { ReactNode, Suspense, useState } from 'react';
import { thLabels, sortDirection } from '@/constants/costants';

interface DashboardContextProviderProps { children: ReactNode }
interface DashboardContextProps {
    issues: any[];
    setIssues: (args: any) => void;
    urgentIssues: any[];
    setUrgentIssuesData: (args: any) => void;
    issueCountTotal: string;
    setIssueCountTotalFun: (args: any) => void;
    queryParams: QueryParamTypes;
    setQueryParamsFunc: ( keyName: string, value: any ) => void;
    paramString: string;
    pagination: {
        pageTotal: number;
        currentPage: number;
    }
}

interface QueryParamTypes {
    limit: string,
    offset: string,
    sortDirection: number,
    columnType: number;
}

const DashboardContext = React.createContext<DashboardContextProps | null>(null)

export const DashboardContextProvider: React.FC<DashboardContextProviderProps> = ({ children }) => {

    const [ issues, setIssues ] = useState<any[]>([]);

    const [ issueCountTotal, setIssueCountTotal ] = useState<string>('0');

    const [ urgentIssues, setUrgentIssues ] = useState<any[]>([]);

    const [ pagination, setPagination ] = useState({
        pageTotal:1,
        currentPage:1
    });

    const [ queryParams, setQueryParams ] = useState<QueryParamTypes>({
        limit: '10',
        offset: '0',
        sortDirection: 0,
        columnType: 2
    });

    const generateQueryString = (): string => {

        const queryParamsRecord: Record<string, string> = {
            limit: queryParams.limit,
            offset: queryParams.offset,
            sortDirection: sortDirection[queryParams.sortDirection],
            columnType: thLabels[queryParams.columnType].id,
        };
    
        const params = new URLSearchParams(queryParamsRecord).toString();
        return params;
    }

    const paramString = generateQueryString();

    const setUrgentIssuesData = ( data: any[] ) => {
        setUrgentIssues(data);
    };

    const setIssueCountTotalFun = ( data: any[] ) => {

        setPagination({
            pageTotal: data[0].totalPages,
            currentPage: data[0].currentPage
        })

        setIssueCountTotal(data[0].totalCount);

    }

    const setQueryParamsFunc = ( keyName: string , value: any ): void => {

        setQueryParams(prev => ({
            ...prev,
            [keyName]: value
        }));

        return undefined;
    };

    return (
        <Suspense fallback={<>Loading...</>}>
            <DashboardContext.Provider
                value={{
                    issues,
                    setIssues,
                    urgentIssues,
                    setUrgentIssuesData,
                    issueCountTotal,
                    setIssueCountTotalFun,
                    queryParams,
                    setQueryParamsFunc,
                    paramString,
                    pagination
                }}
            >
                { children }
            </DashboardContext.Provider>
        </Suspense>
    )
};

export default DashboardContext;