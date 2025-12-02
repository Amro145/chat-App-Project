import { useRef } from "react";
import { useMessageStore } from "../../../../store/MessageStore";
import { useAuthStore } from "../../../../store/authStore";
import { useEffect } from "react";
import { formatMessageTime } from "../../../../lib/utils";

function ChatMessages() {
  const { messages, selectedUser, isMessagesLoading, subscribeToMessage, unsubscribeFromMessage } = useMessageStore();
  const { authUser } = useAuthStore();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    subscribeToMessage();
    return () => unsubscribeFromMessage();
  }, [selectedUser, subscribeToMessage, unsubscribeFromMessage]);

  useEffect(() => {
    console.log(authUser);
    console.log("selectedUser", selectedUser);

  }, [authUser, selectedUser]);
  useEffect(() => {
    if (messages && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  return (
    <div className="flex-1 bg-black py-20 overflow-y-auto p-4 space-y-4">
      {isMessagesLoading ? (
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      ) : messages.map((message) => (
        <div
          key={message._id}
          className={`chat ${message?.senderId?.toString() === authUser?._id?.toString() ? "chat-start" : "chat-end"}`}
          ref={messagesEndRef}
        >
          <div className=" chat-image avatar">
            <div className="size-10 rounded-full border">
              <img
                src={
                  message?.senderId?.toString() === authUser?._id?.toString()
                    ? authUser?.profile || "/avatar.png"
                    : selectedUser?.profile || "/avatar.png"
                }
                alt="profile pic"
              />
            </div>
          </div>
          <div className="chat-header mb-2 text-xs opacity-50">
            <time className="ml-1">
              {formatMessageTime(message?.createdAt)}
            </time>
          </div>
          <div className="chat-bubble flex flex-col">
            {message?.image && (
              <img
                src={message?.image}
                alt="Attachment"
                className="sm:max-w-[200px] rounded-md mb-2"
              />
            )}
            {message?.text && <p>{message?.text}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatMessages;
