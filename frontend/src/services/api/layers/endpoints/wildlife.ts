import { BBox } from "geojson";
import { makeTransformedAPIRequest } from "../apiWrapper";
import { LayerName } from "src/types/permitEnums";
import { LayerProps } from "src/pages/Tract/components/MapLayer/MapLayer";

const getWildlife = async (bbox: BBox): Promise<LayerProps[]> => {
  const cultureLayers: LayerProps[] = [await getBrownBear(bbox)].map(
    (cultureLayer: any) => {
      cultureLayer.opinion = "Kulturnovarstveno mnenje za posege";
      cultureLayer.authority = "Ministrstvo za kulturo";
      return cultureLayer;
    }
  );

  return cultureLayers;
};

const getBrownBear = async (bbox: BBox) => {
  const layerName = LayerName.BrownBear;
  const name: string = "Rjavi medved";
  const data = await makeTransformedAPIRequest(
    "https://king2.geosx.io/arso/_sx1/sxtables/sxid_arso_d96_zivlj_prost_rjav_medveda/data/.json",
    bbox,
    "OBMOCJE IN ('1a', '1b')"
  );
  return { name: layerName, data: data };
};

export { getWildlife };
