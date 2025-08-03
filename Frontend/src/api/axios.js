import axios from "axios";

const instance = axios.create({
  baseURL: "https://crowdsolve-backend.onrender.com/api",
  withCredentials: true,
});

export default instance;
