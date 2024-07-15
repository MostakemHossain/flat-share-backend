import cors from "cors";
import express, { Application } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import { userRoutes } from "./app/modules/user/user.routes";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/users", userRoutes);

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
