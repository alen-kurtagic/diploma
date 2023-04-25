import express, { Application, Request, Response } from "express";
import { cors } from "./middlewares/cors";
import parcelsRoutes from "./routes/layers";

const app: Application = express();

app.use(cors);
app.use(parcelsRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server is listening on port 3000");
});
