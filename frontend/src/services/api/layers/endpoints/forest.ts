import { BBox } from "geojson";
import { LayerName } from "src/types/permitEnums";
import { LayerProps } from "src/pages/Tract/components/MapLayer/MapLayer";
import { makeTransformedAPIRequest } from "../apiWrapper";

const getForest = async (bbox: BBox): Promise<LayerProps[]> => {
  const cultureLayers: LayerProps[] = [await getForestProtection(bbox)].map(
    (cultureLayer: any) => {
      cultureLayer.opinion = "Mnenje za gradnjo v gozdnem prostoru";
      cultureLayer.authority = "Ministrstvo za gozdove";
      return cultureLayer;
    }
  );

  return cultureLayers;
};

const getForestProtection = async (bbox: BBox) => {
  const layerName = LayerName.ForestProtection;
  const name: string = "Varovalni gozdovi";
  const data = await makeTransformedAPIRequest(
    "https://king2.geosx.io/gozdovi/_sx1/sxtables/sxid_zgs_d96_varovalni_gozdovi/data/.json",
    bbox
  );
  return { name: layerName, data: data };
};

export { getForest };
