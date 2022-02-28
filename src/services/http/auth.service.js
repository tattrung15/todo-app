import HttpService from "./http.service";

class _AuthService extends HttpService {
  async login(username, password) {
    const response = await this.post("/login", {
      body: {
        username,
        password,
      },
    });

    return response.data;
  }

  async signUp(username, password) {
    const response = await this.post("/signup", {
      body: {
        username,
        password,
      },
    });

    return response.data;
  }

  async validateToken(token) {
    const response = await this.post("/validate", {
      body: {
        jwt: token,
      },
    });

    return response.data;
  }
}

const AuthService = new _AuthService();
export default AuthService;
