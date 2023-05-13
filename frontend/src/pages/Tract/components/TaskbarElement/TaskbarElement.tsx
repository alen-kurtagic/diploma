import React, { useContext } from "react";
import "./taskbar-element.sass";
import { TractPageContext } from "src/pages/Tract/TractPage";
import { TractLayers } from "src/types/tractTypes";

interface TaskbarElementProps {
  id: string;
  color: string;
  imgSrc: string;
}

const TaskbarElement = ({ id, color, imgSrc }: TaskbarElementProps) => {
  const tractContext = useContext(TractPageContext);

  const handleClick = () => {
    const newLayers = { ...tractContext.layers };
    newLayers.culture.visibility = !newLayers.culture.visibility;
    tractContext.setLayers(newLayers);
  };

  return (
    <div
      className="taskbar-element-container"
      style={{ backgroundColor: color }}
      onClick={handleClick}
    >
      <img src={imgSrc}></img>
    </div>
  );
};

export default TaskbarElement;
