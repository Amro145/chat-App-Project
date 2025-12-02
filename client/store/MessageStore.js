import { create } from "zustand";
import { myAxios } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./authStore";

export const useMessageStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  pollingInterval: null,

  getUserFn: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await myAxios.get("/auth/users");

      set({ users: res.data });
    } catch (error) {
      console.log(error);

    } finally {
      set({ isUsersLoading: false });
    }
  },
  setSelectedUser: (selectedUser) => set({ selectedUser }),
  getMessagesFn: async (friendID) => {
    set({ isMessagesLoading: true });
    try {
      const res = await myAxios.get(`/message/${friendID}`);
      set({ messages: res.data });
    } catch (error) {
      console.log(error);

    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { messages, selectedUser } = get();
    try {
      const res = await myAxios.post(
        `message/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error);
    }
  },
  subscribeToMessage: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    // Fallback to polling if socket is not connected or not available
    if (!socket || !socket.connected) {
      const intervalId = setInterval(() => {
        get().getMessagesFn(selectedUser._id);
      }, 3000); // Poll every 3 seconds
      set({ pollingInterval: intervalId });
      return;
    }

    socket.on("newMessage", (newMessage) => {
      if (newMessage.senderId !== selectedUser._id) return;
      set({ messages: [...get().messages, newMessage] });
    });
  },
  unsubscribeFromMessage: () => {
    const socket = useAuthStore.getState().socket;
    socket?.off("newMessage");

    // Clear polling interval if it exists
    const { pollingInterval } = get();
    if (pollingInterval) {
      clearInterval(pollingInterval);
      set({ pollingInterval: null });
    }
  },
}));
