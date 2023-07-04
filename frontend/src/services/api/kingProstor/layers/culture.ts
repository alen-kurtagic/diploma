import { BBox } from "geojson";
import { makeTransformedAPIRequest } from "../apiWrapper";
import { PermitLayer } from "src/types/tractTypes";
import { Category } from "src/types/permitEnums";

const getCulture = async (bbox: BBox) => {
  const category = Category.Culture;
  const data = await makeTransformedAPIRequest(
    "https://king2.geosx.io/rkd/_sx1/sxtables/sxid_d96_register_kulturne_dediscine/data/.json",
    bbox
  );
  return [{ category: category, data: data }];
};

export { getCulture };
