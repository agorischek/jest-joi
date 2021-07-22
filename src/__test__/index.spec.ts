import * as Joi from 'joi';

const schema = Joi.object({ string: Joi.string().required() });

const input = { string: 3 };

test('The schema matches', () => {
  expect(input).toMatchSchema(schema);
});
