const Validator = require("validatorjs");

const validator = async (body, rules, customMessages, callback) => {
  const validation = new Validator(body, rules, customMessages);

  validation.passes(() => callback(null, true));

  validation.fails(() => callback(validation.errors, false));
};

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/;

// Tighten password policy
Validator.register(
  "strict",
  (value) => passwordRegex.test(value),
  "password must contain at least one uppercase letter, one lowercase letter and one number"
);

const handleResponse = async (status, req, res, next, err) => {
  if (!status) {
    res.status(412).send({
      success: false,
      message: "The given data was invalid",
      data: err?.errors || null,
    });
  } else {
    next();
  }
};

const payloadValidator = async (req, res, next, rules) => {
  await validator(req.body, rules, {}, (err, status) => {
    handleResponse(status, req, res, next, err);
  }).catch((err) => console.log(err));
};

module.exports = {
  validate: validator,
  handleResponse: handleResponse,
  payloadValidator: payloadValidator,
};
