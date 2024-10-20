import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";
const app: Application = express();

app.use(express.json());
app.use(
  cors({
    origin: ["https://flat-match-frontend.vercel.app", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://flat-match-frontend.vercel.app"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
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
