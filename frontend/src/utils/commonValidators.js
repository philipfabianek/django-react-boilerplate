const alphanumericRegex = /^[0-9a-zA-Z]+$/;

export const minLength = (val, minLength) => val.length >= minLength;
export const maxLength = (val, maxLength) => val.length <= maxLength;
export const isAlphanumeric = val => alphanumericRegex.test(val.replace(/ /g,''));
export const isString = val => typeof val === "string";
