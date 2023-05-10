import React, { useContext } from "react";
import "./taskbar-element.sass";
import { TractPageContext } from "src/pages/Tract/TractPage";

interface TaskbarElementProps {
  id: string;
  color: string;
  imgSrc: string;
}

const TaskbarElement = ({ id, color, imgSrc }: TaskbarElementProps) => {
  const appContext = useContext(TractPageContext);

  const handleClick = () => {
    appContext.setLayers({
      culture: !appContext.layers.culture,
    });
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
