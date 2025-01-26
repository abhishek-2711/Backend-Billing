require("dotenv").config();

module.exports = {
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || "default_secret_key",
  mongoUri: process.env.MONGO_URI,
};
