// Use these tests to manually inspect error messages.
// These tests are expected to fail!

import * as Joi from "joi";

test.skip("String schema mismatch", () => {
  const schema = Joi.string();
  const input = 3;
  expect(input).toMatchSchema(schema);
});

test.skip("Object schema mismatch", () => {
  const schema = Joi.object({ a: Joi.string() });
  const input = { a: false };
  expect(input).toMatchSchema(schema);
});
