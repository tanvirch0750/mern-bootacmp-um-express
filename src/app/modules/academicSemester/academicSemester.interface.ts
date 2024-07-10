import { Model } from 'mongoose';

export type IMonths =
    | 'January'
    | 'February'
    | 'March'
    | 'April'
    | 'May'
    | 'June'
    | 'July'
    | 'August'
    | 'September'
    | 'October'
    | 'November'
    | 'December';

export type IAcademicSemesterName = 'Autumn' | 'Summar' | 'Fall';
export type IAcademicSemesterCode = '01' | '02' | '03';

export type IAcademicSemester = {
    name: IAcademicSemesterName;
    code: IAcademicSemesterCode;
    year: string;
    startMonth: IMonths;
    endMonth: IMonths;
};

export type IAcademicSemesterNameCodeMapper = {
    [key: string]: string;
};

// Define the type for custom instance methods
export type IAcademidSemesterMethods = {
    // Example of an instance method returning a promise with a string
    anyInstanceMethod(): Promise<string>;
};

// Define the type for the user model, including both instance and static methods
export interface IAcademicSemesterModel
    extends Model<
        IAcademicSemester,
        Record<string, never>,
        IAcademidSemesterMethods
    > {
    // Example of a static method returning a promise with a string
    anyInstaceMethod(): Promise<string>;
}
