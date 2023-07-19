import React, { useContext, useState } from "react";
import { TractPageContext } from "../../TractPage";
import Chart from "../Chart/Chart";
import "./popup.sass";
import { calculateIntersectionPercentage } from "src/utils/intersection";
import { calculateArea, formatArea } from "src/utils/surfaceArea";
import OverviewItem from "../OverviewItem/OverviewItem";
import getOrganization from "src/services/api/organizations/organization";
import { useQuery } from "react-query";
import Section from "../Section/Section";
import { capitalizeFirstLetter } from "src/utils/stringManipulation";
import { LayerData } from "src/types/permitEnums";
import { getHighestLanduse } from "src/types/landuse";

interface PopupProps {
  name: string;
  layerData: LayerData;
  feature: GeoJSON.Feature;
  onClose: () => void;
}
const Popup = ({ name, layerData, feature, onClose }: PopupProps) => {
  const tractContext = useContext(TractPageContext);

  const stopPropagation = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const [organization, setOrganization] = useState<GeoJSON.Feature | null>(
    null
  );

  const properties = feature.properties!;

  const isParcel = name == "Parcela";
  const { data } = useQuery<GeoJSON.Feature | null>(
    ["organization", properties],
    () => getOrganization(layerData.regNo || properties["MAT_ST"]),
    {
      enabled: !isParcel, // Only run the query if it is not `Parcel0` layer
      onSuccess: (data) => {
        setOrganization(data);
      },
    }
  );

  let parcelPopup = <></>;
  let areaPopup = <></>;
  console.log(feature.properties);

  if (isParcel) {
    const landuse = JSON.parse(properties.landuse);
    console.log(landuse);
    const landuseJoined = landuse
      .map((landuse: any) => landuse.landuse)
      .join(", ");
    const calculatedArea = calculateArea({
      type: "FeatureCollection",
      features: [feature],
    });

    let { unit, area } = formatArea(calculatedArea);

    // getHighestLanduse;
    parcelPopup = (
      <>
        <Section title="Pregled">
          <div className="overview">
            <OverviewItem
              image="src/assets/icons/home.svg"
              value={feature.properties?.parcel_id}
              hint="Šifra"
            />
            <OverviewItem
              image="src/assets/icons/area.svg"
              value={area}
              unit={unit}
              hint="Površina"
            />
            <OverviewItem
              image="src/assets/icons/quality.svg"
              value={feature.properties?.quality}
              hint="Boniteta"
            />
          </div>
        </Section>
        <Section title="Raba">
          <div className="overview">
            {landuse.map(({ landuse, share, code }: any) => {
              const landuseData = getHighestLanduse(code);
              return (
                <OverviewItem
                  image={landuseData.img}
                  value={
                    capitalizeFirstLetter(landuse)
                    // + ` (${share}%)`
                    // (share == 100 ? "" : ` (${share}%)`)
                  }
                  hint={`${share} %`}
                  hintColor={landuseData.color}
                />
              );
            })}
          </div>
        </Section>
      </>
    );
  } else {
    const percentage = calculateIntersectionPercentage(tractContext.tract, {
      type: "FeatureCollection",
      features: [feature],
    });
    let info = "Ni podatkov";
    if (name == "Varstvo voda") info = properties["SODRSV_IME"];
    else if (name == "Elektrika") info = properties["OPIS"];

    areaPopup = (
      <>
        {/* <Chart percentage={percentage} showText={true} /> */}
        <Section title="Pregled">
          <div className="overview">
            <OverviewItem
              image="src/assets/icons/info.svg"
              value={JSON.stringify(properties.OPIS, null, 2)}
              hint="Več"
            />
          </div>
        </Section>
        <Section title="Mnenje">
          <div className="overview">
            <OverviewItem
              image="src/assets/icons/document.svg"
              value={layerData.permit}
              hint="Mnenje"
            />
            <OverviewItem
              image="src/assets/icons/home_tick.svg"
              value={capitalizeFirstLetter(organization?.properties?.NAZIV)}
              hint="Dajalec"
            />
          </div>
        </Section>
      </>
    );
  }
  return (
    <div className="popup" onClick={stopPropagation}>
      <div className="close" onClick={onClose}>
        <img src="/src/assets/icons/minimize.svg" />
      </div>
      <p
        className="title"
        // style={{ color: layerData.color }}
      >
        {name}
      </p>
      {(isParcel && parcelPopup) || areaPopup}
    </div>
  );
};

export default Popup;
