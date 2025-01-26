// utils/ApiError.js
class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // Flag to distinguish operational errors from programming errors
  }
}

module.exports = ApiError;
