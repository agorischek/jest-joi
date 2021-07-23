import * as Joi from 'joi';

export const processOptions = (submittedOptions: Joi.ValidationOptions): Joi.ValidationOptions => {
    const options = submittedOptions === undefined ? {} : submittedOptions;
    const abortEarlyIsSet = Object.prototype.hasOwnProperty.call(options, "abortEarly");
    if (!abortEarlyIsSet) options.abortEarly = false;
    return options;
};
