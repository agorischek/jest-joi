import Joi = require("joi");
import { Options } from "./options";
import { Received, Schema } from "./";

export class Result {
  pass: boolean;
  error: Joi.ValidationError;

  constructor(received: Received, schema: Schema, options: Options) {
    this.error = schema.isValid
      ? schema.compiled.validate(received.input, options).error
      : null;
    this.pass = schema.isValid && !this.error;
  }
}
