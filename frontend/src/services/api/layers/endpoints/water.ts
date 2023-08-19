import { BBox } from "geojson";
import { makeTransformedAPIRequest } from "../apiWrapper";
import { LayerName } from "src/types/permitEnums";
import { LayerProps } from "src/pages/Tract/components/MapLayer/MapLayer";

const getWater = async (bbox: BBox): Promise<LayerProps[]> => {
  const waterLayers: LayerProps[] = [
    await getNationalWater(bbox),
    await getLocalWater(bbox),
    await getBeach(bbox),
  ].map((waterLayer: any) => {
    waterLayer.opinion = "Vodovarstveno mnenje";
    waterLayer.authority = "Direkcija RS z vode";
    return waterLayer;
  });

  return waterLayers;
};

const getNationalWater = async (bbox: BBox): Promise<LayerProps> => {
  const layerName = LayerName.NationalWater;
  const name: string = "Državna vodovarstvena območja";
  const data = await makeTransformedAPIRequest(
    "https://king2.geosx.io/arso/_sx1/sxtables/sxid_drsv_d96_vvo_drz_nivo_obm/data/.json",
    bbox
  );
  return { name: layerName, data: data };
};

const getLocalWater = async (bbox: BBox): Promise<LayerProps> => {
  const layerName = LayerName.LocalWater;
  const name: string = "Občinska vodovarstvena območja";
  const data = await makeTransformedAPIRequest(
    "https://king2.geosx.io/arso/_sx1/sxtables/sxid_drsv_d96_vvo_obc_obm/data/.json",
    bbox
  );
  return { name: layerName, data: data };
};

const getBeach = async (bbox: BBox): Promise<LayerProps> => {
  const layerName = LayerName.Beach;
  const name: string = "Priobalno";
  const data = await makeTransformedAPIRequest(
    "https://king2.geosx.io/arso/_sx1/sxtables/sxid_drsv_d96_vvo_obc_obm/data/.json",
    bbox
  );
  return { name: layerName, data: data };
};

export { getWater };
