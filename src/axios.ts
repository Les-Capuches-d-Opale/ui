import axios from "axios";
import Routes from "./sdk/routes";

const request = axios.create({
  baseURL: "https://les-capuches-d-opale.herokuapp.com/",
  withCredentials: true,
});

request.interceptors.request.use(
  (config) => {
    const userData = localStorage.getItem("USER");
    if (userData) {
      const { token } = JSON.parse(userData);
      if (token && token !== "" && config && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    // eslint-disable-next-line no-console
    console.error("axios interceptors error : ", error);
    return error;
  }
);

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // eslint-disable-next-line no-console
    console.error(error.response);

    if (
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      // when token expired, redirect to login page
      localStorage.removeItem("USER");
      document.location.href = Routes.LOGIN;
    }
    return error;
  }
);

export default request;
