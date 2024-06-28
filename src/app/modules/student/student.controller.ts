import { Request, Response } from 'express';
import { Student } from './student.interface';
import { StudentServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
    try {
        const studentData: Student = req.body.student as unknown as Student;

        const result = await StudentServices.createStudenIntoDB(studentData);

        res.status(200).json({
            success: true,
            message: 'Student is created successfully',
            data: result,
        });
    } catch (error) {
        console.log(error);
    }
};

const getAllStudents = async (req: Request, res: Response) => {
    try {
        const result = await StudentServices.getAllStudentsFromDB();
        res.status(200).json({
            success: true,
            message: 'Students are retrived successfully',
            data: result,
        });
    } catch (error) {
        console.log(error);
    }
};

const getSingleStudent = async (req: Request, res: Response) => {
    const studentId = req?.params?.studentId;

    try {
        const result = await StudentServices.getSingleStudentFromDB(studentId);
        res.status(200).json({
            success: true,
            message: 'Student retrived successfully',
            data: result,
        });
    } catch (error) {
        console.log(error);
    }
};

export const StudentController = {
    createStudent,
    getAllStudents,
    getSingleStudent,
};
