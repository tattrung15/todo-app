import { combineReducers, createStore } from "redux";
import authReducer from "./auth/auth.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = createStore(rootReducer);

export default store;
