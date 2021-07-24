<!-- markdownlint-disable-next-line MD033 MD041 -->
<img src="img/logo.png" height="130px" />

# Jest Joi

[Matcher](https://jestjs.io/docs/using-matchers) for validating input against
[Joi](https://joi.dev) schemas in [Jest](https://jestjs.io) tests, with awesome
error messages and [TypeScript](https://www.typescriptlang.org) support

[![Version](https://img.shields.io/npm/v/jest-joi)](https://www.npmjs.com/package/jest-joi "Version")
[![License](https://img.shields.io/github/license/agorischek/jest-joi)](https://github.com/agorischek/jest-joi/blob/main/LICENSE "License")
[![Badges](https://img.shields.io/badge/badges-rolled-white)](https://github.com/agorischek/badge-roll "Badges")

## Setup

First, install:

```sh
npm i -D jest-joi
```

Then, extend:

```js
// jest.setup.js
const jestJoi = require("jest-joi");
expect.extend(jestJoi);
```

Finally, register:

```js
// jest.config.js
module.exports = {
  setupFilesAfterEnv: ["./jest.setup.js"],
};
```

For more configuration options, see the
[Jest configuration docs](https://jestjs.io/docs/configuration), especially the
[`setupFilesAfterEnv`](https://jestjs.io/docs/configuration#setupfilesafterenv-array)
property.

## Usage

Just call the `.toMatchSchema()` matcher with the Joi schema to validate the
input against:

```js
expect(input).toMatchSchema(schema);
```

Options may be passed as an optional second parameter:

```js
expect(input).toMatchSchema(schema, options);
```

When the input doesn't match the schema, Jest Joi will provide detailed error
messages:

```js
// Simple mismatches describe the error:

test("Input should match schema", () => {
  const schema = Joi.string();
  const input = 3;
  expect(input).toMatchSchema(schema);
});

// [FAIL]  src/schema.spec.ts
//  ✕ Input should match schema
//
//    expect(received).toMatchSchema(schema)
//
//    Received: 3
//    Expected: Received must be a string
```

```ts
// Complex mismatches annotate the input:

test("Input should match schema", () => {
  const schema = Joi.object({
    a: Joi.string(),
  });
  const input = {
    a: false,
  };
  expect(input).toMatchSchema(schema);
});

// [FAIL]  src/schema.spec.ts
//  ✕ Input should match schema
//
//    expect(received).toMatchSchema(schema)
//
//    Received:
//    {
//      "a" [1]: false
//    }
//    [1] "a" must be a string
```

```ts
// Negated matches display the schema:

test("Input should not match schema", () => {
  const schema = Joi.string();
  const input = "a";
  expect(input).not.toMatchSchema(schema);
});

// [FAIL]  src/schema.spec.ts
//  ✕ Input should not match schema
//
//    expect(received).not.toMatchSchema(schema)
//
//    Schema:
//    {
//      type: "string"
//    }
//    Received:
//    "a"
```

```ts
// Options can be passed as a second argument:

test("Input should match schema with options", () => {
  const schema = Joi.object({});
  const input = {
    b: true,
  };
  const options = {
    allowUnknown: false,
  };
  expect(input).toMatchSchema(schema, options);
});

// FAIL  src/schema.spec.ts
//  ✕ Input should match schema with options (7ms)
//
//    expect(received).toMatchSchema(schema)
//
//    Received:
//    {
//      "b" [1]: true
//    }
//
//    [1] "b" is not allowed
```
