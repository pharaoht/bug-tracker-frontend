import React, {useState, useCallback} from 'react';
import axios from 'axios';

interface useHttpType {
    requestConfig: {
        url: string;
        method?:string;
        headers?: {};
        body?: {};
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
            setIsLoading(false);

        }
        catch (err) { 

            if (err instanceof Error) {
                setError(err.message || 'Something went wrong');
            } 
        }
    };

    return {isLoading, error, sendRequest,}
};

export default useHttp;