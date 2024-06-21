const devDomain = 'localhost:3000';

const getNotificationsByUserId = async (
    token: string,
    userId: string,
    contextSetter: (data: any[]) => void,
    httpRequest: (...args: any) => Promise<any>,

) => {
    
    const url = window.location.host === devDomain 
    ? `http://localhost:8000/api/notifications/user/${userId}`
    :   `${process.env.NEXT_PUBLIC_URL_DOMAIN}/api/notifications/user/${userId}`

    const requestObj = {
        url: url,
        method: 'GET',
        withCredentials: true,
        headers: {
            authorization: token
        }
    }

    await httpRequest({requestConfig: requestObj, callback: contextSetter});

    return undefined;
}

const updateNotificationById = async (

    token: string,
    notificationId: string,
    httpRequest: (...args: any) => Promise<any>,

) => {

    const url = window.location.host === devDomain 
    ? `http://localhost:8000/api/notifications/${notificationId}`
    :   `${process.env.NEXT_PUBLIC_URL_DOMAIN}/api/notifications/${notificationId}`

    const requestObj = {
        url: url,
        method: 'PUT',
        withCredentials: true,
        headers: {
            authorization: token
        }
    }

    await httpRequest({requestConfig: requestObj, callback: () => {}});

    return undefined;
}

const deleteNotificationById = async (

    token: string,
    notificationId: string,
    httpRequest: (...args: any) => Promise<any>,

) => {

    const url = window.location.host === devDomain 
    ? `http://localhost:8000/api/notifications/${notificationId}`
    :   `${process.env.NEXT_PUBLIC_URL_DOMAIN}/api/notifications/${notificationId}`

    const requestObj = {
        url: url,
        method: 'DELETE',
        withCredentials: true,
        headers: {
            authorization: token
        }
    }

    await httpRequest({requestConfig: requestObj, callback: () => {}});

    return undefined;
}

export const notificationsApi = {
    getNotificationsByUserId,
    deleteNotificationById,
    updateNotificationById
}