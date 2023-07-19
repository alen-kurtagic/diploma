import { BBox } from "geojson";
import { makeTransformedAPIRequest } from "../apiWrapper";
import { LayerName } from "src/types/permitEnums";
import { LayerProps } from "src/pages/Tract/components/MapLayer/MapLayer";

const getCulture = async (bbox: BBox): Promise<LayerProps[]> => {
  const cultureLayers: LayerProps[] = [await getCulturalHeritage(bbox)].map(
    (cultureLayer: any) => {
      cultureLayer.opinion = "Kulturnovarstveno mnenje za posege";
      cultureLayer.authority = "Ministrstvo za kulturo";
      return cultureLayer;
    }
  );

  return cultureLayers;
};

const getCulturalHeritage = async (bbox: BBox): Promise<LayerProps> => {
  const layerName = LayerName.Culture;
  const name: string = "Kulturna dediščina";
  const data = await makeTransformedAPIRequest(
    "https://king2.geosx.io/rkd/_sx1/sxtables/sxid_d96_register_kulturne_dediscine/data/.json",
    bbox
  );
  return { name: layerName, data: data };
};

export { getCulture };
