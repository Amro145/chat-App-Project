import { XIcon } from "lucide-react";
import { useMessageStore } from "../../../../store/MessageStore";
import { Box, Image } from "@chakra-ui/react";
import { useAuthStore } from "../../../../store/authStore";
import { Link } from "react-router-dom";

function ChatHeader() {
  const { setSelectedUser, selectedUser } = useMessageStore();
  const { onlineUsers } = useAuthStore();
  return (
    <Box className="flex items-center fixed top-0  justify-between px-5 w-full bg-gray-400 text-black z-10     ">
      <div className="flex gap-4  items-center">
        <Image
          src={
            selectedUser?.profile ||
            "https://github.com/burakorkmez/fullstack-chat-app/blob/master/frontend/public/avatar.png?raw=true"
          }
          boxSize="60px"
          borderRadius="full"
          fit="cover"
          alt="Naruto Uzumaki"
        />
        <div>
          <h1>{selectedUser?.userName}</h1>
          <span>
            {onlineUsers.includes(selectedUser?._id) ? "online" : "offline"}
          </span>
        </div>
      </div>
      <Link to="/" onClick={() => setSelectedUser(null)} className="pb-3">
        <XIcon />
      </Link>
    </Box>
  );
}

export default ChatHeader;


