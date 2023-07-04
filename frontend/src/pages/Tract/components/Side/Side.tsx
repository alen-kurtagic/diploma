import Permiters from "../Permits/Permits";
import Header from "../Header/Header";
import Overview from "../Overview/Overview";
import Navigation from "../Navigation/Navigation";
import Filter from "../Filter/Filter";
import "./side.sass";

const Side = () => {
  return (
    <div className="side-container">
      <div className="side-padding">
        <Navigation />
        <Header />
        <p className="section-title">Pregled</p>
        <Overview></Overview>
        {/* <p className="section-title">Pravni režim</p> */}
        {/* <Filter /> */}
      </div>
      {/* <Permiters /> */}
    </div>
  );
};

export default Side;
