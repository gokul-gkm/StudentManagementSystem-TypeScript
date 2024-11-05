import express from 'express';
import { StudentController } from '../controllers/studentController';
import { StudentService } from '../services/studentService';
import { protect } from '../middleware/auth';

const router = express.Router();


const studentService = new StudentService();
const studentController = new StudentController(studentService);

router.use(protect);

router.route('/')
  .get(studentController.getStudents)
  .post(studentController.createStudent);

router.route('/:id')
  .put(studentController.updateStudent)
  .delete(studentController.deleteStudent);

export default router;