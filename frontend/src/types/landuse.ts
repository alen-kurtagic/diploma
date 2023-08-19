const getHighestLanduse = (
  code: number
): { img: string; color: string; hint: string } => {
  if (code >= 10000 && code < 20000) {
    return {
      img: "src/assets/landuse/building.svg",
      color: "#AD3C3C",
      hint: "Stavbna",
    };
  } else if (code >= 20000 && code < 30000) {
    return {
      img: "src/assets/landuse/wheat.svg",
      color: "#FBB41A",
      hint: "Kmetijska",
    };
  } else if (code >= 30000 && code < 40000) {
    return {
      img: "src/assets/landuse/leaf.svg",
      color: "#A8DA81",
      hint: "Gozdna",
    };
  } else if (code >= 40000 && code < 50000) {
    return {
      img: "src/assets/landuse/drop.svg",
      color: "#81D5FA",
      hint: "Vodna",
    };
  } else if (code >= 50000 && code < 60000) {
    return {
      img: "src/assets/landuse/coal.svg",
      color: "#787878",
      hint: "Druga",
    };
  }
  return {
    img: "src/assets/icons/x.svg",
    color: "#C2C2C2",
    hint: "Nedefinirano",
  };
};

export { getHighestLanduse };
