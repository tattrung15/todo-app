import { Roles } from "./constants/common";
import SignIn from "./pages/sign-in/sign-in.page";

export const routes = [
  {
    path: "/sign-in",
    component: SignIn,
    config: {
      roles: [Roles.GUEST, Roles.USER],
      redirect: "/sign-in",
    },
  },
];