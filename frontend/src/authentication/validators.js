import validator from "validator";

const alphanumericRegex = /^[0-9a-zA-Z]+$/;

const minLength = (val, minLength) => val.length >= minLength;
const maxLength = (val, maxLength) => val.length <= maxLength;
const isAlphanumeric = val => alphanumericRegex.test(val);
const isString = val => typeof val === "string";

export const validateUserName = val => isString(val) && isAlphanumeric(val) && minLength(val, 2) && maxLength(val, 30);
export const validateEmail = val => validator.isEmail(val);
export const validatePassword = val => isString(val) && minLength(val, 8) && isString(val) && maxLength(val, 50);

export default {
  username: validateUserName,
  email: validateEmail,
  password: validatePassword,
  confirmPassword: validatePassword,
};
