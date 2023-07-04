enum Category {
  Culture = "Kultura",
  Energy = "Energija",
  Nature = "Narava",
  Water = "Voda",
  Infrastructure = "Infrastuktura",
}

interface CategoryData {
  title: string;
  permits: Array<string>;
  color: string;
  image: string;
}

const categoryMapping: Record<Category, CategoryData> = {
  [Category.Culture]: {
    title: "Kultura",
    permits: ["Kulturnovarstveno soglasje za posege"],
    color: "#EFD48E",
    image: "src/assets/building.svg",
  },
  [Category.Energy]: {
    title: "Energija",
    permits: [
      "Soglasje v zvezi z energetskimi sistemi",
      // "Soglasje z vidika varovanja energetskih sistemov",
    ],
    color: "#FFF96B",
    image: "src/assets/lighting.svg",
  },
  [Category.Nature]: {
    title: "Narava",
    permits: ["Naravovarstveno soglasje"],
    color: "#A8DA81",
    image: "src/assets/tree.svg",
  },
  [Category.Water]: {
    title: "Voda",
    permits: ["Vodno soglasje"],
    color: "#81D5FA",
    image: "src/assets/drop.svg",
  },
  [Category.Infrastructure]: {
    title: "Infrastuktura",
    permits: ["Soglasje za gradnjo z vidika varovanja železnic"],
    color: "#D9D9D9",
    image: "src/assets/truck.svg",
  },
  // Add more mappings for additional categories
};

export { Category, categoryMapping };
export type { CategoryData };
