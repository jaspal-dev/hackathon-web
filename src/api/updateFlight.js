import axios from "./axios";

export const updateFlight = async (data) => {
  return axios.patch("v1/flight", data);
};
