export const nullSafetyJSONStringify = (obj) => {
  return JSON.stringify(obj, (k, v) => (v === null ? undefined : v));
};

export function isNullOrUndefined(value) {
  return value === null || value === undefined;
}

export function isStrEmpty(value) {
  return isNullOrUndefined(value) || value.trim() === "";
}
