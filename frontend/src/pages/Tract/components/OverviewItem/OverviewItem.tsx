import { useContext, useState } from "react";
import { TractPageContext } from "../../TractPage";
import "./overview-item.sass";

interface OverviewItemProps {
  image: string;
  value?: string | number;
  unit?: string;
  hint: string;
  hintColor?: string;
}

const OverviewItem = ({
  image,
  value,
  unit,
  hint,
  hintColor = "#C2C2C2",
}: OverviewItemProps) => {
  const [isExpanded, setExpanded] = useState<boolean>(false);
  const [isHovering, setHovering] = useState<boolean>(false);

  const toggleExpanded = () => {
    setExpanded(!isExpanded);
  };

  if (!value) return null;

  return (
    <div
      className="overview-item"
      onClick={toggleExpanded}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <img src={image} alt="" />
      <span>
        <p>
          {value ?? "/"}
          {unit && <span className="unit"> {unit}</span>}
        </p>
      </span>

      {isHovering && (
        <div
          className="hint"
          style={{
            backgroundColor: hintColor,
          }}
        >
          {hint}
        </div>
      )}
    </div>
  );
};

export default OverviewItem;
