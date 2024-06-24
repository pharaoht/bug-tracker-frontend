import { formStateType } from "@/types/Dashboard/dashboardType";

const devDomain = 'localhost:3000'

const getIssuesByTeam = async (

    contextSetter: (data: any[]) => void,
    httpRequest: (...args: any) => Promise<any>,

) => {};

const getRecentIssues = async (
    params: string,
    contextSetter: (data: any[]) => void,
    httpRequest: (...args: any) => Promise<any>,

) => {

    const url = window.location.host === devDomain 
    ? `http://localhost:8000/api/issues?${params}`
    :   `${process.env.NEXT_PUBLIC_URL_DOMAIN}/api/issues?${params}`

    const requestObj = {
        url: url,
        method: 'GET',
        withCredentials: true 

    }

    await httpRequest({requestConfig: requestObj, callback: contextSetter});

    return undefined;
};

const getSortIssues = async (

    params: string,
    contextSetter: (data: any[]) => void,
    httpRequest: (...args: any) => Promise<any>,

) => {

    const url = window.location.host === devDomain
    ? `http://localhost:8000/api/issues/sort?${params}`
    : `${process.env.NEXT_PUBLIC_URL_DOMAIN}/api/issues/sort?${params}`;

    const requestConfig = {
        url: url,
        method: 'GET',
        withCredentials: true 
    }

    await httpRequest({requestConfig: requestConfig, callback: contextSetter});
}

const getSearchIssues = async (
    params: string,
    contextSetter: (data: any[]) => void,
    httpRequest: (...args: any) => Promise<any>,
) => {

    const url = window.location.host === devDomain
    ? `http://localhost:8000/api/issues/search?${params}`
    : `${process.env.NEXT_PUBLIC_URL_DOMAIN}/api/issues/search?${params}`;

    const requestConfig = {
        url: url,
        method: 'GET',
        withCredentials: true 
    }

    await httpRequest({requestConfig: requestConfig, callback: contextSetter});
}

const getIssuesByStatus = async (
    type: string,
    contextSetter: (data: any[]) => void,
    httpRequest: (...args: any) => Promise<any>,

) => {

    const url = window.location.host === devDomain
    ? `http://localhost:8000/api/issues/status/${type}`
    : `${process.env.NEXT_PUBLIC_URL_DOMAIN}/api/issues/status/${type}`;


    const requestConfig = {
        url: url,
        method: 'GET',
        withCredentials: true 
    }

    await httpRequest({requestConfig: requestConfig, callback: contextSetter});

};

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
    postBodyData: formStateType,
    httpRequest: (...args: any) => Promise<any>,
    callback: (...args: any ) => void,

) => {

    const url = window.location.host === devDomain 
    ? 'http://localhost:8000/api/issues/new' 
    : `${process.env.NEXT_PUBLIC_URL_DOMAIN}/api/issues/new`

    const formData = new FormData();

    formData.append('file', postBodyData.file || '');
    formData.append('title', postBodyData.title);
    formData.append('description', postBodyData.description)
    formData.append('status', postBodyData.status)
    formData.append('priority', postBodyData.priority)
    formData.append('userId', postBodyData.userId)
    formData.append('teamId', postBodyData.teamId)

    const requestConfig = {
        url: url,
        method: 'POST',
        withCredentials: true,
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
            authorization: token
        }
    }

    await httpRequest({ requestConfig: requestConfig, callback: callback, isMultiPart: true })
};

const postExportToPdf = async (
    postBodyData: {},
    httpRequest: (...args: any) => Promise<any>,
    callback: (...args: any ) => void,

) => {

    const url = window.location.host === devDomain 
    ? 'http://localhost:8000/api/issues/pdf' 
    : `${process.env.NEXT_PUBLIC_URL_DOMAIN}/api/issues/pdf`

    const requestConfig = {
        url: url,
        method: 'POST',
        withCredentials: true,
        data: postBodyData,
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

const deleteArchiveIssue =  async (
    token: string,
    issueId: string,
    httpRequest: (...args: any) => Promise<any>,
    callback: (...args: any ) => void,

) => {

    const url = window.location.host === devDomain 
    ? `http://localhost:8000/api/issues/${issueId}` 
    : `${process.env.NEXT_PUBLIC_URL_DOMAIN}/api/issues/${issueId}`

    const requestConfig = {
        url: url,
        method: 'DELETE',
        withCredentials: true,
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
    putUpdateIssue,
    postExportToPdf,
    deleteArchiveIssue,
    getSortIssues,
    getSearchIssues
}