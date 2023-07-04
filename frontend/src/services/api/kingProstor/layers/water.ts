import { BBox } from "geojson";
import { makeTransformedAPIRequest } from "../apiWrapper";
import { Category } from "src/types/permitEnums";

const getWater = async (bbox: BBox) => {
  const category = Category.Water;
  const data = await makeTransformedAPIRequest(
    "https://king2.geosx.io/arso/_sx1/sxtables/sxid_drsv_d96_vvo_drz_nivo_obm/data/.json",
    bbox
  );
  return [{ category: category, data: data }];
};

export { getWater };
