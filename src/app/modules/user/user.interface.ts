import { Model } from 'mongoose';

export type IRole = 'admin' | 'student' | 'faculty';
export type IStatus = 'in-progress' | 'blocked';

export type IUser = {
    id: string;
    password: string;
    needsPasswordChange: boolean;
    passwordChangedAt?: Date;
    role: IRole;
    status: IStatus;
    isDeleted: boolean;
};

// Define the type for custom instance methods
export type IUserMethods = {
    // Example of an instance method returning a promise with a string
    anyInstanceMethod(): Promise<string>;
};

// Define the type for the user model, including both instance and static methods
export interface IUserModel
    extends Model<IUser, Record<string, never>, IUserMethods> {
    //static methods for checking if the user exist
    isUserExistsByCustomId(id: string): Promise<IUser>;
    //static methods for checking if passwords are matched
    isPasswordMatched(
        plainTextPassword: string,
        hashedPassword: string,
    ): Promise<boolean>;
    isJWTIssuedBeforePasswordChanged(
        passwordChangedTimestamp: Date,
        jwtIssuedTimestamp: number,
    ): boolean;
}
