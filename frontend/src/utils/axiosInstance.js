import axios from "axios";

/**
 * Creates an instance of axios, basically something that acts like
 * Postman, to help send requests to our backend
 */

const axiosInstance = axios.create({
  baseURL: "http://localhost:8001",
  headers: { "Content-Type": "application/json" },
  withCredentials: false,
});

export default axiosInstance;
