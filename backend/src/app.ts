import express from "express";
import cors from "cors";
import apiResponseHandler from "./middlewares/apiResponseHandler.middleware.js";
import authMiddleware from "./middlewares/auth.middleware.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: process.env.CORS_ORIGIN || "http://localhost:3000",
		credentials: true,
	})
);
app.use(express.static("public"));
app.use(cookieParser());
app.use(apiResponseHandler);
app.use(authMiddleware);

import projectRoutes from "./routes/project.routes.js";
app.use("/api/v1/project", projectRoutes);

export default app;
