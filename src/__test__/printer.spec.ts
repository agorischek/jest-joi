import * as Joi from 'joi'
import { buildMessage } from "../printer";

const schema = Joi.object({ a: Joi.string().required() });

const input = { a: 'b' };
const options = {}
const { error } = schema.validate(input, options);
const matcherHintOptions = {
    isNot: true,
    promise: ""
}

test("Pass message snapshot", () => {
    const message = buildMessage(true, "toMatchSchema", input, schema, error, matcherHintOptions)()
    expect(message).toMatchSnapshot();
})

test("Fail message snapshot", () => {
    const message = buildMessage(false, "toMatchSchema", input, schema, error, matcherHintOptions)()
    expect(message).toMatchSnapshot();
})