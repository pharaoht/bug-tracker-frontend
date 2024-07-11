import initUserDataAccessLayer from '@/dal/Users/Users.dal';

const userDal = initUserDataAccessLayer()

const getAllUsers = async (
    httpRequest: (...args: any) => Promise<void>,
    contextSetter: React.Dispatch<React.SetStateAction<any>>,
) => {

    const url = window.location.host === 'localhost:3000' 
    ? 'http://localhost:8000/api/users/get'
    : `${process.env.NEXT_PUBLIC_URL_DOMAIN}/api/users/get`;

    const requestConfig = {
        url: url,
        method: 'GET',
        withCredentials: true,
    };

    await httpRequest({ requestConfig: requestConfig, callback: contextSetter, dalService: userDal  })
};

export const usersApi = {
    getAllUsers,
}