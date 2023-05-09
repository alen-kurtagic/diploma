import { cors } from "./middlewares/cors";
import { logger } from "./middlewares/logger";
import layersRoutes from "./routes/layers";
import tractRoutes from "./routes/tract";
import express, { Application } from "express";

const app: Application = express();

app.use(cors);
app.use(logger);
app.use(layersRoutes);
app.use(tractRoutes);

app.listen(process.env.PORT || 3000, function () {
  console.log("Server is listening on port 3000");
});
