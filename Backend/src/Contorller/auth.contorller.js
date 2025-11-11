const { validateCreatUser, User } = require("../Models/user.model");
const bcrybt = require("bcrypt");
const generateToken = require("../lib/utils");
const cloudinary = require("../lib/cloudinary");

const singUp = async (req, res) => {
  try {
    const { email, userName, password, profile } = req.body;
    // check input value
    const { error } = validateCreatUser(req.body);
    if (error) {
      return res.status(400).json({ message: "Please Out fill" });
    }
    // check the user
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User Already exist" });
    }
    // hash password
    const salt = await bcrybt.genSalt(10);
    const hashedPassword = await bcrybt.hash(password, salt);
    // create User
    const newUser = new User({
      email,
      userName,
      password: hashedPassword,
      profile: profile,
    });
    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      return res
        .status(201)
        .json({ message: "User Created Succefuly", data: newUser });
      req.user = newUser;
    } else {
      return res.status(400).json({ message: "invalid User Data" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error in Singup" });
  }
};

const login = async (req, res) => {
  try {
    // chek email
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Email or Password is not Correct" });
    }
    // check password
    const isPassword = await bcrybt.compare(password, user.password);
    if (!isPassword) {
      return res
        .status(404)
        .json({ message: "Email or Password is not Correct" });
    }
    // generate token
    generateToken(user._id, res);
    // login
    req.user = user;
    return res.status(200).json({ succes: true, data: user });
  } catch (error) {
    return res.status(500).json({ message: "Error in Login" });
  }
};
const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    return res.status(200).json({ succes: true, message: "logout Succufuly" });
  } catch (error) {
    return res.status(500).json({ message: "Error in Logout" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { profile } = req.body;
    const userId = req.user._id; //check from this

    if (!profile) {
      return res.status(400).json({ message: "Profile Image Is Required" });
    }
    const uploadResponse = await cloudinary.uploader.upload(profile);
    const updateProfile = await User.findByIdAndUpdate(
      userId,
      { profile: uploadResponse.secure_url },
      { new: true }
    );
    return res.status(200).json({
      succes: true,
      message: "Profile Updated Succefuly",
      data: updateProfile.profile,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error in Update Profile", error });
  }
};

const chekAuth = (req, res) => {
  try {
    return res.status(200).json({ message: "success Verify", data: req.user });
  } catch (error) {
    return res.status(500).send("Error in Ckack Auth");
  }
};

const getAllUsers = async (req, res) => {
  try {
    const { email } = req.user;
    const myAccount = await User.findOne({ email });
    if (!myAccount) {
      return res
        .status(400)
        .json({ succes: false, message: "please Login First" });
    }

    const users = await User.find({ _id: { $ne: myAccount._id } }).select(
      "-password"
    );
    return res.status(200).json({ succes: true, data: users });
  } catch (error) {
    return res
      .status(500)
      .json({ succes: false, message: "Error in get all users" });
  }
};

module.exports = {
  singUp,
  login,
  logout,
  updateProfile,
  chekAuth,
  getAllUsers,
};
