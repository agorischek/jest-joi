# Jest Joi

Custom [Matcher](https://jestjs.io/docs/using-matchers) for validating [Joi](https://joi.dev) schemas in [Jest](https://jestjs.io)

[![Version](https://img.shields.io/npm/v/jest-joi)](https://www.npmjs.com/package/jest-joi "Version") [![License](https://img.shields.io/github/license/agorischek/jest-joi)](https://github.com/agorischek/jest-joi/blob/main/LICENSE "License") [![Badges](https://img.shields.io/badge/badges-rolled-white)](https://github.com/agorischek/badge-roll "Badges")

## Usage

```ts
const schema = Joi.object({ a: Joi.string() });
const input = { a: false }

test('Input should match schema', () => {
    expect(input).toMatchSchema(schema);
});

//  FAIL
//  ✕ Input should match schema (5ms)
//    expect(received).toMatchSchema(schema)
//
//    Received:
//    {
//      "a" [1]: false
//    }
//   
//    [1] "a" must be a string
```

## Setup

### 1. Install
```sh
npm i -D jest-joi
```

### 2. Register Matcher
JavaScript:

```js
// jest.setup.js
const toMatchSchema = require("jest-joi"))
expect.extend( toMatchSchema );
```
```js
//jest.config.js
module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
};
```

TypeScript:
```ts
// jest.setup.ts
import { toMatchSchema } from './src';
expect.extend({ toMatchSchema });
```
```ts
//jest.config.ts
module.exports = {
  setupFilesAfterEnv: ['./jest.setup.ts'],
};
```


