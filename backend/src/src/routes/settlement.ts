import { Router } from "express";
import { Request, Response } from "express";
import { getSettlementNames } from "../controllers/codebookController";

const router = Router();

interface SettlementQueryParams {
  codes?: string;
}

router.get("/settlement", async (req: Request, res: Response) => {
  const { codes } = req.query as SettlementQueryParams;

  try {
    if (!codes || codes === "undefined") {
      throw new TypeError("Missing ids parameter");
    }
    // const idsArray = ids?.toString().split(",").map(Number);
    // const tractFeatures: FeatureCollection<any, GeoJsonProperties> =
    //   await getTract(idsArray);

    // const codes = tractFeatures.features.map(
    //   (feature) => feature.properties?.ko_id
    // );
    const codesArray = codes?.toString().split(",").map(Number);

    const settlements: Array<string> = await getSettlementNames(codesArray);

    // const tractBounds: BBox = bbox(tractFeatures) as BBox;

    // const culture = await getCulture(tractBounds);
    // let json: object = {
    //   tract: {
    //     geoJson: tractFeatures,
    //     culture: culture,
    //     settlementNames: settlementNames,
    //   },
    // };

    res.json(settlements);
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
