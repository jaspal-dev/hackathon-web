import axios from "./axios";

export const OTPVerify = async (data) => {
  return axios.post("v1/otp-verification/verify-otp", data);
};
