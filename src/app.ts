import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";
const app: Application = express();

app.use(express.json());
const allowedOrigins = [
  "https://flat-match-frontend.vercel.app/",
  // "http://localhost:5173",
];

// parsers
app.use(express.json());

// CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin as string;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS, PATCH"
  );
  next();
});
app.use(cookieParser());

app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send({
    message: "Flat Share API..........",
  });
});

// global error handler
app.use(globalErrorHandler);

// not found Routes
app.use(notFound);

export default app;
