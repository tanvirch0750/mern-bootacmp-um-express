import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

router.post('/create-student', StudentController.createStudent);
router.get('/', StudentController.getAllStudents);
router.get('/:studentId', StudentController.getSingleStudent);
router.delete('/delete/:studentId', StudentController.deleteStudent);
router.patch('/update/:studentId', StudentController.updateStudent);

export const StudentRoutes = router;
