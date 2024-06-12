const devDomain = 'localhost:3000'

const getCommentsByIssueId = async (

    issueId: string,
    contextSetter: (data: any[]) => void,
    httpRequest: (...args: any) => Promise<any>,

) => {

    const url = window.location.host === devDomain 
    ? `http://localhost:8000/api/comments/${issueId}`
    :   `${process.env.NEXT_PUBLIC_URL_DOMAIN}/api/comments/${issueId}`

    const requestObj = {
        url: url,
        method: 'GET',
        withCredentials: true 
    }

    await httpRequest({requestConfig: requestObj, callback: contextSetter});

    return undefined;
}

const postCreateCommentToIssueId = async (
    token: string,
    postBodyData: {},
    httpRequest: (...args: any) => Promise<any>,
    callbackFunc: (...args: any) => void
) => {

    const url = window.location.host === devDomain 
    ? `http://localhost:8000/api/comments/new`
    :   `${process.env.NEXT_PUBLIC_URL_DOMAIN}/api/comments/new`

    const requestConfig = {
        url: url,
        method: 'POST',
        withCredentials: true,
        data: postBodyData,
        headers: {
            authorization: token
        }
    };

    await httpRequest({ requestConfig: requestConfig, callback: callbackFunc });

}

const putUpdateCommentToIssueId = async (
    token: string,
    issueId: string,
    putBodyData: {},
    httpRequest: (...args: any) => Promise<any>,
    callbackFunc: (...args: any ) => void,

) => {

    const url = window.location.host === devDomain 
    ? `http://localhost:8000/api/comments/${issueId}`
    :   `${process.env.NEXT_PUBLIC_URL_DOMAIN}/api/comments/${issueId}`

    const requestConfig = {
        url: url,
        method: 'PUT',
        withCredentials: true,
        data: putBodyData,
        headers: {
            authorization: token
        }
    };

    await httpRequest({ requestConfig: requestConfig, callback: callbackFunc });
}

const deleteCommentToIssueId = async (
    token: string,
    commentId: string,
    httpRequest: (...args: any) => Promise<any>,
    callbackFunc: (...args: any ) => void,
) => {

    const url = window.location.host === devDomain 
    ? `http://localhost:8000/api/comments/${commentId}`
    :   `${process.env.NEXT_PUBLIC_URL_DOMAIN}/api/comments/${commentId}`

    const requestConfig = {
        url: url,
        method: 'DELETE',
        withCredentials: true,
        headers: {
            authorization: token
        }
    };

    await httpRequest({ requestConfig: requestConfig, callback: callbackFunc });
}

export const commentApi = {
    getCommentsByIssueId,
    postCreateCommentToIssueId,
    deleteCommentToIssueId,
    putUpdateCommentToIssueId,
}