import axios from "./axios";

export const OTPRequest = async (data) => {
  return axios.post("v1/otp-verification/send-otp", data);
};
