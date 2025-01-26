const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return req
        .status(400)
        .json({ message: "Username and password are requried" });
    }

    // Check if the user exists

    const user = await User.findOne({ username });
    if (!user) {
      return res.staus(404).json({ message: "User not found" });
    }

    // Verify the password
    console.log(user.password);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(new ApiError("Invalid credentials.", 401)); // Unauthorized error
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      "your_jwt_secret", // Replace with a secure secret
      { expiresIn: "1d" } // Token valid for 1 day
    );

    // Respond with the token
    res.status(200).json({
      message: "Login successful.",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

// Register Controller (Optional)
const register = async (req, res, next) => {
  try {
    const { username, password, role } = req.body;

    // Validate input
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    }

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return next(new ApiError("Username already taken.", 400)); // Throw a bad request error
    }

    const newUser = new User({
      username,
      password: password, // password will be hashed in model file. using pre save hook in User's Details
      role: role || "employee",
    });

    // Save the user
    await newUser.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

module.exports = { login, register };
