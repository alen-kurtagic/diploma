import { BBox } from "geojson";
import { makeTransformedAPIRequest } from "../apiWrapper";
import { Category } from "src/types/permitEnums";

const getNature = async (bbox: BBox) => {
  const category = Category.Nature;
  const data = await makeTransformedAPIRequest(
    "https://king2.geosx.io/arso/_sx1/sxtables/sxid_arso_d96_natura2000/data/.json",
    bbox
  );
  return [{ category: category, data: data }];
};

export { getNature };
