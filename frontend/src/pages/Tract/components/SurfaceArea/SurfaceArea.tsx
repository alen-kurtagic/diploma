import { useContext } from "react";
import { calculateTotalSurfaceArea } from "src/utils/calculateSurfaceARea";
import { TractPageContext } from "../../TractPage";
import "./surface-area.sass";

const SurfaceArea = () => {
  const appContext = useContext(TractPageContext);

  if (!appContext.fetchedData) return;

  const calculatedArea: number = calculateTotalSurfaceArea(
    appContext.fetchedData.tract?.geoJson
  );

  function formatArea(areaInSquareMeters: number) {
    const areaInSquareKilometers = areaInSquareMeters / 10000;
    const unit = areaInSquareKilometers < 0.1 ? "m²" : "ha";
    // const unit = areaInSquareKilometers < 0.1 ? "m²" : "km²";
    const area =
      areaInSquareKilometers < 0.1
        ? areaInSquareMeters.toFixed(0)
        : areaInSquareKilometers.toFixed(1);

    return {
      unit: unit,
      area: area,
    };
  }

  const { unit, area } = formatArea(calculatedArea);
  return (
    <div className="area-container">
      <p>
        {area}
        <span className="unit">{unit}</span>
      </p>
    </div>
  );
};

export default SurfaceArea;
