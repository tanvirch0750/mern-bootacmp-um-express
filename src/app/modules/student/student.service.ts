import { IStudent } from './student.interface';
import { StudentModel } from './student.model';

const createStudenIntoDB = async (studentData: IStudent) => {
    //const result = await StudentModel.create(student); // built in stattic method by mongoose

    // built in instance method by mongoose
    const studentInstance = new StudentModel(studentData);

    // with instance method
    if (await studentInstance.isUserExist(studentData.id)) {
        throw new Error('User already exists!');
    }

    // with custom methods
    // if (await StudentModel.isUserExist(studentData.id)) {
    //     throw new Error('User already exists!');
    // }

    const result = await studentInstance.save();

    return result;
};

const getAllStudentsFromDB = async () => {
    const result = await StudentModel.find();

    return result;
};

const getSingleStudentFromDB = async (id: string) => {
    const result = await StudentModel.findOne({ id });

    return result;
};

const updateStudentFromDB = async (
    id: string,
    updatedStudentData: Partial<IStudent>,
) => {
    console.log('updated data', updatedStudentData);
    const result = await StudentModel.updateOne({ id }, updatedStudentData);

    return result;
};

const deleteStudentFromDB = async (id: string) => {
    const result = await StudentModel.updateOne({ id }, { isDeleted: true });

    return result;
};

export const StudentServices = {
    createStudenIntoDB,
    getAllStudentsFromDB,
    getSingleStudentFromDB,
    deleteStudentFromDB,
    updateStudentFromDB,
};
