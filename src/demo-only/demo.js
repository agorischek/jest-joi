const expect = require(".");
const Joi = require("joi");

expect({ a: "hello" }).toMatchSchema({ a: Joi.string().required() });
