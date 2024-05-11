const login = async ( ) => {

    const url = window.location.host === 'localhost:3000' 
    ? 'http://localhost:8000/api/auth/google'
    : `${process.env.NEXT_PUBLIC_URL_DOMAIN}/api/auth/google`

    window.location.href = url;
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
    userDetails
}