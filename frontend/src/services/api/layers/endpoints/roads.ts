import { BBox } from "geojson";
import { makeTransformedAPIRequest } from "../apiWrapper";
import { LayerName } from "src/types/permitEnums";
import { LayerProps } from "src/pages/Tract/components/MapLayer/MapLayer";

const getRoads = async (bbox: BBox): Promise<LayerProps[]> => {
  const waterLayers: LayerProps[] = [
    await getNationalRoads(bbox),
    await getLocalRoads(bbox),
    await getRailways(bbox),
  ].map((waterLayer: any) => {
    waterLayer.opinion = "Mnenje za gradnjo z vidika varovanja javnih cest";
    ("Direkcija RDirekcija RS za infrastrukturo, Družba za avtoceste v Republiki Sloveniji");
    return waterLayer;
  });

  return waterLayers;
};

const getNationalRoads = async (bbox: BBox): Promise<LayerProps> => {
  const layerName = LayerName.NationalRoads;
  const name: string = "Državne ceste";
  const data = await makeTransformedAPIRequest(
    "https://king2.geosx.io/drsi/_sx1/sxtables/sxid_drsi_drz_ceste_d96/data/.json",
    bbox
  );
  return { name: layerName, data: data };
};

const getLocalRoads = async (bbox: BBox): Promise<LayerProps> => {
  const layerName = LayerName.LocalRoads;
  const name: string = "Občinske ceste";
  const data = await makeTransformedAPIRequest(
    "https://king2.geosx.io/drsi/_sx1/sxtables/sxid_drsi_drz_ceste_d96/data/.json",
    bbox
  );
  return { name: layerName, data: data };
};

const getRailways = async (bbox: BBox): Promise<LayerProps> => {
  const layerName = LayerName.Railways;
  const name: string = "Državne železnice";
  const data = await makeTransformedAPIRequest(
    "https://king2.geosx.io/drsi/_sx1/sxtables/sxid_drsi_drz_zeleznice_d96/data/.json",
    bbox
  );
  return { name: layerName, data: data };
};
export { getRoads };
