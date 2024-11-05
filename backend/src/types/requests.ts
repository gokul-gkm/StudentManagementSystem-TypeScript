export interface LoginRequest {
    username: string;
    password: string;
  }
  
  export interface CreateStudentRequest {
    name: string;
    email: string;
    grade: string;
    age: number;
  }
  
  export interface UpdateStudentRequest extends Partial<CreateStudentRequest> {}