import React, { FC, ReactNode, useState } from "react";
import "./tooltip.sass";

interface TooltipProps {
  children: ReactNode;
  tooltipText: string;
}

const Tooltip: FC<TooltipProps> = ({ children, tooltipText }) => {
  const [hovering, setHovering] = useState(false);

  return (
    <div
      className="tooltip-container"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {children}
      {hovering && <div className="tooltip">{tooltipText}</div>}
    </div>
  );
};

export default Tooltip;
