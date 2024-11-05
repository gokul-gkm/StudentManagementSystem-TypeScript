import Student from '../models/Student';
import { IStudent } from '../types/models';
import { CreateStudentRequest, UpdateStudentRequest } from '../types/requests';

export class StudentService {
  async getAllStudents(): Promise<IStudent[]> {
    return await Student.find({}).sort({ createdAt: -1 });
  }

  async createStudent(studentData: CreateStudentRequest): Promise<IStudent> {
    try {
      return await Student.create(studentData);
    } catch (error) {
      if (error instanceof Error && error.message.includes('duplicate key')) {
        throw new Error('Email already exists');
      }
      throw error;
    }
  }

  async updateStudent(id: string, updateData: UpdateStudentRequest): Promise<IStudent | null> {
    const student = await Student.findById(id);
    if (!student) {
      throw new Error('Student not found');
    }
    
    try {
      const updatedStudent = await Student.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );
      return updatedStudent;
    } catch (error) {
      if (error instanceof Error && error.message.includes('duplicate key')) {
        throw new Error('Email already exists');
      }
      throw error;
    }
  }

  async deleteStudent(id: string): Promise<void> {
    const student = await Student.findById(id);
    if (!student) {
      throw new Error('Student not found');
    }
    
    await Student.deleteOne({ _id: id });
  }

  async findById(id: string): Promise<IStudent | null> {
    return await Student.findById(id);
  }
}