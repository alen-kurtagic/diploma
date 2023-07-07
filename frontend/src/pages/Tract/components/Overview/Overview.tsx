import { useContext } from "react";
import { TractPageContext } from "src/pages/Tract/TractPage";
import OverviewElement from "../OverviewElement/OverviewElement";
import { calculateArea, formatArea } from "src/utils/surfaceArea";
import "./overview.sass";

const Overview = () => {
  const tractContext = useContext(TractPageContext);

  // Tract
  const amount: number = tractContext.tract.features.length ?? 0;

  const ids: string | undefined = tractContext.tract.features
    .map((feature) => feature.id)
    .join(", ");
  //   const ids: string | undefined = tractContext.ids?.join(", ");

  // Area
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

  const { unit, area } = formatArea(areaSum);
  const areas = areaEach.join(" + ");

  // Rating
  let ratingSum: number = 0;
  let ratingEach: Array<string> = [];

  tractContext.tract.features.forEach((feature) => {
    const rating = feature.properties?.boniteta;
    ratingSum += rating;
    ratingEach.push(rating);
  });

  const averageRating = ratingSum / tractContext.tract.features.length;
  const ratings = ratingEach.join(", ");

  const planned_usage: Array<Array<any>> = tractContext.tract.features.map(
    (feature) =>
      feature.properties?.usage.map((usage: any) => [
        usage.opis_sl,
        usage.delez,
      ])
  );

  return (
    <div className="overview">
      <OverviewElement
        image="src/assets/home.svg"
        value={amount}
        more={ids}
        hint="Parcela"
      />
      <OverviewElement
        image="src/assets/area.svg"
        value={area}
        unit={unit}
        more={areas}
        hint="Površina"
      />
      <OverviewElement
        image="src/assets/rating.svg"
        value={averageRating}
        more={ratings}
        hint="Boniteta"
      />
    </div>
  );
};

export default Overview;
