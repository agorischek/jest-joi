import * as Joi from "joi";

export class Options implements Joi.ValidationOptions {
  constructor(optionsInput: Joi.ValidationOptions) {
    const options = optionsInput === undefined ? {} : optionsInput;
    const abortEarlyIsSet = Object.prototype.hasOwnProperty.call(
      options,
      "abortEarly"
    );
    if (!abortEarlyIsSet) options.abortEarly = false;
    return options;
  }
}
