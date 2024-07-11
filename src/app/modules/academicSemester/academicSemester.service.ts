import AppError from '../../errors/appError';
import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';

import httpStatus from 'http-status';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: IAcademicSemester) => {
    // semester name --> semester code
    // academicSemesterNameCodeMapper['Fall']
    if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new AppError(httpStatus.NOT_FOUND, 'Invalid Semester Code');
    }

    const result = await AcademicSemester.create(payload);
    return result;
};

const getAllAcademicSemestersFromDB = async () => {
    const result = await AcademicSemester.find();
    return result;
};

const getSingleAcademicSemesterFromDB = async (id: string) => {
    const result = await AcademicSemester.findById(id);

    if (!result)
        throw new AppError(
            404,
            `No academic semester found with (${id}) this id`,
        );

    return result;
};

const updateAcademicSemesterIntoDB = async (
    id: string,
    payload: Partial<IAcademicSemester>,
) => {
    if (
        payload.name &&
        payload.code &&
        academicSemesterNameCodeMapper[payload.name] !== payload.code
    ) {
        throw new AppError(httpStatus.NOT_FOUND, 'Invalid Semester Code');
    }

    const result = await AcademicSemester.findOneAndUpdate(
        { _id: id },
        payload,
        {
            new: true,
        },
    );
    return result;
};

export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB,
    getAllAcademicSemestersFromDB,
    getSingleAcademicSemesterFromDB,
    updateAcademicSemesterIntoDB,
};
