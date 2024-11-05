import express from 'express';
import { AdminController } from '../controllers/adminController';
import { AdminService } from '../services/adminService';

const router = express.Router();

const adminService = new AdminService();
const adminController = new AdminController(adminService);

router.post('/login', adminController.loginAdmin);

export default router;