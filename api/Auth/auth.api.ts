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
    
    const url = window.location.host === 'localhost:3000' 
        ? 'http://localhost:8000/api/auth/logout'
        : `${process.env.NEXT_PUBLIC_URL_DOMAIN}/api/auth/logout`;

    const requestConfig = {
        url:url,
        method: 'GET',
        withCredentials: true 
    }
    contextSetter([]);
    localStorage.clear()

    await httpRequest({requestConfig: requestConfig, callback: ()=>{}});

    window.location.href = '/'


}

const userDetails = async (
    contextSetter: (...args: any) => void,
    httpRequest: (...args: any) => Promise<any>,
    token: string,

) => {

    const url = window.location.host === 'localhost:3000' 
    ? 'http://localhost:8000/api/users/id'
    : `${process.env.NEXT_PUBLIC_URL_DOMAIN}/api/users/id`


    const requestConfig = {
        url:url,
        method: 'GET',
        withCredentials: true,
        headers: {
            authorization: token
        }

    }

    await httpRequest({requestConfig: requestConfig, callback: contextSetter});

}


export const authApi = {
    login,
    logout,
    userDetails
}