import { BBox } from "geojson";
import { makeTransformedAPIRequest } from "../apiWrapper";
import { LayerName } from "src/types/permitEnums";
import { LayerProps } from "src/pages/Tract/components/MapLayer/MapLayer";

const getInfrastructure = async (bbox: BBox): Promise<LayerProps[]> => {
  const infrastructureLayers: LayerProps[] = [
    await getRoads(bbox),
    await getRailways(bbox),
    await getSewer(bbox),
    await getWaterSupply(bbox),
    await getEnergySupply(bbox),
    await getGasSupply(bbox),
  ].map((infrastructureLayer: any) => {
    infrastructureLayer.opinion = "Občinsko mnenje";
    infrastructureLayer.authority = "Agencija za /";
    return infrastructureLayer;
  });

  return infrastructureLayers;
};

const getRoads = async (bbox: BBox): Promise<LayerProps> => {
  const layerName = LayerName.Roads;
  const name: string = "Ceste";
  const data = await makeTransformedAPIRequest(
    "https://king2.geosx.io/gurs/_sx1/sxtables/sxid_gurs_d96_gji_vp_cest/data/.json",
    bbox
  );
  return { name: layerName, data: data };
};

const getRailways = async (bbox: BBox): Promise<LayerProps> => {
  const layerName = LayerName.Railways;
  const name: string = "Železnica";
  const data = await makeTransformedAPIRequest(
    "https://king2.geosx.io/gurs/_sx1/sxtables/sxid_gurs_d96_gji_vp_zel/data/.json",
    bbox
  );
  return { name: layerName, data: data };
};

const getSewer = async (bbox: BBox): Promise<LayerProps> => {
  const layerName = LayerName.Sewer;
  const name: string = "Kanalizacija";
  const data = await makeTransformedAPIRequest(
    "https://king2.geosx.io/gurs/_sx1/sxtables/sxid_gurs_d96_gji_vp_kana/data/.json",
    bbox
  );
  return { name: layerName, data: data };
};

const getWaterSupply = async (bbox: BBox): Promise<LayerProps> => {
  const layerName = LayerName.WaterSupply;
  const name: string = "Dovod vode";
  const data = await makeTransformedAPIRequest(
    "https://king2.geosx.io/gurs/_sx1/sxtables/sxid_gurs_d96_gji_vp_voda/data/.json",
    bbox
  );
  return { name: layerName, data: data };
};

const getEnergySupply = async (bbox: BBox): Promise<LayerProps> => {
  const layerName = LayerName.EnergySupply;
  const name: string = "Dovod elektrike";
  const data = await makeTransformedAPIRequest(
    "https://king2.geosx.io/gurs/_sx1/sxtables/sxid_gurs_d96_gji_vp_elek/data/.json",
    bbox
  );
  return { name: layerName, data: data };
};

const getGasSupply = async (bbox: BBox): Promise<LayerProps> => {
  const layerName = LayerName.GasSupply;
  const name: string = "Dovod plina";
  const data = await makeTransformedAPIRequest(
    "https://king2.geosx.io/gurs/_sx1/sxtables/sxid_gurs_d96_gji_vp_plin/data/.json",
    bbox
  );
  return { name: layerName, data: data };
};

export { getInfrastructure };
