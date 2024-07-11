import { dalServiceType } from "../Dal";

interface userType {
    id: number,
    name: string,
    isAdmin: boolean,
    teamName: string,
    teamId: number,
    createdAt: string,
    imageUrl: string,
}

class UserDataAccessLayer implements dalServiceType {

    constructor(){
    }

    fromDto( data: any[] ){

        const issueData = data;

        const dto = issueData.map((itm: userType, idx) => {

            return {
                id: itm.id,
                name: itm.name,
                isAdmin: itm.isAdmin,
                teamName: itm.teamName,
                teamId: itm.teamId,
                createdAt: itm.createdAt,
                imageUrl: itm.imageUrl,
                value: itm.id,
                label: itm.name
            }
        })

        return dto;

    }

    toDto(){
        
    }
};

const initUserDataAccessLayer = () => {
    return new UserDataAccessLayer();
}

export default initUserDataAccessLayer;