import { Roles } from "./constants/common";
import SignIn from "./pages/sign-in/sign-in.page";
import TodoList from "./pages/todo-list/todo-list.page";

export const routes = [
  {
    path: "/",
    component: TodoList,
    config: {
      roles: [Roles.USER],
      redirect: "/sign-in",
    },
  },
  {
    path: "/sign-in",
    component: SignIn,
    config: {
      roles: [Roles.GUEST, Roles.USER],
      redirect: "/sign-in",
    },
  },
];
