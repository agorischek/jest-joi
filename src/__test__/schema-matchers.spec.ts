import * as Joi from "joi";
test("Valid schema should pass assertion", () => {
  expect(Joi.string()).toBeSchema();
});
