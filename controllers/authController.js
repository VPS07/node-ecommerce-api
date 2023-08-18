require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const register = async (req, res) => {
  const { emailId, password } = req.body;
  try {
    const existingEmailId = User.findOne({ emailId });
    if (!existingEmailId)
      return res.status(400).json({ message: "EmailId already exist" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      emailId,
      password: hashedPassword,
    });

    await user.save();
    res.status(200).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const login = async (req, res) => {
  const { emailId, password } = req.body;

  try {
    const user = await User.findOne({ emailId });

    if (!user)
      return res
        .status(404)
        .json({ message: "Invalid emailId. User Not found!" });

    //comparing the password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res
        .status(404)
        .json({ message: "Invalid password. Password does not match." });

    //generating jwt token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    res.status(200).json(token);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  register,
  login,
};
