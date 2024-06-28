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
    address: string;
};

export type LocalGuardian = {
    name: string;
    occupation: string;
    contactNo: string;
};

export type Gender = 'male' | 'female';

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

export type Student = {
    id: string;
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
};
