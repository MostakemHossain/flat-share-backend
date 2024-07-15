import cors from "cors";
import express, { Application } from "express";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send({
    message: "Flat Share API..........",
  });
});

export default app;
