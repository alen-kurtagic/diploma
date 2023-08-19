import { ReactNode, useContext } from "react";
import Permiters from "../LayersPanel/LayersPanel";
import Header from "../Header/Header";
import Overview from "../Navigation/Overview/Overview";
import Navigation from "../Navigation/Navigation";
import Filter from "../Filter/Filter";
import Usage from "../Landuses/Landuses";
import "./side-panel.sass";
import Section from "../Section/Section";
import Property from "../Property/Property";
import { TractPageContext } from "../../TractPage";

const Side = () => {
  const tractContext = useContext(TractPageContext);

  const hasNullValue = tractContext.tractApi.features.some(
    (feature: any) => feature.properties.POSPLOSENA_VREDNOST === null
  );
  return (
    <div className="side-container">
      <div className="side-padding">
        <Navigation />
        <Header />
        <Section title="Pregled">
          <Overview />
        </Section>
        {!hasNullValue && (
          <Section title="Vrednost">
            <Property />
          </Section>
        )}
        <Section title="Raba">
          <Usage />
        </Section>
        <Section title="Vsebina">
          <Filter />
        </Section>
      </div>
      <Permiters />
    </div>
  );
};

export default Side;
