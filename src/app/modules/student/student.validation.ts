import { z } from 'zod';
import { capitalizeString } from '../../utils/utilityFunctions';
import { gender } from './student.constant';

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
const genderEnum = z.enum(['male', 'female', 'other'], {
    required_error: 'Gender is required',
    invalid_type_error: 'Gender must be one of "male", "female", or "other"',
});
const bloodGroupsEnum = z.enum([
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-',
]);
const activeStatusEnum = z.enum(['active', 'blocked']);

// Student schema
const studentValidationSchema = z.object({
    id: z.string({
        required_error: 'ID is required',
        invalid_type_error: 'ID must be a string',
    }),
    password: z
        .string({
            required_error: 'Password is required',
            invalid_type_error: 'Password must be a string',
        })
        .max(20, { message: 'Password can not be more thann 20 characters' }),
    name: userNameValidatorSchema,
    gender: genderEnum,
    dateOfBirth: z.string({
        required_error: 'Date of Birth is required',
        invalid_type_error: 'Date of Birth must be a string',
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
    avatar: z.string().optional(),
    isActive: activeStatusEnum.default('active'),
    localGuardian: localGuardianValidatorSchema,
    profileImage: z.string().optional(),
});

export default studentValidationSchema;
