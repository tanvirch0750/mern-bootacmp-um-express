import { Request, Response } from 'express';
import { IStudent } from './student.interface';
import { StudentServices } from './student.service';
import studentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
    try {
        const studentData: IStudent = req.body.student as unknown as IStudent;

        const zodParseData = studentValidationSchema.parse(studentData);

        const result = await StudentServices.createStudenIntoDB(zodParseData);

        res.status(200).json({
            success: true,
            message: 'Student is created successfully',
            data: result,
        });
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
            error: error,
        });
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
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error,
        });
    }
};

export const StudentController = {
    createStudent,
    getAllStudents,
    getSingleStudent,
};
