import Permiters from "../Permits/Permits";
import Header from "../Header/Header";
import Overview from "../Overview/Overview";
import Navigation from "../Navigation/Navigation";
import Filter from "../Filter/Filter";
import "./side.sass";
import Usage from "../Usage/Usage";

const Side = () => {
  return (
    <div className="side-container">
      <div className="side-padding">
        <Navigation />
        <Header />
        <div className="section">
          <p className="title">Pregled</p>
          <div className="content">
            <Overview></Overview>
          </div>
        </div>
        <div className="section">
          <p className="title">Raba</p>
          <div className="content">
            <Usage></Usage>
          </div>
        </div>
        <div className="section">
          <p className="title">Pravni režim</p>

          <div className="content">
            <Filter />
          </div>
        </div>
      </div>
      <Permiters />
    </div>
  );
};

export default Side;
