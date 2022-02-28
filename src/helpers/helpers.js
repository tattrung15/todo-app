import { FILTER, SORT, TODO_STATUS } from "../constants/common";

export const nullSafetyJSONStringify = (obj) => {
  return JSON.stringify(obj, (k, v) => (v === null ? undefined : v));
};

export function isNullOrUndefined(value) {
  return value === null || value === undefined;
}

export function isStrEmpty(value) {
  return isNullOrUndefined(value) || value.trim() === "";
}

export function generateTodoParams(filter, sort, sortByCreatedAt) {
  const params = {};

  switch (filter) {
    case FILTER.COMPLETED:
      params.equal = {
        status: TODO_STATUS.DONE,
      };
      break;
    case FILTER.ACTIVE:
      params.equal = {
        status: TODO_STATUS.UN_DONE,
      };
      break;
    case FILTER.HAS_DUE_DATE:
      params.dueDate = true;
      break;
    default:
      params.equal = {};
  }

  switch (sort) {
    case SORT.CREATED_AT_ASC:
      params.sort = {
        createdAt: "asc",
      };
      break;
    case SORT.CREATED_AT_DESC:
      params.sort = {
        createdAt: "desc",
      };
      break;
    case SORT.DUE_DATE_ASC:
      params.sort = {
        dueDate: "asc",
      };
      break;
    default:
      params.sort = {};
  }

  switch (sortByCreatedAt) {
    case SORT.CREATED_AT_ASC:
      params.sort = {
        ...params.sort,
        createdAt: "asc",
      };
      break;
    case SORT.CREATED_AT_DESC:
      params.sort = {
        ...params.sort,
        createdAt: "desc",
      };
      break;
    default:
  }

  return params;
}
