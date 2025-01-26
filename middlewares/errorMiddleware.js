// middlewares/errorMiddleware.js
const ApiError = require("../utils/ApiError");

const errorHandler = (err, req, res, next) => {
  // Default to internal server error
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // If the error is operational (from ApiError), we know it's a known error and should be returned directly.
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  } else {
    // Log non-operational errors (e.g., programming mistakes, bugs) to an external system (optional)
    console.error(err.stack);
  }

  // Send error response to client
  return res.status(statusCode).json({
    success: false,
    message: message,
  });
};

module.exports = errorHandler;
