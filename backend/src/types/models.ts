import { Types } from "mongoose";

export interface IStudent {
  _id?: string | Types.ObjectId;
  name: string;
  email: string;
  grade: string;
  age: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAdmin {
  _id?: string | Types.ObjectId;
  username: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAdminDocument extends IAdmin {
  matchPassword(enteredPassword: string): Promise<boolean>;
}

export interface IStudentDocument extends Omit<IStudent, '_id'> {
  _id: Types.ObjectId;
}