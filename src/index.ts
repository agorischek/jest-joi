import * as Joi from "joi";

export * from "./match-schema";

declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchSchema(
        schema: Joi.Schema | unknown,
        options?: Joi.ValidationOptions | unknown
      ): R;
    }
  }
}
