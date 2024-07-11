import AppError, { IGenereicErrorMessage } from '../appError';

import httpStatus from 'http-status';
import mongoose, { CastError } from 'mongoose';
import { ZodError, ZodIssue } from 'zod';

export const handleCastErrorDB = (err: CastError) => {
    const errorObj = [
        {
            path: err.path,
            message: `Nothing found with this ${err.value} id`,
        },
    ];
    const message = `Invalid Id`;
    return new AppError(httpStatus.NOT_FOUND, message, errorObj);
};

export const handleDuplicateFieldsErrorDB = (err: any) => {
    const path = Object?.keys(err?.keyValue)[0];
    const value = Object?.values(err?.keyValue)[0];
    const errorObj = [
        {
            path: path,
            message: `Duplicate field ${path}, value: ${value}`,
        },
    ];
    const message = `Duplicate ${path}`;
    return new AppError(400, message, errorObj);
};

export const handleValidationErrorDB = (
    err: mongoose.Error.ValidationError,
) => {
    const errorsObj: IGenereicErrorMessage[] = Object.values(err.errors).map(
        (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
            return {
                path: el.path,
                message: el.message,
            };
        },
    );

    const message = `Validation Error`;
    return new AppError(400, message, errorsObj);
};

export const handleZodError = (error: ZodError) => {
    const errorsObj: IGenereicErrorMessage[] = error.issues.map(
        (issue: ZodIssue) => {
            return {
                path: issue?.path[issue.path.length - 1],
                message: issue?.message,
            };
        },
    );

    const message = `Validation Error`;
    const ob = new AppError(400, message, errorsObj);
    return ob;
};

export const handleBadValueError = () => {
    const message = `Invalid value or api url`;
    return new AppError(400, message);
};
