import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { IUser } from './user.interface';

import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, studentData: IStudent) => {
    // create a user object
    const userData: Partial<IUser> = {};

    //if password is not given , use deafult password
    userData.password = password || (config.default_password as string);

    //set student role
    userData.role = 'student';

    // find academic semester info
    const admissionSemester = await AcademicSemester.findById(
        studentData.admissionSemester,
    );

    //set  generated id
    userData.id = await generateStudentId(admissionSemester!);

    // create a user
    const newUser = await User.create(userData);

    //create a student
    if (Object.keys(newUser).length) {
        // set id , _id as user
        studentData.id = newUser.id; // embedded id
        studentData.user = newUser._id; //reference _id

        const newStudent = await StudentModel.create(studentData);
        return newStudent;
    }
};

export const UserServices = {
    createStudentIntoDB,
};
