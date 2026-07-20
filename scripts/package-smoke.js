const assert = require("node:assert/strict");
const Joi = require("joi");

const { matchers } = require("../dist");
const context = { isNot: false, promise: "" };

assert.equal(typeof matchers.toMatchSchema, "function");
assert.equal(typeof matchers.toBeSchema, "function");
assert.equal(typeof matchers.toBeSchemaLike, "function");

const valid = matchers.toMatchSchema.call(context, "valid", Joi.string());
assert.equal(valid.pass, true);

const invalid = matchers.toMatchSchema.call(context, 42, Joi.string());
assert.equal(invalid.pass, false);
assert.match(invalid.message(), /must be a string/);
