import express from "express";
const appRouter = express.Router();

import authRoutes from "./auth.routes.ts";
import productRoutes from "./products.routes.ts";

// routes
appRouter.use("/auth", authRoutes);
appRouter.use("/products", productRoutes);

export default appRouter;
