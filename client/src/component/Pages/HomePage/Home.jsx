import { Box } from "@chakra-ui/react";
import SidebarHome from "./SidebarHome";
import { useMessageStore } from "../../../../store/MessageStore";
import Info from "./Info";
import NoChatSelected from "./NoChatSelected";
import { useEffect } from "react";

function Home() {

  const {
    selectedUser,
    getMessagesFn,
    subscribeToMessage,
    unsubscribeFromMessage,
  } = useMessageStore();

  useEffect(() => {
    if (!selectedUser) return;
    getMessagesFn(selectedUser._id);

    subscribeToMessage();
    return () => {
      unsubscribeFromMessage();
    };
  }, [selectedUser, subscribeToMessage, unsubscribeFromMessage]);

  return (
    <Box className="flex w-full justify-center mt-10 " >
      <div className="w-1/4">
        <SidebarHome />
      </div>
      <div className="w-3/4">
        <NoChatSelected />
      </div>
    </Box>
  );
}

export default Home;
