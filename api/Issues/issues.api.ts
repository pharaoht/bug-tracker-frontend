const getIssuesByTeam = async (

    contextSetter: (data: any[]) => void,
    httpRequest: (...args: any) => Promise<any>,

) => {};

const getRecentIssues = async (
    
    contextSetter: (data: any[]) => void,
    httpRequest: (...args: any) => Promise<any>,

) => {};

const getIssuesByStatus = async (

    contextSetter: (data: any[]) => void,
    httpRequest: (...args: any) => Promise<any>,

) => {};

const getIssuesByPriority = async (

    contextSetter: (data: any[]) => void,
    httpRequest: (...args: any) => Promise<any>,

) => {};

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