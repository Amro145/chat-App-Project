import { create } from "zustand";
import { myAxios } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const URL =
  import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdateProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await myAxios.get("auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      set({ authUser: null });
      console.log(error);

    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await myAxios.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);

    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await myAxios.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Login Successful");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    try {
      await myAxios.post("/auth/logout");
      set({ authUser: null });
      get().disconnectSocket();
    } catch (error) {
      toast.error("Logout Error");
      console.log(error);

    }
  },
  updateProfile: async (data) => {
    set({ isUpdateProfile: true });
    try {
      const res = await myAxios.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success(res.message);
    } catch (error) {
      toast.error("error");
      console.log(error);

    } finally {
      set({ isUpdateProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(URL, {
      transports: ["websocket", "polling"],
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (userId) => {
      set({ onlineUsers: userId });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
