import { HydratedDocument, Model } from 'mongoose';

export type Guardian = {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
};

export type UserName = {
    firstName: string;
    middleName: string;
    lastName: string;
};

export type LocalGuardian = {
    name: string;
    occupation: string;
    contactNo: string;
};

export type Gender = 'male' | 'female' | 'other';

export type ActiveStatus = 'active' | 'blocked';

export type BloodGroup =
    | 'A+'
    | 'A-'
    | 'B+'
    | 'B-'
    | 'AB+'
    | 'AB-'
    | 'O+'
    | 'O-';

export type IStudent = {
    id: string;
    password: string;
    name: UserName;
    email: string;
    avatar?: string;
    gender: Gender;
    dateOfBirth: string;
    contactNo: string;
    emergencyContactNo: string;
    bloodGroup?: BloodGroup;
    presentAddress: string;
    permanentAddress: string;
    guardian: Guardian;
    localGuardian: LocalGuardian;
    profileImage?: string;
    isActive: ActiveStatus;
    isDeleted: boolean;
};

// type for custom instance method (put all student instance methods in this interface)
export type IStudentMethods = {
    isUserExist(id: string): Promise<IStudent | null>;
};

// create a new model type that knows abour IStudentMehtods
// export type IStudentModel = Model<IStudent, {}, IStudentMethods>;

// for both instance and static methods
export interface IStudentModel extends Model<IStudent, {}, IStudentMethods> {
    isUserExist(id: string): Promise<IStudent | null>;
}
