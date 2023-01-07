const errorMap = {
  NUMBER_MIN: 422,
  INPUT_REQUIRED: 400,
  INPUT_INVALID: 400,
  INPUT_ALREADY_EXIST: 409,
  NOT_FOUND: 404,
  STRING_MIN: 422,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  mapError,
};