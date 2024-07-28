import axios from "./axios";

export const signUp = async (data) => {
  return axios.post("v1/auth/sign-up", data);
};
