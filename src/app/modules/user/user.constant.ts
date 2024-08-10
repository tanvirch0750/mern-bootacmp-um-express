import { IRole, IStatus } from './user.interface';

export const userRoles: IRole[] = ['admin', 'faculty', 'student'];
export const userStatus: IStatus[] = ['blocked', 'in-progress'];

export const USER_ROLE = {
    student: 'student',
    faculty: 'faculty',
    admin: 'admin',
} as const;
