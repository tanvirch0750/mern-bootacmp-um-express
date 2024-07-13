import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { IStudent } from './student.interface';
import { StudentServices } from './student.service';

const getAllStudents = catchAsync(async (req, res) => {
    const result = await StudentServices.getAllStudentsFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Students retrived succesfully',
        data: result,
    });
});

const getSingleStudent = catchAsync(async (req, res) => {
    const studentId = req?.params?.studentId;
    const result = await StudentServices.getSingleStudentFromDB(studentId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student retrived succesfully',
        data: result,
    });
});

const updateStudent = catchAsync(async (req, res) => {
    const studentId = req?.params?.studentId;

    const studentData: Partial<IStudent> = req.body;

    const result = await StudentServices.updateStudentIntoDB(
        studentId,
        studentData,
    );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student update succesfully',
        data: result,
    });
});

const deleteStudent = catchAsync(async (req, res) => {
    const studentId = req?.params?.studentId;

    const result = await StudentServices.deleteStudentFromDB(studentId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student delete succesfully',
        data: result,
    });
});

export const StudentController = {
    getAllStudents,
    getSingleStudent,
    deleteStudent,
    updateStudent,
};
