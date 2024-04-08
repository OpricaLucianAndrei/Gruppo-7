export interface Login {  
    accessToken: string;
    user: {
        id: number;
        email: string;
        name: string;
    }
}
