import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { IStudent } from './student.interface';
import { StudentServices } from './student.service';

const getAllStudents = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const result = await StudentServices.getAllStudentsFromDB();

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Students retrived succesfully',
            data: result,
        });
    } catch (error: any) {
        next(error);
    }
};

const getSingleStudent = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const studentId = req?.params?.studentId;

    try {
        const result = await StudentServices.getSingleStudentFromDB(studentId);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Student retrived succesfully',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const updateStudent = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const studentId = req?.params?.studentId;

    const studentData: Partial<IStudent> = req.body;

    try {
        const result = await StudentServices.updateStudentFromDB(
            studentId,
            studentData,
        );
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Student update succesfully',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const deleteStudent = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const studentId = req?.params?.studentId;

    try {
        const result = await StudentServices.deleteStudentFromDB(studentId);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Student delete succesfully',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const StudentController = {
    getAllStudents,
    getSingleStudent,
    deleteStudent,
    updateStudent,
};
