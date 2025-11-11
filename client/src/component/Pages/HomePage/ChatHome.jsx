import { useMessageStore } from "../../../../store/MessageStore";
import { Box } from "@chakra-ui/react";
import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import MessageSkeleton from "../../../skeletons/MessageSkeleton";

function ChatHome() {
  const { isMessagesLoading } = useMessageStore();

  return (
    <Box className="w-screen  bg-black  flex flex-col  ">
      {isMessagesLoading ? (
       <div className="flex flex-col justify-between  ">
       <ChatHeader />
       <MessageSkeleton />
       <MessageInput />
     </div>
      ) : (
        <div className="flex flex-col justify-between h-screen  ">
          <ChatHeader />
          <ChatMessages />
          <MessageInput />
        </div>
      )}
    </Box>
  );
}

export default ChatHome;
