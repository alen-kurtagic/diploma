import { NextFunction, Request, Response, Router } from "express";
import { getStreets } from "../controllers/streetsController";

const router = Router();

interface ParcelQueryParams {
  bbox?: string;
  ids?: string;
}

router.get(
  "/data/streets",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { ids } = req.query as ParcelQueryParams;

    try {
      if (!ids || ids == "undefined") {
        throw new Error(
          "'ids' query parameter must be provided and it should be a comma-separated list of values."
        );
      }

      const idsArray = ids.split(",");
      const streets = await getStreets(idsArray);
      res.json(streets);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
