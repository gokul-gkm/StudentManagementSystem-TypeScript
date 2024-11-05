import { Request, Response } from 'express';
import { StudentService } from '../services/studentService';
import { CreateStudentRequest, UpdateStudentRequest } from '../types/requests';
import { ErrorResponse } from '../types/responses';

export class StudentController {
  constructor(private studentService: StudentService) {}

  getStudents = async (req: Request, res: Response): Promise<void> => {
    try {
      const students = await this.studentService.getAllStudents();
      res.json(students);
    } catch (error) {
      const errorResponse: ErrorResponse = {
        message: 'Failed to fetch students',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
      res.status(500).json(errorResponse);
    }
  };

  createStudent = async (req: Request, res: Response): Promise<void> => {
    try {
      const studentData: CreateStudentRequest = req.body;
      const student = await this.studentService.createStudent(studentData);
      res.status(201).json(student);
    } catch (error) {
      const errorResponse: ErrorResponse = {
        message: error instanceof Error ? error.message : 'Invalid student data',
      };
      res.status(400).json(errorResponse);
    }
  };

  updateStudent = async (req: Request, res: Response): Promise<void> => {
    try {
      const updateData: UpdateStudentRequest = req.body;
      const student = await this.studentService.updateStudent(req.params.id, updateData);
      res.json(student);
    } catch (error) {
      const errorResponse: ErrorResponse = {
        message: error instanceof Error ? error.message : 'Failed to update student',
      };
      
      const statusCode = error instanceof Error && 
        error.message === 'Student not found' ? 404 : 400;
      
      res.status(statusCode).json(errorResponse);
    }
  };

  deleteStudent = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.studentService.deleteStudent(req.params.id);
      res.json({ message: 'Student removed' });
    } catch (error) {
      const errorResponse: ErrorResponse = {
        message: error instanceof Error ? error.message : 'Failed to delete student',
      };
      
      const statusCode = error instanceof Error && 
        error.message === 'Student not found' ? 404 : 500;
      
      res.status(statusCode).json(errorResponse);
    }
  };
}