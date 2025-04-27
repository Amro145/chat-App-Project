const cloudinary = require("../lib/cloudinary");
const { io, getReceiverSocketId } = require("../lib/Socketio");
const { Message } = require("../Models/massage.model");

const getMessage = async (req, res) => {
  try {
    const { id: friend } = req.params;
    const myId = req.user._id;

    const message = await Message.find({
      $or: [
        { senderId: myId, receverId: friend },
        { senderId: friend, receverId: myId },
      ],
    });
    return res.status(200).json(message);
  } catch (error) {
    return res
      .status(500)
      .json({ succes: false, message: "Error in GetMessage", error });
  }
};

const sendMassage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const senderId = req.user._id;

    const { id: receverId } = req.params;

    let imageUrl;
    if (image) {
      const uploaderResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploaderResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receverId: receverId,
      text,
      image: imageUrl,
    });
    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receverId);
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
  sendMassage,
};
