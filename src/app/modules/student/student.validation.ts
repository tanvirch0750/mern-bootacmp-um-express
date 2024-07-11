import { z } from 'zod';
import { capitalizeString } from '../../utils/utilityFunctions';
import { bloodGroups, gender } from './student.constant';

// UserName schema
const userNameValidatorSchema = z.object({
    firstName: z
        .string({
            required_error: 'First name is required',
            invalid_type_error: 'First name must be a string',
        })
        .max(20, { message: 'First name can not be more than 20 characters' })
        .transform((val) => val.trim())
        .refine((val) => capitalizeString(val) === val, {
            message: 'First name is not in capitalize format',
        }),
    middleName: z
        .string({
            required_error: 'Middle name is required',
            invalid_type_error: 'Middle name must be a string',
        })
        .max(20, { message: 'Middle name can not be more than 20 characters' })
        .transform((val) => val.trim()),
    lastName: z
        .string({
            required_error: 'Last name is required',
            invalid_type_error: 'Last name must be a string',
        })
        .max(20, { message: 'Last name can not be more than 20 characters' })
        .transform((val) => val.trim()),
});

// Guardian schema
const guardianValidatorSchema = z.object({
    fatherName: z.string({
        required_error: "Father's Name is required",
        invalid_type_error: "Father's Name must be a string",
    }),
    fatherOccupation: z.string({
        required_error: "Father's Occupation is required",
        invalid_type_error: "Father's Occupation must be a string",
    }),
    fatherContactNo: z.string({
        required_error: "Father's Contact Number is required",
        invalid_type_error: "Father's Contact Number must be a string",
    }),
    motherName: z.string({
        required_error: "Mother's Name is required",
        invalid_type_error: "Mother's Name must be a string",
    }),
    motherContactNo: z.string({
        required_error: "Mother's Contact Number is required",
        invalid_type_error: "Mother's Contact Number must be a string",
    }),
    motherOccupation: z.string({
        required_error: "Mother's Occupation is required",
        invalid_type_error: "Mother's Occupation must be a string",
    }),
});

// LocalGuardian schema
const localGuardianValidatorSchema = z.object({
    name: z.string({
        required_error: "Local Guardian's Name is required",
        invalid_type_error: "Local Guardian's Name must be a string",
    }),
    contactNo: z.string({
        required_error: "Local Guardian's Contact Number is required",
        invalid_type_error: "Local Guardian's Contact Number must be a string",
    }),
    occupation: z.string({
        required_error: "Local Guardian's Occupation is required",
        invalid_type_error: "Local Guardian's Occupation must be a string",
    }),
});

// Enum values
const genderEnum = z.enum([...gender] as [string, ...string[]], {
    required_error: 'Gender is required',
    invalid_type_error: 'Gender must be one of "male", "female", or "other"',
});
const bloodGroupsEnum = z.enum([...bloodGroups] as [string, ...string[]]);

// Student schema
const createStudentValidationSchema = z.object({
    body: z.object({
        password: z
            .string({
                required_error: 'Password is required',
                invalid_type_error: 'Password must be a string',
            })
            .max(20, {
                message: 'Password lenghth can not be more than 20 characters',
            }),
        student: z.object({
            name: userNameValidatorSchema,
            gender: genderEnum,
            dateOfBirth: z.date({
                required_error: 'Date of Birth is required',
                invalid_type_error: 'Date of Birth must be a date format',
            }),
            email: z
                .string({
                    required_error: 'Email is required',
                    invalid_type_error: 'Email must be a string',
                })
                .email({ message: 'Invalid email address' }),
            contactNo: z.string({
                required_error: 'Contact Number is required',
                invalid_type_error: 'Contact Number must be a string',
            }),
            emergencyContactNo: z.string({
                required_error: 'Emergency Contact Number is required',
                invalid_type_error: 'Emergency Contact Number must be a string',
            }),
            bloodGroup: bloodGroupsEnum.optional(),
            presentAddress: z.string({
                required_error: 'Present Address is required',
                invalid_type_error: 'Present Address must be a string',
            }),
            permanentAddress: z.string({
                required_error: 'Permanent Address is required',
                invalid_type_error: 'Permanent Address must be a string',
            }),
            guardian: guardianValidatorSchema,

            localGuardian: localGuardianValidatorSchema,
            profileImage: z.string().optional(),
            admissionSemester: z.string(),
            academicDepartment: z.string(),
        }),
    }),
});

const updateUserNameValidationSchema = z.object({
    firstName: z.string().min(1).max(20).optional(),
    middleName: z.string().optional(),
    lastName: z.string().optional(),
});

const updateGuardianValidationSchema = z.object({
    fatherName: z.string().optional(),
    fatherOccupation: z.string().optional(),
    fatherContactNo: z.string().optional(),
    motherName: z.string().optional(),
    motherOccupation: z.string().optional(),
    motherContactNo: z.string().optional(),
});

const updateLocalGuardianValidationSchema = z.object({
    name: z.string().optional(),
    occupation: z.string().optional(),
    contactNo: z.string().optional(),
    address: z.string().optional(),
});

export const updateStudentValidationSchema = z.object({
    body: z.object({
        student: z.object({
            name: updateUserNameValidationSchema,
            gender: z.enum(['male', 'female', 'other']).optional(),
            dateOfBirth: z.string().optional(),
            email: z.string().email().optional(),
            contactNo: z.string().optional(),
            emergencyContactNo: z.string().optional(),
            bloogGroup: z
                .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
                .optional(),
            presentAddress: z.string().optional(),
            permanentAddress: z.string().optional(),
            guardian: updateGuardianValidationSchema.optional(),
            localGuardian: updateLocalGuardianValidationSchema.optional(),
            admissionSemester: z.string().optional(),
            profileImg: z.string().optional(),
            academicDepartment: z.string().optional(),
        }),
    }),
});

export const studentValidations = {
    createStudentValidationSchema,
    updateStudentValidationSchema,
};
