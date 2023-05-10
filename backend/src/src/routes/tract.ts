import { Router } from "express";
import { getTract } from "../controllers/tractController";
import { Request, Response } from "express";
import { BBox, FeatureCollection, GeoJsonProperties } from "geojson";
import { getSettlementNames } from "../controllers/codebookController";
import { getCulture } from "src/kingProstor/apiServices";
import bbox from "@turf/bbox";

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
    const settlementNames: Array<string> = await getSettlementNames(codes);

    const tractBounds: BBox = bbox(tractFeatures) as BBox;

    const culture = await getCulture(tractBounds);
    let json: object = {
      tract: {
        geoJson: tractFeatures,
        culture: culture,
        settlementNames: settlementNames,
      },
    };

    res.json(json);
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
