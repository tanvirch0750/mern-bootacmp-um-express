import { z } from 'zod';

const userRoleEnum = z.enum(['admin', 'faculty', 'student'], {
    required_error: 'User role is required',
    invalid_type_error:
        'User role must be one of "admin", "faculty", or "student"',
});

const userStausEnum = z
    .enum(['blocked', 'in-progress'], {
        required_error: 'User role is required',
        invalid_type_error:
            'User role must be one of "blocked" or "in-progress"',
    })
    .default('in-progress');

const userValidationSchema = z.object({
    password: z
        .string({
            invalid_type_error: 'Password must be string',
        })
        .max(20, { message: 'Password can not be more than 20 characters' })
        .optional(),
});

export const UserValidation = {
    userValidationSchema,
};
