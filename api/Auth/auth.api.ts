const login = async ( ) => {

    const url = window.location.host === 'localhost:3000' 
    ? 'http://localhost:8000/api/auth/google'
    : `${process.env.NEXT_PUBLIC_URL_DOMAIN}/api/auth/google`

    window.location.href = url;
}

const logout = async (
    httpRequest: (...args: any) => Promise<any>,
    contextSetter: (...args: any) => void
) => {

    const url = 'http://localhost:8000/api/auth/logout';

    const requestConfig = {
        url:url,
        method: 'GET',
        withCredentials: true 
    }

    await httpRequest({requestConfig: requestConfig, callback: contextSetter});
    contextSetter([]);

}

const userDetails = async (
    contextSetter: (...args: any) => void,
    httpRequest: (...args: any) => Promise<any>,

) => {

    const url = window.location.host === 'localhost:3000' 
    ? 'http://localhost:8000/api/users/email'
    : `${process.env.NEXT_PUBLIC_URL_DOMAIN}/api/users/email`


    const requestConfig = {
        url:url,
        method: 'GET',
        withCredentials: true 

    }

    await httpRequest({requestConfig: requestConfig, callback: contextSetter});

}


export const authApi = {
    login,
    logout,
    userDetails
}