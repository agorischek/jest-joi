import * as Joi from "joi";

export class Options implements Joi.ValidationOptions {
  constructor(submittedOptions: Joi.ValidationOptions) {
    const options = submittedOptions === undefined ? {} : submittedOptions;
    const abortEarlyIsSet = Object.prototype.hasOwnProperty.call(
      options,
      "abortEarly"
    );
    if (!abortEarlyIsSet) options.abortEarly = false;
    return options;
  }
}
