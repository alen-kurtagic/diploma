import { useContext, useState } from "react";
import { TractPageContext } from "../../TractPage";
import "./overview-element.sass";

interface OverviewElementProps {
  image: string;
  value?: string | number | undefined;
  more?: string | undefined;
  unit?: string | undefined;
  hint: string;
}
const OverviewElement = ({
  image,
  value,
  more,
  unit = undefined,
  hint,
}: OverviewElementProps) => {
  const tractContext = useContext(TractPageContext);

  const [isExpanded, setExpanded] = useState<boolean>(false);
  const [isHovering, setHovering] = useState<boolean>(false);

  const toggleExpanded = () => {
    setExpanded(!isExpanded);
  };

  if (!value) return <></>;

  return (
    <div className="overview-element" onClick={() => toggleExpanded()}>
      <img
        src={image}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      />
      <span>
        <p>
          {value ? value : "/"}
          {unit && <span className="unit"> {unit}</span>}
        </p>
        {/* {isExpanded && <p className="more">{more ? more : "/"}</p>} */}
      </span>

      {isHovering && <div className="hint">{hint}</div>}
    </div>
  );
};

export default OverviewElement;
