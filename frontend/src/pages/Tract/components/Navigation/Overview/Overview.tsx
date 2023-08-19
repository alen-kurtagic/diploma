import { useContext, useMemo } from "react";
import { TractPageContext } from "src/pages/Tract/TractPage";
import OverviewItem from "../../OverviewItem/OverviewItem";
import { calculateArea, formatArea } from "src/utils/surfaceArea";
import "./overview.sass";
import { calculateCombinedValue } from "src/utils/value";

const Overview = () => {
  const tractContext = useContext(TractPageContext);

  // Tract
  const amount: number = tractContext.tract.features.length ?? 0;

  const ids: string = useMemo(
    () => tractContext.tract.features.map((feature) => feature.id).join(", "),
    [tractContext.tract.features]
  );

  // Area
  const { areaSum, areas } = useMemo(() => {
    let areaSum: number = 0;
    let areaEach: Array<string> = [];

    tractContext.tract.features.forEach((feature) => {
      const featureCollection: GeoJSON.FeatureCollection = {
        type: "FeatureCollection",
        features: [feature],
      };

      const calculatedArea = calculateArea(featureCollection);

      const { unit, area } = formatArea(calculatedArea);

      areaSum += calculatedArea;
      areaEach.push(`${area} ${unit}`);
    });

    const areas = areaEach.join(" + ");

    return { areaSum, areas };
  }, [tractContext.tract.features]);

  const { unit, area } = formatArea(areaSum);

  // Rating
  const { averageRating } = useMemo(() => {
    const ratings = tractContext.tract.features.map(
      (feature) => feature.properties?.quality
    );

    if (ratings.includes(null) || ratings.includes(undefined)) {
      return { averageRating: undefined };
    }

    const ratingSum = ratings.reduce((acc, rating) => acc + rating, 0);

    return { averageRating: ratingSum / ratings.length };
  }, [tractContext.tract.features]);

  return (
    <div className="overview">
      <OverviewItem
        image="src/assets/icons/home.svg"
        value={amount}
        hint="Parcela"
      />
      <OverviewItem
        image="src/assets/icons/area.svg"
        value={area}
        unit={unit}
        hint="Površina"
      />
      <OverviewItem
        image="src/assets/icons/quality.svg"
        value={averageRating ? averageRating.toFixed(0) : undefined}
        hint="Boniteta"
      />
    </div>
  );
};

export default Overview;
