import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import appRouter from "./routes";
// the single file is not running just run this seed for making super_admin
// import("./db/seed.ts");

// const authRoutes = require("./routes/auth.routes.ts");

dotenv.config();

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use("/api", appRouter);

app.listen(process.env.PORT, () => {
  return console.log(`express is listening at port:${process.env.PORT}`);
});
