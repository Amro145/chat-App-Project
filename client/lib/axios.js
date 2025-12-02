import axios from "axios";
export const myAxios = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "https://chat-app-bacend.vercel.app/api",
  withCredentials: true,
});
