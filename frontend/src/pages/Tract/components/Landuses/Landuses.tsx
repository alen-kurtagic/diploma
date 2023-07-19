import { useContext, useState } from "react";
import { TractPageContext } from "src/pages/Tract/TractPage";
import "./landuses.sass";
import { getHighestLanduse } from "src/types/landuse";

const Landuses = () => {
  const tractContext = useContext(TractPageContext);

  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const usageCategoryMap = new Map();
  tractContext.tract.features.forEach((feature) => {
    const landuses = feature.properties?.landuse || [];
    landuses.forEach((landuse: any) => {
      const category = getHighestLanduse(landuse.code);
      usageCategoryMap.set(category.hint, category);
    });
  });

  const uniqueUsageCategories = Array.from(usageCategoryMap.values());
  return (
    <div className="landuses">
      {uniqueUsageCategories.map((usageCategory: any) => {
        const { img, color, hint } = usageCategory;
        return (
          <div
            key={color}
            className="landuse"
            onMouseEnter={() => setHoveredId(hint)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <img src={img} alt={hint} />
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
        );
      })}
    </div>
  );
};

export default Landuses;
