const getIssuesByTeam = async (

    contextSetter: (data: any[]) => void,
    httpRequest: (...args: any) => Promise<any>,

) => {};

const getRecentIssues = async (
    
    contextSetter: (data: any[]) => void,
    httpRequest: (...args: any) => Promise<any>,

) => {

    const url = window.location.host === 'localhost:3000' 
    ? 'http://localhost:8000/api/issues'
    :   `${process.env.NEXT_PUBLIC_URL_DOMAIN}/api/issues`

    const requestObj = {
        url: `${process.env.NEXT_PUBLIC_URL_DOMAIN}/api/issues`,
        method: 'GET',
        withCredentials: true 

    }

    await httpRequest({requestConfig: requestObj, callback: contextSetter});

    return undefined;
};

const getIssuesByStatus = async (

    contextSetter: (data: any[]) => void,
    httpRequest: (...args: any) => Promise<any>,

) => {};

const getIssuesByPriority = async (
    type: string,
    contextSetter: (data: any[]) => void,
    httpRequest: (...args: any) => Promise<any>,

) => {

    const url = window.location.host === 'localhost:3000' 
    ? `http://localhost:8000/api/issues/priority/${type}`
    : `${process.env.NEXT_PUBLIC_URL_DOMAIN}/api/issues/priority/${type}`;


    const requestConfig = {
        url:`${process.env.NEXT_PUBLIC_URL_DOMAIN}/api/issues/priority/${type}`,
        method: 'GET',
        withCredentials: true 
    }

    await httpRequest({requestConfig: requestConfig, callback: contextSetter});
};

const getIssuesByUser = async (

    contextSetter: (data: any[]) => void,
    httpRequest: (...args: any) => Promise<any>,

) => {};


export const issuesApi = {
    getIssuesByTeam,
    getRecentIssues,
    getIssuesByStatus,
    getIssuesByPriority,
    getIssuesByUser
}