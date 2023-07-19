import { ReactNode } from "react";
import Permiters from "../LayersPanel/LayersPanel";
import Header from "../Header/Header";
import Overview from "../Overview/Overview";
import Navigation from "../Navigation/Navigation";
import Filter from "../Filter/Filter";
import Usage from "../Landuses/Landuses";
import "./side-panel.sass";
import Section from "../Section/Section";

const Side = () => (
  <div className="side-container">
    <div className="side-padding">
      <Navigation />
      <Header />
      <Section title="Pregled">
        <Overview />
      </Section>
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

export default Side;
