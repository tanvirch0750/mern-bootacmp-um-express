import { BloodGroup, Gender } from './student.interface';

export const bloodGroups: BloodGroup[] = [
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-',
];
export const gender: Gender[] = ['female', 'male', 'other'] as const;

export const studentSearchableFields = [
    'email',
    'name.firstName',
    'presentAddress',
];
