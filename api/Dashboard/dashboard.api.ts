const getTotalIssues = async (
 
    contextSetter: ( data: any[] ) => void, 
    httpRequest: (...args: any) => Promise<any>,

) => {

    const url = window.location.host === 'localhost:3000' 
    ? 'http://localhost:8000/api/issues'
    :   `${process.env.NEXT_PUBLIC_URL_DOMAIN}/api/issues`

    const requestObj = {
        url: url,
        method: 'GET',

    }

    await httpRequest({requestConfig: requestObj, callback: contextSetter});

    return undefined;
};

export const dashboardApi = {
    getTotalIssues
}