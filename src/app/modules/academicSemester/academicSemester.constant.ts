import {
    IAcademicSemesterCode,
    IAcademicSemesterName,
    IAcademicSemesterNameCodeMapper,
    IMonths,
} from './academicSemester.interface';

export const Months: IMonths[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

export const AcademicSemesterName: IAcademicSemesterName[] = [
    'Autumn',
    'Summar',
    'Fall',
];

export const AcademicSemesterCode: IAcademicSemesterCode[] = ['01', '02', '03'];

export const academicSemesterNameCodeMapper: IAcademicSemesterNameCodeMapper = {
    Autumn: '01',
    Summar: '02',
    Fall: '03',
};
