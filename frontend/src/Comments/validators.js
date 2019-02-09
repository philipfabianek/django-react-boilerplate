import { minLength, isString } from "../utils/commonValidators";

export const validateText = val => isString(val) && minLength(val, 5);

export default {
  text: validateText,
};
