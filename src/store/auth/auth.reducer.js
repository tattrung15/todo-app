import { Roles } from "../../constants/common";
import { AuthActionType } from "./auth.type";

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AuthActionType.STORE_AUTH:
      return {
        ...state,
        id: action.payload?.user?.id,
        username: action.payload?.user?.username,
        role: Roles.USER,
      };
    case AuthActionType.CLEAR_AUTH:
      return initialState;
    default:
      return state;
  }
}

const initialState = {
  id: 0,
  username: "",
  role: Roles.GUEST,
};
