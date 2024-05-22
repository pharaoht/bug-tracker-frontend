export interface ViewIssuePropTypes {
    id: string,
    title: string,
    description: string,
    status: string,
    priority: string,
    createdAt: string,
    team: string,
    teamId: string,
    userId: string,
    imageUrl: string,
    createdBy: string,
}

export interface formStateType {
  title: string;
  description: string;
  status: string;
  priority: string;
  userId: string;
  teamId: string
}