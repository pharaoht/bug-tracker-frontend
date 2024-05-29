
const devDomain = 'localhost:3000';

const getImagesByIssueId = async (

    issueId: string,
    contextSetter: (data: any[]) => void,
    httpRequest: (...args: any) => Promise<any>,

) => {

    const url = window.location.host === devDomain 
    ? `http://localhost:8000/api/images/issues/${issueId}`
    :   `${process.env.NEXT_PUBLIC_URL_DOMAIN}/api/images/issues/${issueId}`

    const requestObj = {
        url: url,
        method: 'GET',
        withCredentials: true 

    }

    await httpRequest({requestConfig: requestObj, callback: contextSetter});

    return undefined;

};

export const issueImagesApi = {
    getImagesByIssueId,
}