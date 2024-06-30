import { Schema, model } from 'mongoose';
import {
    Guardian,
    LocalGuardian,
    Student,
    UserName,
} from './student.interface';
import { activeStatus, bloodGroups, gender } from './student.constant';
import { capitalizeString } from '../../utils/utilityFunctions';

const userNameSchema = new Schema<UserName>({
    firstName: {
        type: String,
        required: [true, 'first name is required'],
        trim: true,
        maxlength: [20, 'First name can not be more than 20 characters'],
        // custom validator
        validate: {
            validator: function (value: string) {
                const firstNameStr = capitalizeString(value);

                return firstNameStr === value;
            },
            message: '{VALUE} is not in capitalize format',
        },
    },
    middleName: {
        type: String,
        required: [true, 'middle name is required'],
        trim: true,
        maxlength: [20, 'Middle name can not be more than 20 characters'],
    },
    lastName: {
        type: String,
        required: [true, 'last name is required'],
        trim: true,
        maxlength: [20, 'Last name can not be more than 20 characters'],
    },
});

const guardianSchema = new Schema<Guardian>({
    fatherName: {
        type: String,
        required: [true, "Father's Name is required"],
    },
    fatherOccupation: {
        type: String,
        required: [true, "Father's Occupation is required"],
    },
    fatherContactNo: {
        type: String,
        required: [true, "Father's Contact Number is required"],
    },
    motherName: {
        type: String,
        required: [true, "Mother's Name is required"],
    },
    motherContactNo: {
        type: String,
        required: [true, "Mother's Contact Number is required"],
    },
    motherOccupation: {
        type: String,
        required: [true, "Mother's Occupation is required"],
    },
});

const localGuardianSchema = new Schema<LocalGuardian>({
    name: {
        type: String,
        required: [true, "Local Guardian's Name is required"],
    },
    contactNo: {
        type: String,
        required: [true, "Local Guardian's Contact Number is required"],
    },
    occupation: {
        type: String,
        required: [true, "Local Guardian's Occupation is required"],
    },
});

const studentSchema = new Schema<Student>({
    id: {
        type: String,
        required: [true, 'ID is required'],
        unique: true,
    },
    name: {
        type: userNameSchema,
        required: [true, 'Name is required'],
    },
    gender: {
        type: String,
        enum: {
            values: gender,
            message:
                "{VALUE} is not valid. The gender field can only be one of the following: 'male', 'female', 'other'.",
        },
        required: [true, 'Gender is required'],
    },
    dateOfBirth: {
        type: String,
        required: [true, 'Date of Birth is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    contactNo: {
        type: String,
        required: [true, 'Contact Number is required'],
    },
    emergencyContactNo: {
        type: String,
        required: [true, 'Emergency Contact Number is required'],
    },
    bloodGroup: {
        type: String,
        enum: bloodGroups,
    },
    presentAddress: {
        type: String,
        required: [true, 'Present Address is required'],
    },
    permanentAddress: {
        type: String,
        required: [true, 'Permanent Address is required'],
    },
    guardian: {
        type: guardianSchema,
        required: [true, 'Guardian information is required'],
    },
    avatar: {
        type: String,
    },
    isActive: {
        type: String,
        enum: activeStatus,
        default: 'active',
    },
    localGuardian: {
        type: localGuardianSchema,
        required: [true, 'Local Guardian information is required'],
    },
    profileImage: {
        type: String,
    },
});

export const StudentModel = model<Student>('Student', studentSchema);
