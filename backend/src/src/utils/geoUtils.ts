const formatBbox = (bbox: string): Array<number> => {
  try {
    const [x1, y1, x2, y2] = bbox.split(",").map(Number);

    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);

    return [minX, minY, maxX, maxY];
  } catch (error) {
    throw new TypeError(`Incorect bbox parameter`);
  }
};

export { formatBbox };
