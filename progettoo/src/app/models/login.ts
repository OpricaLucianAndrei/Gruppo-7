export interface Login {
    accessToken: string;
    user: {
        id: number;
        authorImg: string;
        email: string;
        name: string;
        admin: boolean; 
        
    }
}
