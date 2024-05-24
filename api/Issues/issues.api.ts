const devDomain = 'localhost:3000'

const getIssuesByTeam = async (

    contextSetter: (data: any[]) => void,
    httpRequest: (...args: any) => Promise<any>,

) => {};

const getRecentIssues = async (
    
    contextSetter: (data: any[]) => void,
    httpRequest: (...args: any) => Promise<any>,

) => {

    const url = window.location.host === devDomain 
    ? 'http://localhost:8000/api/issues'
    :   `${process.env.NEXT_PUBLIC_URL_DOMAIN}/api/issues`

    const requestObj = {
        url: url,
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

    const url = window.location.host === devDomain
    ? `http://localhost:8000/api/issues/priority/${type}`
    : `${process.env.NEXT_PUBLIC_URL_DOMAIN}/api/issues/priority/${type}`;


    const requestConfig = {
        url: url,
        method: 'GET',
        withCredentials: true 
    }

    await httpRequest({requestConfig: requestConfig, callback: contextSetter});
};

const getIssuesByUser = async (

    contextSetter: (data: any[]) => void,
    httpRequest: (...args: any) => Promise<any>,

) => {};

const postCreateIssue = async (
    token: string,
    postBodyData: {},
    httpRequest: (...args: any) => Promise<any>,
    callback: (...args: any ) => void,

) => {

    const url = window.location.host === devDomain 
    ? 'http://localhost:8000/api/issues/new' 
    : `${process.env.NEXT_PUBLIC_URL_DOMAIN}/api/issues/new`

    const requestConfig = {
        url: url,
        method: 'POST',
        withCredentials: true,
        data: postBodyData,
        headers: {
            authorization: token
        }
    }

    await httpRequest({ requestConfig: requestConfig, callback: callback})
};

const putUpdateIssue = async (
    token: string,
    issueId: string,
    putBodyData: {},
    httpRequest: (...args: any) => Promise<any>,
    callback: (...args: any ) => void,

) => {

    const url = window.location.host === devDomain 
    ? `http://localhost:8000/api/issues/${issueId}` 
    : `${process.env.NEXT_PUBLIC_URL_DOMAIN}/api/issues/${issueId}`

    const requestConfig = {
        url: url,
        method: 'PUT',
        withCredentials: true,
        data: putBodyData,
        headers: {
            authorization: token
        }
    }

    await httpRequest({ requestConfig: requestConfig, callback: callback})
}

export const issuesApi = {
    getIssuesByTeam,
    getRecentIssues,
    getIssuesByStatus,
    getIssuesByPriority,
    getIssuesByUser,
    postCreateIssue,
    putUpdateIssue
}