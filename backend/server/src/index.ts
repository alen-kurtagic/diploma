import { cors } from "./middlewares/cors";
import { logger } from "./middlewares/logger";
import parcelsRoute from "./routes/parcels";
import streetsRoute from "./routes/streets";
import express, { Application } from "express";

const app: Application = express();

app.use(cors);
app.use(logger);
app.use(parcelsRoute);
app.use(streetsRoute);

app.listen(process.env.PORT || 3000, function () {
  console.log("Parcelko server is listening on port 3000");
});
