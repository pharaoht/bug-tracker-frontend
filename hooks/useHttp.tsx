import { useState  } from 'react';
import axios from 'axios';
import { dalServiceType } from '@/dal/Dal';

interface useHttpType {
    requestConfig: {
        url: string;
        method?:string;
        headers?: {};
        data?: {};
        withCredentials?:boolean;

    };
    callback: (...args: any) => void;
    isMultiPart?: boolean | null;
    dalService?: dalServiceType | null;
}

const useHttp = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    const sendRequest = async ({ requestConfig, callback, isMultiPart, dalService }: useHttpType,) => {

        setIsLoading(true);
        setError('');

        let response;

        try {

            if(isMultiPart){

                response = await axios.post(requestConfig.url, requestConfig.data, {
                    headers: requestConfig.headers,
                    withCredentials: true,
                });
            }
            else {
                
                response = await axios(requestConfig);
            }

            if(response.status !== 200){ throw new Error('Request failed') }

            if(dalService) {
  
                const dto = dalService.fromDto(response.data);

                callback(dto);

            }
            else {                
                callback(response.data);
            }
        }
        catch (err: any) { 

            const resErr = err?.response?.data.error || undefined;
            
            if (err instanceof Error) {
                setError(resErr || err.message || 'Something went wrong');
            } 

            if(callback){
                callback(resErr);
            }

        }

        setIsLoading(false);
    };

    return {isLoading, error, sendRequest,}
};

export default useHttp;