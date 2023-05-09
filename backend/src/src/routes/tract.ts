import { Router } from "express";
import { getTract } from "../controllers/tractController";
import { Request, Response } from "express";
import { FeatureCollection, GeoJsonProperties } from "geojson";
import { getSettlements } from "../controllers/codebookController";

const router = Router();

router.get("/tract", async (req: Request, res: Response) => {
  const { ids } = req.query;

  try {
    if (!ids || ids === "undefined") {
      throw new TypeError("Missing ids parameter");
    }
    const idsArray = ids?.toString().split(",").map(Number);
    const tractFeatures: FeatureCollection<any, GeoJsonProperties> =
      await getTract(idsArray);

    const codes = tractFeatures.features.map(
      (feature) => feature.properties?.ko_id
    );
    const settlement: Array<string> = await getSettlements(codes);

    let tract: object = {
      settlement: settlement,
      geoJson: tractFeatures,
    };

    res.json(tract);
  } catch (error) {
    if (error instanceof TypeError) {
      res.status(400).send(error.message);
      console.log(error);
    } else if (error instanceof Error) {
      res.status(500).send(error.message);
      console.log(error);
    }
  }
});

export default router;
