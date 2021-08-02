<!-- markdownlint-disable-next-line MD033 MD041 -->
<img src="img/logo.png" height="130px" />

# Jest Joi

`expect(value).toMatchSchema(schema);`

[Matchers](https://jestjs.io/docs/using-matchers) for validating values against
[Joi](https://joi.dev) schemas in [Jest](https://jestjs.io) tests, with awesome
error messages and [TypeScript](https://www.typescriptlang.org) support

[![Version](https://img.shields.io/npm/v/jest-joi)](https://www.npmjs.com/package/jest-joi "Version")
[![RunKit](https://img.shields.io/badge/try%20on-runkit-%23e83e8c)](https://npm.runkit.com/jest-joi "RunKit")
[![Workflow](https://img.shields.io/github/workflow/status/agorischek/jest-joi/CI)](https://github.com/agorischek/jest-joi/actions/workflows/ci.yml "Workflow")
[![Coverage](https://img.shields.io/codecov/c/github/agorischek/jest-joi)](https://codecov.io/gh/agorischek/jest-joi "Coverage")
[![License](https://img.shields.io/github/license/agorischek/jest-joi)](https://github.com/agorischek/jest-joi/blob/main/LICENSE "License")
[![Badges](https://img.shields.io/badge/badges-rolled-white)](https://github.com/agorischek/badge-roll "Badges")

For a quick demo, head over to [RunKit](https://npm.runkit.com/jest-joi)!

## Setup

```sh
npm i -D jest-joi
```

### TypeScript

(e.g. via [ts-jest](https://www.npmjs.com/package/ts-jest))

```ts
// jest.setup.ts
// Note: Make sure this is within the scope of your TypeScript config!
import { matchers } from "jest-joi";
expect.extend(matchers);
```

```js
// jest.config.ts
export default {
  setupFilesAfterEnv: ["./jest.setup.ts"],
};
```

### JavaScript

```js
// jest.setup.js
const jestJoi = require("jest-joi");
expect.extend(jestJoi.matchers);
```

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

Just call the `.toMatchSchema()` matcher with the
[Joi schema](https://joi.dev/api/) to validate the value against:

```js
expect(value).toMatchSchema(schema);
```

[Options](https://joi.dev/api/#anyvalidatevalue-options) may be passed as an
optional second parameter:

```js
expect(value).toMatchSchema(schema, options);
```

When the value doesn't match the schema, Jest Joi will provide detailed error
messages:

```js
// Simple mismatches describe the error:

test("Value should match schema", () => {
  const schema = Joi.string();
  const value = 3;
  expect(value).toMatchSchema(schema);
});

// [FAIL]  src/schema.spec.ts
//  ✕ Value should match schema
//
//    expect(received).toMatchSchema(schema)
//
//    Received: 3
//    Expected: Received must be a string
```

```ts
// Complex mismatches annotate the value:

test("Value should match schema", () => {
  const schema = Joi.object({
    a: Joi.string(),
  });
  const value = {
    a: false,
  };
  expect(value).toMatchSchema(schema);
});

// [FAIL]  src/schema.spec.ts
//  ✕ Value should match schema
//
//    expect(received).toMatchSchema(schema)
//
//    Received:
//    {
//      "a" [1]: false
//    }
//
//    [1] "a" must be a string
```

```ts
// Negated matches display the schema:

test("Value should not match schema", () => {
  const schema = Joi.string();
  const value = "a";
  expect(value).not.toMatchSchema(schema);
});

// [FAIL]  src/schema.spec.ts
//  ✕ Value should not match schema
//
//    expect(received).not.toMatchSchema(schema)
//
//    Received: "a"
//
//    Schema:
//    { type: "string" }
```

```ts
// Options can be passed as a second argument:

test("Value should match schema with options", () => {
  const schema = Joi.object({});
  const value = {
    b: true,
  };
  const options = {
    allowUnknown: false,
  };
  expect(value).toMatchSchema(schema, options);
});

// FAIL  src/schema.spec.ts
//  ✕ Value should match schema with options (7ms)
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

## Matchers

Jest Joi includes matchers both for validating values against a schema, and for
validating schemas themselves.

### `toMatchSchema()`

Pass a value to `expect()` to validate against the `schema`. The `schema` may be
either a Joi schema object or a schema literal (which will be compiled using
[`Joi.compile()`](https://joi.dev/api/?v=17.4.1#compileschema-options)).

```js
expect(value).toMatchSchema(schema, options?);
```

### `toBeSchema()`

Pass a value to `expect()` to validate whether it's a Joi schema.

```js
expect(schema).toBeSchema();
```

### `toBeSchemaLike()`

Pass a value to `expect()` to validate whether it's a Joi schema or a schema
literal (a value that can be compiled using
[`Joi.compile()`](https://joi.dev/api/?v=17.4.1#compileschema-options)).

```js
expect(schema).toBeSchemaLike();
```
