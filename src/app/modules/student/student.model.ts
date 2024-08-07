import { Schema, model } from 'mongoose';
import { capitalizeString } from '../../utils/utilityFunctions';
import { bloodGroups, gender } from './student.constant';
import {
    Guardian,
    IStudent,
    IStudentMethods,
    IStudentModel,
    LocalGuardian,
    UserName,
} from './student.interface';

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

const studentSchema = new Schema<IStudent, IStudentModel, IStudentMethods>(
    {
        id: {
            type: String,
            required: [true, 'ID is required'],
            unique: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            required: [true, 'User id is required'],
            unique: true,
            ref: 'User',
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
            type: Date,
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
        localGuardian: {
            type: localGuardianSchema,
            required: [true, 'Local Guardian information is required'],
        },
        profileImage: {
            type: String,
        },
        admissionSemester: {
            type: Schema.Types.ObjectId,
            ref: 'AcademicSemester',
        },
        academicDepartment: {
            type: Schema.Types.ObjectId,
            ref: 'AcademicDepartment',
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        timestamps: true,
    },
);

// query middleware - to remove that is isDeleted true
studentSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });

    next();
});
studentSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });

    next();
});
// aggregate middleware - to remove that is isDeleted true- if used aggreagate instead of findOne
studentSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});

// createing a custom instance method
studentSchema.methods.isUserExist = async function (id: string) {
    const existingUser = await StudentModel.findOne({ id });
    return existingUser;
};

// static method
studentSchema.statics.isUserExist = async function (id: string) {
    const existingUser = await StudentModel.findOne({ id });
    return existingUser;
};

// virtual
studentSchema.virtual('fullName').get(function () {
    return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

export const StudentModel = model<IStudent, IStudentModel>(
    'Student',
    studentSchema,
);
