export interface Login {
    accessToken: string;
    user: {
        id: number;
        avatar: string;
        email: string;
        name: string;
        admin: boolean; 
    }
}
