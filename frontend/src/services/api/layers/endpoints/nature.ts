import { BBox } from "geojson";
import { makeTransformedAPIRequest } from "../apiWrapper";
import { LayerName } from "src/types/permitEnums";
import { LayerProps } from "src/pages/Tract/components/MapLayer/MapLayer";

const getNature = async (bbox: BBox): Promise<LayerProps[]> => {
  const natureLayers: LayerProps[] = [
    await getNatura2000(bbox),
    await getNatureProtected(bbox),
    await getNatureImportant(bbox),
  ].map((natureLayer: any) => {
    natureLayer.opinion = "Naravovarstveno mnenje";
    natureLayer.authority = "Ministrstvo za okolje";
    return natureLayer;
  });

  return natureLayers;
};

const getNatura2000 = async (bbox: BBox): Promise<LayerProps> => {
  const layerName = LayerName.Nature2000;
  const name: string = "Natura 2000";
  const data = await makeTransformedAPIRequest(
    "https://king2.geosx.io/arso/_sx1/sxtables/sxid_arso_d96_natura2000/data/.json",
    bbox
  );
  return { name: layerName, data: data };
};

const getNatureProtected = async (bbox: BBox): Promise<LayerProps> => {
  const layerName = LayerName.NatureProtected;
  const name: string = "Zavarovana območja";
  const data = await makeTransformedAPIRequest(
    "https://king2.geosx.io/arso/_sx1/sxtables/sxid_arso_d96_zasc_obmocja/data/.json",
    bbox
  );
  return { name: layerName, data: data };
};

const getNatureImportant = async (bbox: BBox): Promise<LayerProps> => {
  const layerName = LayerName.NatureImportant;
  const name: string = "Naravno pomembna območja";
  const data = await makeTransformedAPIRequest(
    "https://king2.geosx.io/arso/_sx1/sxtables/sxid_arso_d96_regist_nar_vred_obmoc/data/.json",
    bbox
  );
  return { name: layerName, data: data };
};

export { getNature, getNatureProtected, getNatureImportant };
