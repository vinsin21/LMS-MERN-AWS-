import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// api endpoint routes
import userRouter from "./routes/user.routes.js";
import courseRouter from "./routes/course.routes.js";


const app = express();

// CORS configuration with dynamic origin handling
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, Postman, or curl)
        if (!origin) {
            return callback(null, true);
        }

        // Get allowed origins from env (could be comma-separated for multiple)
        const allowedOrigins = process.env.CORS_ORIGIN
            ? process.env.CORS_ORIGIN.split(',').map(o => o.trim())
            : ['http://localhost:3000']; // Fallback to localhost:3000

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import { errorHandler } from "./middlewares/error.middleware.js";
import { globalLimiter } from "./middlewares/rateLimiter.js";

// Apply global rate limiter (after CORS so preflight isn't blocked)
app.use(globalLimiter);

app.get("/", (req, res) => {
    res.send("API is running...");
});


// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/courses", courseRouter);
// Error Handler Middleware
app.use(errorHandler);

export { app };
