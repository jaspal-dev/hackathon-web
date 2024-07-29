import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("authorization");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (
      error.response.status === 401 &&
      error?.response?.config?.url !== "v1/auth/login"
    ) {
      localStorage.removeItem("authorization");
      localStorage.removeItem("user");
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
