import axios from "./axios";

export const addFlight = async (data) => {
  return axios.post("v1/flight", data);
};
