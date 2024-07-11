import AppError from '../../errors/appError';
import { IStudent } from './student.interface';
import { StudentModel } from './student.model';

const getAllStudentsFromDB = async () => {
    const result = await StudentModel.find()
        .populate('admissionSemester')
        .populate({
            path: 'academicDepartment',
            populate: {
                path: 'academicFaculty',
            },
        });

    return result;
};

const getSingleStudentFromDB = async (id: string) => {
    const result = await StudentModel.findOne({ id })
        .populate('admissionSemester')
        .populate({
            path: 'academicDepartment',
            populate: {
                path: 'academicFaculty',
            },
        });

    if (!result)
        throw new AppError(404, `No Student found with (${id}) this id`);

    return result;
};

const updateStudentFromDB = async (
    id: string,
    updatedStudentData: Partial<IStudent>,
) => {
    console.log('updated data', updatedStudentData);
    const result = await StudentModel.updateOne({ id }, updatedStudentData);

    return result;
};

const deleteStudentFromDB = async (id: string) => {
    const result = await StudentModel.updateOne({ id }, { isDeleted: true });

    return result;
};

export const StudentServices = {
    getAllStudentsFromDB,
    getSingleStudentFromDB,
    deleteStudentFromDB,
    updateStudentFromDB,
};
