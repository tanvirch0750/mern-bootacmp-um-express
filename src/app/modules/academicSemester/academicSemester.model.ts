import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import AppError from '../../errors/appError';
import {
    AcademicSemesterCode,
    AcademicSemesterName,
    Months,
} from './academicSemester.constant';
import {
    IAcademicSemester,
    IAcademicSemesterModel,
    IAcademidSemesterMethods,
} from './academicSemester.interface';

const acdemicSemesterSchema = new Schema<
    IAcademicSemester,
    IAcademicSemesterModel,
    IAcademidSemesterMethods
>(
    {
        name: {
            type: String,
            required: true,
            enum: AcademicSemesterName,
        },
        year: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
            enum: AcademicSemesterCode,
        },
        startMonth: {
            type: String,
            required: true,
            enum: Months,
        },
        endMonth: {
            type: String,
            required: true,
            enum: Months,
        },
    },
    {
        timestamps: true,
    },
);

acdemicSemesterSchema.pre('save', async function (next) {
    const isSemesterExists = await AcademicSemester.findOne({
        year: this.year,
        name: this.name,
    });

    if (isSemesterExists) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            'Semester is already exists !',
        );
    }
    next();
});

export const AcademicSemester = model<
    IAcademicSemester,
    IAcademicSemesterModel
>('AcademicSemester', acdemicSemesterSchema);

// Name Year
//2030 Autumn => Created
// 2031 Autumn
//2030 Autumn => XXX
//2030 Fall => Created

// Autumn 01
// Summar 02
// Fall 03
