import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import { errorHandler } from "./middlewares/error.middleware.js";
import { globalLimiter } from "./middlewares/rateLimiter.js";

// Apply global rate limiter
app.use(globalLimiter);

app.get("/", (req, res) => {
    res.send("API is running...");
});

import userRouter from "./routes/user.routes.js";

// routes declaration
app.use("/api/v1/users", userRouter);

// Error Handler Middleware
app.use(errorHandler);

export { app };
