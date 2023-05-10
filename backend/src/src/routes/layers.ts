import { Request, Response, Router } from "express";
import { getParcels } from "../controllers/layersController";
import { FeatureCollection, GeoJsonProperties } from "geojson";
import { formatBbox } from "../utils/bbox";

const router = Router();

router.get("/layers/parcels", async (req: Request, res: Response) => {
  const { bbox } = req.query;

  try {
    if (!bbox || bbox === "undefined") {
      throw new TypeError("Missing bbox parameter");
    }

    const bboxValue: Array<number> = formatBbox(bbox.toString());

    const tract: FeatureCollection<any, GeoJsonProperties> = await getParcels(
      bboxValue
    );

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
