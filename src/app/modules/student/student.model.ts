import { Schema, model } from 'mongoose';
import {
    Guardian,
    LocalGuardian,
    Student,
    UserName,
} from './student.interface';
import { activeStatus, bloodGroups, gender } from './student.constant';

const userNameSchema = new Schema<UserName>({
    firstName: {
        type: String,
        required: true,
    },
    middleName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
});

const guardianSchema = new Schema<Guardian>({
    fatherName: {
        type: String,
        required: true,
    },
    fatherOccupation: {
        type: String,
        required: true,
    },
    fatherContactNo: {
        type: String,
        required: true,
    },
    motherName: {
        type: String,
        required: true,
    },
    motherContactNo: {
        type: String,
        required: true,
    },
    motherOccupation: {
        type: String,
        required: true,
    },
});

const localGuardian = new Schema<LocalGuardian>({
    name: {
        type: String,
    },
    contactNo: {
        type: String,
    },
    occupation: {
        type: String,
    },
});

const studentSchema = new Schema<Student>({
    id: { type: String },
    name: userNameSchema,
    gender: gender, // enum type
    dateOfBirth: { type: String },
    email: { type: String, required: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: bloodGroups,
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: guardianSchema,
    avatar: { type: String },
    isActive: activeStatus,
    localGuardian: localGuardian,
    profileImage: { type: String },
});

export const StudentModel = model<Student>('Student', studentSchema);
