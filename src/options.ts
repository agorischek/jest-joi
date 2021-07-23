import * as Joi from 'joi';

export const processOptions = function (submittedOptions: Joi.ValidationOptions): Joi.ValidationOptions {
    const options = submittedOptions === undefined ? {} : submittedOptions;
    if (!options.hasOwnProperty('abortEarly')) options.abortEarly = false;
    return options;
};