function notFound(req, res, next) {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
}
function errorHandler(error, req, res, next) {
  let status = error.statusCode || 500;
  let message = error.message || "Server error";
  if (error.name === "ValidationError") {
    status = 400;
    message = Object.values(error.errors)
      .map((item) => item.message)
      .join(", ");
  }
  if (error.code === 11000) {
    status = 400;
    message = "A property with this ID already exists";
  }
  res
    .status(status)
    .json({
      success: false,
      message,
      ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
    });
}
module.exports = { notFound, errorHandler };
