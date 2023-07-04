import { BBox } from "geojson";
import { PermitLayer } from "src/types/tractTypes";
import { getCulture } from "./layers/culture";
import { getNature } from "./layers/nature";
import { getWater } from "./layers/water";
import { getInfrastructure } from "./layers/infrastructure";
import { getEnergy } from "./layers/energy";

const getAllAPILayers = async (bbox: BBox) => {
  const cultureLayers = await getCulture(bbox);
  const natureLayers = await getNature(bbox);
  const waterLayers = await getWater(bbox);
  const energyLayers = await getEnergy(bbox);
  const infrastructureLayers = await getInfrastructure(bbox);

  return [
    ...cultureLayers,
    ...natureLayers,
    ...waterLayers,
    ...energyLayers,
    ...infrastructureLayers,
  ];
};

export default getAllAPILayers;
