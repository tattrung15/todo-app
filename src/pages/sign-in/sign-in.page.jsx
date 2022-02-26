import { useNavigate } from "react-router-dom";
import "./sign-in.page.scss";
import AuthService from "../../services/http/auth.service";
import StorageService from "../../services/storage.service";
import { useEffect, useState } from "react";
import { Roles } from "../../constants/common";
import { useDispatch } from "react-redux";
import { clearUser, storeUser } from "../../store/auth/auth.action";

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [accountState, setAccountState] = useState({
    username: "",
    password: "",
    rePassword: "",
  });

  useEffect(() => {
    const token = StorageService.get("access_token") || "";
    AuthService.validateToken(token)
      .then((response) => {
        const result = response.result.data;
        StorageService.set("role", Roles.USER);
        StorageService.set("access_token", result.accessToken);
        dispatch(storeUser(result.user));
        navigate("/");
      })
      .catch(() => {
        StorageService.set("role", Roles.GUEST);
        StorageService.set("access_token", "");
        dispatch(clearUser());
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = () => {
    setError("");

    if (!isLogin) {
      if (accountState.password !== accountState.rePassword) {
        return setError("Re-password does not match password");
      }
    }

    const fn = isLogin
      ? AuthService.login(accountState.username, accountState.password)
      : AuthService.signUp(accountState.username, accountState.password);

    fn.then((response) => {
      const result = response.result.data;
      StorageService.set("role", Roles.USER);
      StorageService.set("access_token", result.accessToken);
      dispatch(storeUser(result.user));
      navigate("/");
    }).catch((e) => {
      const errorMsg = isLogin
        ? "Incorrect username or password"
        : "Username already exists";
      setError(errorMsg);
      StorageService.set("role", Roles.GUEST);
      StorageService.set("access_token", "");
      dispatch(clearUser());
    });
  };

  const handleInputChange = (event) => {
    setAccountState(
      Object.assign(accountState, { [event.target.name]: event.target.value })
    );
  };

  const handleChangeStatus = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form>
          <h3>{isLogin ? "Log In" : "Sign Up"}</h3>
          <div className="form-group mb-3">
            <label className="mb-2">Username</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              name="username"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group mb-3">
            <label className="mb-2">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              name="password"
              onChange={handleInputChange}
            />
          </div>
          {!isLogin && (
            <div className="form-group mb-3">
              <label className="mb-2">Re-Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                name="rePassword"
                onChange={handleInputChange}
              />
            </div>
          )}
          {error && <p className="text-danger">{error}</p>}
          <div className="text-center">
            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={handleSubmit}
            >
              {isLogin ? "Log In" : "Sign Up"}
            </button>
          </div>
        </form>
        <p
          className="d-flex justify-content-end text-decoration-underline text-primary btn-logout"
          onClick={handleChangeStatus}
        >
          {isLogin ? "Sign Up" : "Log In"}
        </p>
      </div>
    </div>
  );
}

export default SignIn;
