import { BBox } from "geojson";
import { LayerProps } from "src/pages/Tract/components/MapLayer/MapLayer";
import { makeTransformedAPIRequest } from "../apiWrapper";

const getFarming = async (bbox: BBox): Promise<LayerProps[]> => {
  const farmingLayers: LayerProps[] = [
    await getFarmingUse(bbox),
    // await getFarmingEconomy(bbox),
  ].map((farmingLayer: any) => {
    farmingLayer.opinion = "Mnenje o gradnji na kmetijski območjih";
    farmingLayer.authority = "Ministrstvo za kmetijstvo";
    return farmingLayer;
  });

  return farmingLayers;
};

const getFarmingUse = async (bbox: BBox): Promise<LayerProps> => {
  const name: string = "Kmetijska raba";
  const data = await makeTransformedAPIRequest(
    "https://king2.geosx.io/rkg/_sx1/sxtables/sxid_mkgp_d96_rkg_raba/data/.json",
    bbox
  );
  return { name: name, color: "#856644", data: data, regNo: 2399253 };
};

const getFarmingEconomy = async (bbox: BBox): Promise<LayerProps> => {
  const name: string = "Kmetijsko gospodarstvo";
  const data = await makeTransformedAPIRequest(
    "https://king2.geosx.io/rkg/_sx1/sxtables/sxid_mkgp_d96_rkg_raba/data/.json",
    bbox
  );
  return { name: name, color: "#856644", data: data };
};

export { getFarming };
