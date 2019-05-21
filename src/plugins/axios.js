import _Axios from "axios";
export const JWT_TOKEN_LABEL = "JWT_TOKEN";

export const Axios = _Axios.create({
  baseURL: "https://easy-mock.com/mock/5cd6b5fbcdc204432315e705",
});

Axios.interceptors.request.use(config => {
  const token = localStorage.getItem(JWT_TOKEN_LABEL);
  if (token) {
    config.headers["Authorization"] = token;
  }
  return config;
});
