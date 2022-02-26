import { AuthActionType } from "./auth.type";

export const storeUser = (user) => {
  return {
    type: AuthActionType.STORE_AUTH,
    payload: { user },
  };
};

export const clearUser = () => {
  return {
    type: AuthActionType.CLEAR_AUTH,
  };
};
