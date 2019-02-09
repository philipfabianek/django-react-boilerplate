import validator from "validator";

import {
  minLength,
  maxLength,
  isAlphanumeric,
  isString,
} from "../utils/commonValidators";

export const validateUserName = val => isString(val) && isAlphanumeric(val) && val.trim().indexOf(' ') === -1 && minLength(val, 2) && maxLength(val, 30);
export const validateEmail = val => validator.isEmail(val);
export const validatePassword = val => isString(val) && minLength(val, 8) && isString(val) && maxLength(val, 50);

export default {
  username: validateUserName,
  email: validateEmail,
  password: validatePassword,
  confirmPassword: validatePassword,
};
