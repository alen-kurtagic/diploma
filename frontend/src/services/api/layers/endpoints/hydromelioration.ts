import { BBox } from "geojson";
import { makeTransformedAPIRequest } from "../apiWrapper";
import { LayerName } from "src/types/permitEnums";
import { LayerProps } from "src/pages/Tract/components/MapLayer/MapLayer";

const getHydromelioration = async (bbox: BBox): Promise<LayerProps[]> => {
  const hydromeliorationLayers: LayerProps[] = [
    await getIrrigation(bbox),
    await getDrying(bbox),
  ].map((hydromeliorationLayer: any) => {
    hydromeliorationLayer.opinion =
      "Mnenje v zvezi z gradnjami na območju hidromelioracijskih sistemov";
    hydromeliorationLayer.authority = "Ministrstvo za kmetijstvo";
    return hydromeliorationLayer;
  });

  return hydromeliorationLayers;
};

const getIrrigation = async (bbox: BBox): Promise<LayerProps> => {
  const layerName = LayerName.Irrigation;
  const name: string = "Namakalni";
  const data = await makeTransformedAPIRequest(
    "https://king2.geosx.io/rkg/_sx1/sxtables/sxid_mkgp_d96_mesi_namakalni/data/.json",
    bbox
  );
  return { name: layerName, data: data };
};

const getDrying = async (bbox: BBox): Promise<LayerProps> => {
  const layerName = LayerName.Drying;
  const name: string = "Osuševalni";
  const data = await makeTransformedAPIRequest(
    "https://king2.geosx.io/rkg/_sx1/sxtables/sxid_mkgp_d96_mesi_osusevalni/data/.json",
    bbox
  );
  return { name: layerName, data: data };
};

export { getHydromelioration };
