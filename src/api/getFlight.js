import axios from "./axios";

export const getFlight = async () => {
  return axios.get("v1/flight");
};
