import { useRef } from "react";
import { useMessageStore } from "../../../../store/MessageStore";
import { useAuthStore } from "../../../../store/authStore";
import { useEffect } from "react";
import { formatMessageTime } from "../../../../lib/utilits";

function ChatMessages() {
  const { messages, selectedUser } = useMessageStore();
  const { authUser } = useAuthStore();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messages && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  return (
    <div className="flex-1 bg-black py-20 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message._id}
          className={`chat ${
            message.senderId === authUser._id ? "chat-end" : "chat-start"
          }`}
          ref={messagesEndRef}
        >
          <div className=" chat-image avatar">
            <div className="size-10 rounded-full border">
              <img
                src={
                  message.senderId === authUser._id
                    ? authUser.profilePic || "/avatar.png"
                    : selectedUser.profilePic || "/avatar.png"
                }
                alt="profile pic"
              />
            </div>
          </div>
          <div className="chat-header mb-1">
            <time className="text-xs opacity-50 ml-1">
              {formatMessageTime(message.createdAt)}
            </time>
          </div>
          <div className="chat-bubble flex flex-col">
            {message.image && (
              <img
                src={message.image}
                alt="Attachment"
                className="sm:max-w-[200px] rounded-md mb-2"
              />
            )}
            {message.text && <p>{message.text}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatMessages;
