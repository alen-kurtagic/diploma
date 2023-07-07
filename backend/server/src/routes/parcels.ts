import { NextFunction, Request, Response, Router } from "express";
import {
  getParcelsWithBBox,
  getParcelsWithId,
} from "../controllers/parcelsController";
import { formatBbox } from "../utils/bbox";

const router = Router();

interface ParcelQueryParams {
  bbox?: string;
  ids?: string;
}

router.get(
  "/data/parcels",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { bbox, ids } = req.query as ParcelQueryParams;

    try {
      let parcels: GeoJSON.FeatureCollection;

      if (bbox && bbox !== "undefined") {
        const bboxValue: Array<number> = formatBbox(bbox.toString());

        parcels = await getParcelsWithBBox(bboxValue);
      } else if (ids && ids !== "undefined") {
        const idsArray = ids?.toString().split(",");

        parcels = await getParcelsWithId(idsArray);
      } else {
        throw new Error(
          "Either 'bbox' or 'ids' query parameter must be provided as a comma separated list of values."
        );
      }

      res.json(parcels);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
