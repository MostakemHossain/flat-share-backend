import cors from "cors";
import express, { Application } from "express";
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

export default app;
