import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api", // Adjust baseURL as needed
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
