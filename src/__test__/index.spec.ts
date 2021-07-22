import * as Joi from 'joi';

const schema = Joi.object({ thing: Joi.string().required() });

const input = { thing: 3 };

test('The schema matches', () => {
  expect(input).toMatchSchema(schema);
});
test('Duh', () => {
  expect(3).toBeFalsy();
});
