import HttpService from "./http.service";

class _AuthService extends HttpService {
  async login(username, password) {
    try {
      const response = await this.post("/login", {
        body: {
          username,
          password,
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async signUp(username, password) {
    try {
      const response = await this.post("/signup", {
        body: {
          username,
          password,
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async validateToken(token) {
    try {
      const response = await this.post("/validate", {
        body: {
          jwt: token,
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

const AuthService = new _AuthService();
export default AuthService;
