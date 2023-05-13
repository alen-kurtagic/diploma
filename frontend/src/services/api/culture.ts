import { BBox } from "geojson";
import { makeTransformedAPIRequest } from "./layerWrapper";

const getCulture = async (bbox: BBox) => {
  return makeTransformedAPIRequest(
    "https://king2.geosx.io/gurs/_sx1/sxtables/sxid_gurs_d96_gji_vp_ek/data/.json",
    bbox
  );
};

export { getCulture };
