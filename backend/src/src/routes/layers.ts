import { Router } from "express";
import { LAYER_TYPE, getLayer } from "../controllers/layersController";

const router = Router();

router.get("/layers/parcels", (req, res) => {
  getLayer(req, res, LAYER_TYPE.PARCELS);
});

export default router;
