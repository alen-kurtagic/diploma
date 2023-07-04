import { Request, Response, Router } from "express";
import {
  getParcelsByBBox,
  getParcelsByIds,
  getStreetsByIds,
} from "../controllers/layerController";
import { formatBbox } from "../utils/bbox";

const router = Router();

interface ParcelQueryParams {
  bbox?: string;
  ids?: string;
}

router.get(
  "/layer/parcel",
  async (req: Request, res: Response): Promise<void> => {
    const { bbox, ids } = req.query as ParcelQueryParams;

    try {
      let parcels: GeoJSON.FeatureCollection;

      if (bbox && bbox !== "undefined") {
        const bboxValue: Array<number> = formatBbox(bbox.toString());

        parcels = await getParcelsByBBox(bboxValue);
      } else if (ids && ids !== "undefined") {
        const idsArray = ids?.toString().split(",").map(Number);

        parcels = await getParcelsByIds(idsArray);
      } else {
        throw new Error(
          "Either 'bbox' or 'ids' query parameter must be provided."
        );
      }

      res.json(parcels);
    } catch (error) {
      if (error instanceof TypeError) {
        res.status(400).send(error.message);
        console.error(error);
      } else if (error instanceof Error) {
        res.status(500).send(error.message);
        console.error(error);
      }
    }
  }
);

router.get(
  "/layer/street",
  async (req: Request, res: Response): Promise<void> => {
    const { ids } = req.query as ParcelQueryParams;

    try {
      let streets: Array<string>;

      if (ids && ids !== "undefined") {
        const idsArray = ids?.toString().split(",").map(Number);

        streets = await getStreetsByIds(idsArray);
      } else {
        throw new Error("'ids' query parameter must be provided.");
      }

      res.json(streets);
    } catch (error) {
      if (error instanceof TypeError) {
        res.status(400).send(error.message);
        console.error(error);
      } else if (error instanceof Error) {
        res.status(500).send(error.message);
        console.error(error);
      }
    }
  }
);

export default router;
