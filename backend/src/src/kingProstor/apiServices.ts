import { BBox } from "geojson";
import { makeTransformedAPIRequest } from "./apiWrapper";

const getCulture = async (bbox: BBox) => {
  return makeTransformedAPIRequest(
    "https://king2.geosx.io/gurs/_sx1/sxtables/sxid_gurs_d96_gji_vp_elek/data/.json",
    bbox
  );
};

export { getCulture };
