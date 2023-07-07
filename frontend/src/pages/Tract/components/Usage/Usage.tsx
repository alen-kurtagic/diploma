import { useContext, useState } from "react";
import { TractPageContext } from "src/pages/Tract/TractPage";
import "./usage.sass";

const Usage = () => {
  const tractContext = useContext(TractPageContext);

  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const getUsageCategory = (
    code: number
  ): { img: string; color: string; hint: string } => {
    if (code >= 10000 && code < 20000) {
      return {
        img: "src/assets/building.svg",
        color: "#AD3C3C",
        hint: "Stavbna",
      };
    } else if (code >= 20000 && code < 30000) {
      return {
        img: "src/assets/wheat.svg",
        color: "#FBB41A",
        hint: "Kmetijska",
      };
    } else if (code >= 30000 && code < 40000) {
      return {
        img: "src/assets/leaf.svg",
        color: "#A8DA81",
        hint: "Gozdna",
      };
    } else if (code >= 40000 && code < 50000) {
      return {
        img: "src/assets/drop.svg",
        color: "#81D5FA",
        hint: "Vodna",
      };
    } else if (code >= 50000 && code < 60000) {
      return {
        img: "src/assets/lightning.svg",
        color: "#FFF96B",
        hint: "Druga",
      };
    }
    return {
      img: "src/assets/x.svg",
      color: "#C2C2C2",
      hint: "Nedefinirano",
    };
  };

  const usageCategoryMap = new Map();
  tractContext.tract.features
    .flatMap((feature) => feature.properties?.landuse || [])
    .map((landuse) => getUsageCategory(landuse.code))
    .forEach((category) => usageCategoryMap.set(category.hint, category));

  const uniqueUsageCategories = Array.from(usageCategoryMap.values());
  console.log(uniqueUsageCategories);
  return (
    <div className="usages">
      {uniqueUsageCategories.map((usageCategory: any) => {
        const { img, color, hint } = usageCategory;
        return (
          <div
            key={color}
            className="usage"
            onMouseEnter={() => setHoveredId(hint)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <img src={img} />
            {hoveredId === hint && (
              <div
                className="hint"
                style={{
                  backgroundColor: color,
                }}
              >
                {hint}
              </div>
            )}
          </div>

          // <OverviewElement
          //   key={usage.opis_sl + " " + usage.delez} // use a unique key for each child in a list
          //   image={img}
          //   value={capitalizeFirstLetter(usage.opis_sl)} // assuming you want to display 'delez' as value
          //   hint={usage.delez + "%"}
          //   hintColor={color}
          //   // more={} // add what you want to pass to 'more' prop
          // />
        );
      })}
    </div>
  );
};

export default Usage;
