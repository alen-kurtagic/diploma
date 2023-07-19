import { BBox } from "geojson";
import { makeTransformedAPIRequest } from "../apiWrapper";
import { LayerName } from "src/types/permitEnums";
import { LayerProps } from "src/pages/Tract/components/MapLayer/MapLayer";

const getCaves = async (bbox: BBox): Promise<LayerProps[]> => {
  const cavesLayers: LayerProps[] = [await getNaturalCaves(bbox)].map(
    (cavesLayer: any) => {
      cavesLayer.opinion = "Kulturnovarstveno mnenje za posege";
      cavesLayer.authority = "Ministrstvo za kulturo";
      return cavesLayer;
    }
  );

  return cavesLayers;
};

const getNaturalCaves = async (bbox: BBox): Promise<LayerProps> => {
  const layerName = LayerName.NaturalCave;
  const name: string = "Jame";
  const data = await makeTransformedAPIRequest(
    "https://king2.geosx.io/arso/_sx1/sxtables/sxid_arso_d96_regist_nar_vred_jame/data/.json",
    bbox
  );
  return { name: layerName, data: data };
};

export { getCaves };
