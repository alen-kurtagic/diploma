import { useContext, useMemo } from "react";
import { TractPageContext } from "src/pages/Tract/TractPage";
import OverviewItem from "../OverviewItem/OverviewItem";
import { calculateArea, formatArea } from "src/utils/surfaceArea";
import { calculateCombinedValue, prettifyValue } from "src/utils/value";

const Property = () => {
  const tractContext = useContext(TractPageContext);

  const combinedOwners = useMemo(() => {
    return tractContext.tractApi.features.map(
      (feature) => feature.properties.LASTNIK_VSI
    ).length;
  }, [tractContext.tract.features]);

  const combinedValue = useMemo(() => {
    return tractContext.tractApi.features
      .map((feature) => {
        console.log(feature.properties);
        return calculateCombinedValue(feature.properties.POSPLOSENA_VREDNOST);
      })
      .reduce((previous, current) => (previous ?? 0) + (current ?? 0), 0);
  }, [tractContext.tract.features]);

  return (
    <div className="overview">
      <OverviewItem
        image="src/assets/icons/card.svg"
        value={prettifyValue(combinedValue) || "0 €"}
        hint="Cena"
      />
      {/* <OverviewItem
        image="src/assets/icons/person.svg"
        value={combinedOwners}
        hint="Lastnik"
      /> */}
    </div>
  );
};

export default Property;
