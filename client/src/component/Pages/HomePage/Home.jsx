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
    <Box  className="grid w-full justify-center " >
      <div className="py-2">
        <Info />
      </div>

      <div className="flex justify-start">
        <div className="">
          <SidebarHome />
        </div>
        <div className="">
          <NoChatSelected />
        </div>
      </div>
    </Box>
  );
}

export default Home;
