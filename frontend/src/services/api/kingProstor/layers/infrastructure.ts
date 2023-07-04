import { BBox } from "geojson";
import { makeTransformedAPIRequest } from "../apiWrapper";
import { PermitLayer } from "src/types/tractTypes";
import { Category } from "src/types/permitEnums";

const getInfrastructure = async (bbox: BBox) => {
  const category = Category.Infrastructure;
  const data = await makeTransformedAPIRequest(
    "https://king2.geosx.io/drsi/_sx1/sxtables/sxid_drsi_drz_zeleznice_d96/data/.json",
    bbox
  );
  return [{ category: category, data: data }];
};

export { getInfrastructure };
