import { Box, Image } from "@chakra-ui/react";
import { useState } from "react";
import { useMessageStore } from "../../../../store/MessageStore";
import { useEffect } from "react";
import { Users } from "lucide-react";
import { useAuthStore } from "../../../../store/authStore";
import { useColorModeValue } from "../../../components/ui/color-mode";
import { Link } from "react-router-dom";
import SidebarSkeleton from "../../../skeletons/SidebarSkeleton";

function SidebarHome() {
  const { users, getUserFn, setSelectedUser, isUsersLoading } =
    useMessageStore();
  const { onlineUsers } = useAuthStore();
  useEffect(() => {
    getUserFn();
  }, [getUserFn]);
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  const filteredUsers = showOnlineOnly
    ? users?.filter((user) => onlineUsers?.includes(user?._id))
    : users;

  const color = useColorModeValue("gray.900", "gray.100");

  return (
    <Box
      color={color}
      className=" flex flex-col px-5 border-r-2 min-h-screen gap-2 justify-start items-start border-gray-600   "
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Users />
          <h1>Contacts</h1>
        </div>
        <div className="flex items-center">
          <input
            id="checked-checkbox"
            type="checkbox"
            onChange={(e) => setShowOnlineOnly(e?.target?.checked)}
            className="w-4 h-4 text-blue-600 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="checked-checkbox"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Show Only Online
          </label>
          <span className="text-zinc-500">
            (<span>{onlineUsers ? Math.max(0, onlineUsers.length - 1) : 0} online</span>)
          </span>
        </div>
        <hr />
      </div>

      {isUsersLoading ? (
        <SidebarSkeleton />
      ) : (
        <div className="overflow-y-scroll flex flex-col w-full   min-h-screen">
          {filteredUsers?.map((user) => {
            return (
              <Link to="/message" key={user?._id}>
                <button
                  className="flex gap-4 text-start py-2"
                  onClick={() => setSelectedUser(user)}
                >
                  <Image
                    src={
                      user?.profile ||
                      "https://github.com/burakorkmez/fullstack-chat-app/blob/master/frontend/public/avatar.png?raw=true"
                    }
                    boxSize="60px"
                    borderRadius="full"
                    fit="cover"
                    alt="Naruto Uzumaki"
                    className={
                      onlineUsers?.includes(user?._id) ? "bg-green-800 p-0" : ""
                    }
                  />

                  <div>
                    <h1>{user?.userName}</h1>
                    <span>
                      {onlineUsers?.includes(user?._id) ? "online" : "offline"}
                    </span>
                  </div>
                </button>
              </Link>
            );
          })}
          {filteredUsers?.length === 0 && (
            <div className="text-center text-zinc-500 ">No Online Users</div>
          )}
        </div>
      )}
    </Box>
  );
}

export default SidebarHome;
