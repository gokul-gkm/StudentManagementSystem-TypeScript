import { Request, Response } from 'express';
import { AdminService } from '../services/adminService';
import { LoginRequest } from '../types/requests';
import { ErrorResponse } from '../types/responses';

export class AdminController {
  constructor(private adminService: AdminService) {}

  loginAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
      const credentials: LoginRequest = req.body;
      const response = await this.adminService.login(credentials);
      res.json(response);
    } catch (error) {
      const errorResponse: ErrorResponse = {
        message: error instanceof Error ? error.message : 'Server error',
      };
      
      const statusCode = error instanceof Error && 
        error.message === 'Invalid username or password' ? 401 : 500;
      
      res.status(statusCode).json(errorResponse);
    }
  };
}