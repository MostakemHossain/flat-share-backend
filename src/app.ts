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
    origin: "http://localhost:3000",
    credentials: true,
  })
);
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
