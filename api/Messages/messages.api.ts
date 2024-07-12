const devDomain = 'localhost:3000';

const getLatestConversations = async (
    id: string,
    token: string,
    contextSetter: (data: any[]) => void,
    httpRequest: (...args: any) => Promise<any>,

) => {

    const url = window.location.host === devDomain 
    ? `http://localhost:8000/api/messages/${id}`
    :   `${process.env.NEXT_PUBLIC_URL_DOMAIN}/api/messages/${id}`

    const requestObj = {
        url: url,
        method: 'POST',
        withCredentials: true,
        data: {},
        headers: {
            authorization: token
        }

    }

    await httpRequest({ requestConfig: requestObj, callback: contextSetter });

    return undefined;
};

const getMessagesById = async (
    senderId: string,
    token: string,
    receiverId: string,
    contextSetter: React.Dispatch<React.SetStateAction<any[]>>,
    httpRequest: (...args: any) => Promise<any>,
) => {

    const url = window.location.host === devDomain 
    ? `http://localhost:8000/api/messages/${senderId}/${receiverId}`
    :   `${process.env.NEXT_PUBLIC_URL_DOMAIN}/api/messages/${senderId}/${receiverId}`

    const requestObj = {
        url: url,
        method: 'POST',
        withCredentials: true,
        headers: {
            authorization: token
        }

    }

    await httpRequest({ requestConfig: requestObj, callback: contextSetter });

};

const postCreateMessage = async (
    token: string, 
    postBodyData: {}, 
    httpRequest: (...args: any) => Promise<any>,
    callbackFunc: (...args: any) => void,
) => {

    const url = window.location.host === devDomain 
    ? 'http://localhost:8000/api/messages/create'
    :   `${process.env.NEXT_PUBLIC_URL_DOMAIN}/api/messages/create`;

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

const putUpdateReadStatus = async (
    senderId: string,
    receiverId: string,
    token: string,
    httpRequest: (...args: any) => Promise<any>,
    callbackFunc: (...args: any) => void,
) => {

    const url = window.location.host === devDomain 
    ? `http://localhost:8000/api/messages/${senderId}/${receiverId}`
    :   `${process.env.NEXT_PUBLIC_URL_DOMAIN}/api/messages/${senderId}/${receiverId}`;

    const requestConfig = {
        url: url,
        method: 'PUT',
        withCredentials: true,
        headers: {
            authorization: token
        }
    };

    await httpRequest({ requestConfig: requestConfig, callback: callbackFunc });
}

export const messagesApi = {
    getLatestConversations,
    getMessagesById,
    postCreateMessage,
    putUpdateReadStatus
}