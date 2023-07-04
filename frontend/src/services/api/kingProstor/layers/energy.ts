import { BBox } from "geojson";
import { makeTransformedAPIRequest } from "../apiWrapper";
import { PermitLayer } from "src/types/tractTypes";
import { Category } from "src/types/permitEnums";

const getEnergy = async (bbox: BBox) => {
  const category = Category.Energy;
  const data = await makeTransformedAPIRequest(
    "https://king2.geosx.io/gurs/_sx1/sxtables/sxid_gurs_d96_gji_vp_ek/data/.json",
    bbox
  );
  return [{ category: category, data: data }];
};

export { getEnergy };
