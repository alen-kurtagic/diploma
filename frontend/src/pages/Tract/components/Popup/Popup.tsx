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
import { calculateCombinedValue, prettifyValue } from "src/utils/value";

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
  const isParcel = name === "Parcela" || name === "Sosed";

  const { data } = useQuery<GeoJSON.Feature | null>(
    ["organization", properties],
    () => getOrganization(layerData.regNo || properties["MAT_ST"]),
    {
      enabled: !isParcel,
      onSuccess: (data) => {
        setOrganization(data);
      },
    }
  );

  const prepareParcelPopup = () => {
    const apiDataSource =
      name === "Parcela" ? tractContext.tractApi : tractContext.neighboursApi;
    const apiData = apiDataSource.features.find(
      (apiFeature) =>
        apiFeature.properties!.EID_PARCEL === feature.properties!.parcel_id
    );
    console.log(apiData);
    const landuse = JSON.parse(properties.landuse);
    const calculatedArea = calculateArea({
      type: "FeatureCollection",
      features: [feature],
    });

    let { unit, area } = formatArea(calculatedArea);
    const combinedValue = calculateCombinedValue(
      apiData?.properties.POSPLOSENA_VREDNOST?.toString() || null
    );
    const owner = apiData?.properties.LASTNIK_VSI
      ? capitalizeFirstLetter(
          apiData?.properties.LASTNIK_VSI.split("-")[1].split(",")[0]
        )
      : undefined;

    return (
      <>
        <Section title="Pregled">
          <div className="overview">
            <OverviewItem
              image="src/assets/icons/home.svg"
              value={apiData?.properties.ST_PARCELE}
              hint="Id"
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
        {(combinedValue || owner) && (
          <Section title="Vrednost">
            <div className="overview">
              <OverviewItem
                image="src/assets/icons/card.svg"
                value={prettifyValue(combinedValue) || "/ €"}
                hint="Cena"
              />
              <OverviewItem
                image="src/assets/icons/person.svg"
                value={owner}
                hint="Lastnik"
              />
            </div>
          </Section>
        )}
        {name === "Parcela" && (
          <Section title="Raba">
            <div className="overview">
              {landuse.map(({ landuse, share, code }: any) => {
                const landuseData = getHighestLanduse(code);
                return (
                  <OverviewItem
                    image={landuseData.img}
                    value={capitalizeFirstLetter(landuse)}
                    hint={`${share} %`}
                    hintColor={landuseData.color}
                  />
                );
              })}
            </div>
          </Section>
        )}
      </>
    );
  };

  const prepareAreaPopup = () => {
    return (
      <>
        {layerData.properties && layerData.properties.length > 0 && (
          <Section title="Pregled">
            <div className="overview">
              <OverviewItem
                image="src/assets/icons/info.svg"
                value={
                  capitalizeFirstLetter(
                    properties[layerData.properties[0]] || "/"
                  ) +
                  (layerData.properties.length > 1
                    ? ` (${properties[layerData.properties[1]]})`
                    : "")
                }
                hint="Več"
              />
            </div>
          </Section>
        )}
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
  };

  const popupContent = isParcel ? prepareParcelPopup() : prepareAreaPopup();

  return (
    <div className="popup" onClick={stopPropagation}>
      <div className="close" onClick={onClose}>
        <img src="/src/assets/icons/minimize.svg" />
      </div>
      <p className="title">{name}</p>
      {popupContent}
    </div>
  );
};

export default Popup;
