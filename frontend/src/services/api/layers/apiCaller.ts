import { BBox } from "geojson";
// import { PermitLayer } from "src/types/tractTypes";
import { getCulture } from "./endpoints/culture";
import { getNature } from "./endpoints/nature";
import { getWater } from "./endpoints/water";
import { getInfrastructure } from "./endpoints/infrastructure";
import { getFarming } from "./endpoints/farming";
import { getHydromelioration } from "./endpoints/hydromelioration";
import { getForest } from "./endpoints/forest";
import { getRoads } from "./endpoints/roads";
import { getWildlife } from "./endpoints/wildlife";
import { getCaves } from "./endpoints/caves";
import { LayerProps } from "src/pages/Tract/components/MapLayer/MapLayer";

const getAllAPILayers = async (bbox: BBox): Promise<LayerProps[]> => {
  const cultureLayers = await getCulture(bbox);
  const natureLayers = await getNature(bbox);
  const forestLayers = await getForest(bbox);
  const waterLayers = await getWater(bbox);
  const farmingLayers = await getFarming(bbox);
  const hydromeliorationLayers = await getHydromelioration(bbox);
  const infrastructureLayers = await getInfrastructure(bbox);
  const roadsLayers = await getRoads(bbox);
  const wildlifeLayers = await getWildlife(bbox);
  const cavesLayers = await getCaves(bbox);

  return [
    ...cavesLayers,
    ...wildlifeLayers,
    ...infrastructureLayers,
    ...roadsLayers,
    // ...farmingLayers,
    ...hydromeliorationLayers,
    ...forestLayers,
    ...natureLayers,
    ...cultureLayers,
    ...waterLayers,
  ];
};

export default getAllAPILayers;
