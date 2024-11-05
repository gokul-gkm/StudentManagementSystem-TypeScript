import jwt from 'jsonwebtoken';
import Admin from '../models/Admin';
import { LoginRequest } from '../types/requests';
import { AuthResponse } from '../types/responses';

export class AdminService {
  private generateToken(id: string): string {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
  }

  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const admin = await Admin.findOne({ username: credentials.username });
    
    if (!admin || !(await admin.matchPassword(credentials.password))) {
      throw new Error('Invalid username or password');
    }

    return {
      token: this.generateToken(admin._id.toString()),
      admin: {
        _id: admin._id.toString(),
        username: admin.username,
      },
    };
  }

  async findById(id: string) {
    return await Admin.findById(id).select('-password');
  }
}