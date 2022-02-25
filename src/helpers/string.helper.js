import { isNullOrUndefined } from "./helpers";

const isString = (value) => {
  return typeof value === "string" || value instanceof String;
};

const isStringEmpty = (value) => {
  return isNullOrUndefined(value) || value.trim() === "";
};

export const StringHelpers = {
  isString,
  isStringEmpty,
};
