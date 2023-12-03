const statusCodeList = require("./codes")

// function to handle success response with status and code
exports.success = (data, statusCode) => {
  return {
    status: true,
    code: statusCode,
    message: statusCodeList[statusCode],
    data
  };
};

// function to handle error response with status and code
exports.error = (statusCode, serviceCode) => {
  const codes = [200, 201, 400, 401, 404, 403, 422, 500];
  const findCode = codes.find((code) => code == statusCode);

  if (!findCode) statusCode = 500;
  else statusCode = findCode;

  return {
    status: false,
    code: serviceCode,
    message: statusCodeList[serviceCode],
    data: null
  };
};


// function to handle error validation response with status and code
exports.validation = (errors) => {
  return {
    message: "Validation errors",
    status: false,
    code: 422,
    errors
  };
};

