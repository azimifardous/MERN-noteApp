import Joi from "joi-browser";

const validate = (data, schema) => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, schema, options);

    if (!error) return null;

    const errors = {};

    for (let item of error.details) {
        errors[item.path[0]] = item.message;
    }

    return errors;
};

const validateProperty = (input, schema) => {
    const { name, value } = input;
    const obj = { [name]: value };
    const newSchema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, newSchema);
    return error ? error.details[0].message : null;
};

export { validate, validateProperty };