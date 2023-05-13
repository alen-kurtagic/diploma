import { cors } from "./middlewares/cors";
import { logger } from "./middlewares/logger";
import layerRoutes from "./routes/layer";
import settlementRoutes from "./routes/settlement";
import express, { Application } from "express";

const app: Application = express();

app.use(cors);
app.use(logger);
app.use(layerRoutes);
app.use(settlementRoutes);

app.listen(process.env.PORT || 3000, function () {
  console.log("Server is listening on port 3000");
});
