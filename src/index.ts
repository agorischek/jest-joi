import * as Joi from "joi";

export * from "./match-schema";
export * from "./demo";

declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchSchema(schema: Joi.Schema, options?: Joi.ValidationOptions): R;
    }
  }
}
