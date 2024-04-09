  export interface Post {
    userId: number;
    id: number;
    author: string;
    body: string;
    authorImg: string;
  }
export interface User {
    email: string;
    password: string;
    name: string;
    id: number;
    avatar: string;
  }