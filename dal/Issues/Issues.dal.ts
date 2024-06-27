import { dalServiceType } from "../Dal";

interface issueType {
    id: string,
    title: string,
    description: string,
    status: string,
    priority: string,
    createdAt:string,
    team: string,
    teamId: string,
    userId: string,
    imageUrl: string,
    createdBy: string,
    totalCount: number,
    currentPage: number,
    totalPages: number
}

class IssueDataAccessLayer implements dalServiceType {
    //if resource is 'issueDal' then init this
    constructor(){
    }

    fromDto( data: any[] ){

        const issueData = data;

        const dto = issueData.map((itm: issueType, idx) => {

            return {
                id: itm.id,
                title: itm.title,
                description: itm.description,
                status: {
                    value: itm.status.toLowerCase().replace(/ /,'_'),
                    display: itm.status
                },
                priority: {
                    value: itm.priority.toLowerCase(),
                    display: itm.priority
                },
                createdAt:itm.createdAt,
                team: itm.team,
                teamId: itm.teamId,
                userId: itm.userId,
                imageUrl: itm.imageUrl,
                createdBy: itm.createdBy,
                totalCount: itm.totalCount,
                currentPage: itm.currentPage,
                totalPages: itm.totalPages,
            }
        })

        return dto;


    }

    toDto(){
        
    }
};

const initIssueDataAccessLayer = () => {
    return new IssueDataAccessLayer();
}

export default initIssueDataAccessLayer;