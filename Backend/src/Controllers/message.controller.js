const cloudinary = require("../lib/cloudinary");
const { io, getReceiverSocketId } = require("../lib/Socketio");
const { Message } = require("../Models/message.model");

const getMessage = async (req, res) => {
  try {
    const { id: friend } = req.params;
    const myId = req.user._id;

    const message = await Message.find({
      $or: [
        { senderId: myId, receiverId: friend },
        { senderId: friend, receiverId: myId },
      ],
    });
    return res.status(200).json(message);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error in GetMessage", error });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const senderId = req.user._id;

    const { id: receiverId } = req.params;

    let imageUrl;
    if (image) {
      const uploaderResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploaderResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId: receiverId,
      text,
      image: imageUrl,
    });
    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    return res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Error in Send Message" });
    console.log(error);
  }
};

module.exports = {
  getMessage,
  sendMessage,
};
