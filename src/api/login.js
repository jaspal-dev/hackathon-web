import axios from "./axios";

export const login = async (data) => {
  return axios.post("v1/auth/login", data);
};
