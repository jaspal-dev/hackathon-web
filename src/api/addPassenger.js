import axios from "./axios";

export const addPassenger = async (data) => {
  return axios.post("v1/passenger", data);
};
