import HttpService from "./http.service";

class AuthService extends HttpService {
  async login(username, password) {
    try {
      const response = await this.post("/auth/login", {
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
}

export default new AuthService();
