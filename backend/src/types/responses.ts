export interface AuthResponse {
    token: string;
    admin: {
      _id: string;
      username: string;
    };
  }
  
  export interface StudentResponse {
    _id: string;
    name: string;
    email: string;
    grade: string;
    age: number;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface MessageResponse {
    message: string;
  }
  
  export interface ErrorResponse {
    message: string;
    error?: any;
  }