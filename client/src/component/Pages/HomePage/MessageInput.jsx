import { useRef, useState } from "react";
import { useMessageStore } from "../../../../store/MessageStore";
import { Box, Button, Image } from "@chakra-ui/react";
import { ImageIcon, Send, XIcon } from "lucide-react";
import toast from "react-hot-toast";

function MessageInput() {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef();
  const { sendMessage } = useMessageStore();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      toast.error("Error in send image");
      console.log(error);
    }
  };
  return (
    <Box>
      {imagePreview && (
        <div className="relative bottom-20 h-3 left-10">
          <Image src={imagePreview} className="h-24 " />
          <button onClick={removeImage} className="relative bottom-24 left-40">
            <XIcon />{" "}
          </button>
        </div>
      )}
      <div className="fixed bottom-0 pb-10 w-screen z-30 bg-black">
        <form
          onSubmit={handleSendMessage}
          className="flex justify-center px-4 "
        >
          <div className="flex-1 ">
            <input
              type="text "
              placeholder="Type a message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-11/12 text-red-50  p-2 ml-5 input-bordered rounded-lg"
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
          <div className="">
            <Button
              type="button"
              className={` ${
                imagePreview ? "text-green-500" : "text-gray-100"
              }`}
              onClick={() => fileInputRef.current?.click()}
            >
              <ImageIcon size={22} />
            </Button>
            <Button type="submit" disabled={!text.trim() && !imagePreview}>
              <Send size={22} className={text === "" ? "text-gray-400" : "text-white"} />
            </Button>
          </div>
        </form>
      </div>
    </Box>
  );
}

export default MessageInput;
