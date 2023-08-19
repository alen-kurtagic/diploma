import { cors } from "./middlewares/cors";
import { logger } from "./middlewares/logger";
import parcelsRoute from "./routes/parcels";
import streetsRoute from "./routes/streets";
import express, { Application } from "express";
import { PORT } from "./config/db";

const app: Application = express();

app.use(cors);
app.use(logger);
app.use(parcelsRoute);
app.use(streetsRoute);

app.listen(PORT, function () {
  console.log(`Server is listening on port ${PORT}`);
});
