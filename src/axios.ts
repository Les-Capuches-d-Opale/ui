import axios from "axios";

const request = axios.create({
  baseURL: "https://les-capuches-d-opale.herokuapp.com/",
  withCredentials: true,
});

request.interceptors.request.use(
  (config) => {
    const userData = localStorage.getItem("USER");
    if (userData) {
      const token = JSON.parse(userData).token;
      if (token && token !== "" && config && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    console.error("axios interceptors error : ",error);
    return error;
  }
);

export default request;
