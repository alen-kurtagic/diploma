import { useNavigate } from "react-router-dom";
import "./navigation.sass";

const Header = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };
  return (
    <div className="navigation">
      <div className="back-container" onClick={handleClick}>
        <img src="src/assets/back.svg"></img>
      </div>
    </div>
  );
};

export default Header;
