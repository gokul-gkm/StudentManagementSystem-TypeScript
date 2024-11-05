import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AdminService } from '../services/adminService';

interface JwtPayload {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      admin?: any;
    }
  }
}

const adminService = new AdminService();

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token: string | undefined;

    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      res.status(401).json({ message: 'Not authorized, no token' });
      return;
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    const admin = await adminService.findById(decoded.id);

    if (!admin) {
      res.status(401).json({ message: 'Not authorized, invalid token' });
      return;
    }

    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};