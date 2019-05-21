import { Axios, JWT_TOKEN_LABEL } from "./plugins/axios";
export const AppService = {
  async getUserInfo() {
    if (localStorage.getItem(JWT_TOKEN_LABEL)) {
      return Axios.get("/api/auth");
    } else {
      return {
        data: {
          code: 1,
          message: "forbidden source",
        },
      };
    }
  },
  async login(payload) {
    const res = await Axios.post("/api/auth", payload);
    if (!res.data.code) {
      localStorage.setItem(JWT_TOKEN_LABEL, res.data.body);
    }
    return res;
  },
  logout() {
    localStorage.removeItem(JWT_TOKEN_LABEL);
  },
};
