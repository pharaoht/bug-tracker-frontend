import React, {useState, useCallback} from 'react';
import axios from 'axios';

interface useHttpType {
    requestConfig: {
        url: string;
        method?:string;
        headers?: {};
        data?: {};
        withCredentials?:boolean;

    };
    callback: (...args: any) => void;
}

const useHttp = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    const sendRequest = async ({ requestConfig, callback }: useHttpType,) => {
        setIsLoading(true);
        setError('');

        try {
            const response = await axios(requestConfig);

            if(response.status !== 200){ throw new Error('Request failed') }
            
            callback(response.data);

        }
        catch (err: any) { 

            const resErr = err?.response?.data.error || undefined;

            if (err instanceof Error) {
                setError(resErr || err.message || 'Something went wrong');
            } 
        }

        setIsLoading(false);
    };

    return {isLoading, error, sendRequest,}
};

export default useHttp;