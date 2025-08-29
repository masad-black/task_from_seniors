import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import ApiResponse from "./utils/api_response.js";
import mainRouter from "./routes/index.js";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({}));

// Main route
app.use("/api", mainRouter);

app.get("/", (req, res) => {
  return ApiResponse.success(res, {}, "Server running!");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`____Server running on http://localhost:${PORT}____`);
});

// todo: permission update
