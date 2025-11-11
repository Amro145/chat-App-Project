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
    unSubcribeToMessage,
  } = useMessageStore();

  useEffect(() => {
    if (!selectedUser) return;
    getMessagesFn(selectedUser._id);

    subscribeToMessage();
    return () => {
      unSubcribeToMessage();
    };
  }, [selectedUser, subscribeToMessage, unSubcribeToMessage]);

  return (
    <Box  className="flex w-full justify-center mt-10 " >
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
