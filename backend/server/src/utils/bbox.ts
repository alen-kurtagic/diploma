import { BBox } from "geojson";

const formatBbox = (bbox: string): BBox => {
  try {
    const [x1, y1, x2, y2] = bbox.split(",").map(Number);

    return sortBbox([x1, y1, x2, y2]);
  } catch (error) {
    throw new TypeError(`Incorect bbox parameter`);
  }
};

const sortBbox = (bbox: BBox): BBox => {
  try {
    const [x1, y1, x2, y2] = bbox;

    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);

    return [minX, minY, maxX, maxY];
  } catch (error) {
    throw new TypeError(`Incorect bbox parameter`);
  }
};

export { formatBbox, sortBbox };
