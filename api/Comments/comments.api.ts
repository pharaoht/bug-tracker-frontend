const devDomain = 'localhost:3000'

const getCommentsByIssueId = async (

    issueId: string,
    contextSetter: (data: any[]) => void,
    httpRequest: (...args: any) => Promise<any>,

) => {

    const url = window.location.host === devDomain 
    ? `http://localhost:8000/api/comments/${issueId}`
    :   `${process.env.NEXT_PUBLIC_URL_DOMAIN}/api/${issueId}`

    const requestObj = {
        url: url,
        method: 'GET',
        withCredentials: true 
    }

    await httpRequest({requestConfig: requestObj, callback: contextSetter});

    return undefined;
}

export const commentApi = {
    getCommentsByIssueId,
}