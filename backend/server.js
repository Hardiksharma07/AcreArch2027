require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const propertyRoutes = require("./routes/propertyRoutes");
const authRoutes = require("./routes/authRoutes");
const mediaRoutes = require("./routes/mediaRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const app = express();
const port = process.env.PORT || 5000;
const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((value) => value.trim());
app.use(
  cors({
    origin(origin, callback) {
      const isLocalViteOrigin = process.env.NODE_ENV !== "production" && /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin || "");
      if (!origin || allowedOrigins.includes(origin) || isLocalViteOrigin)
        return callback(null, true);
      const error = new Error("Origin is not allowed by CORS");
      error.statusCode = 403;
      callback(error);
    },
  }),
);
app.use(express.json({ limit: "1mb" }));
app.get("/api/health", (req, res) =>
  res.json({ success: true, data: { status: "ok" } }),
);
app.use("/api/auth", authRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/properties", propertyRoutes);
app.use(notFound);
app.use(errorHandler);
let server;
async function start() {
  try {
    for (const name of ["MONGO_URI", "ADMIN_ID", "ADMIN_PASSWORD", "JWT_SECRET"]) {
      if (!process.env[name]) throw new Error(`Missing required environment variable: ${name}`);
    }
    await connectDB();
    server = app.listen(port, () =>
      console.log(`AcreArch API listening at http://localhost:${port}`),
    );
  } catch (error) {
    console.error("Unable to start API:", error.message);
    process.exitCode = 1;
  }
}
async function shutdown() {
  if (server) server.close();
  await mongoose.disconnect();
  process.exit(0);
}
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
if (require.main === module) start();
module.exports = app;
