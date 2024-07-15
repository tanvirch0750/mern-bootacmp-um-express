import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { updateStudentValidationSchema } from './student.validation';

const router = express.Router();

router.get('/', StudentController.getAllStudents);
router.get('/:id', StudentController.getSingleStudent);
router.delete('/:id', StudentController.deleteStudent);
router.patch(
    '/:id',
    validateRequest(updateStudentValidationSchema),
    StudentController.updateStudent,
);

export const StudentRoutes = router;
