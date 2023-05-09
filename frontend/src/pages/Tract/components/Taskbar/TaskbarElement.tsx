import React from "react";
import "./taskbar.sass";

interface TaskbarElementProps {
  color: string;
  imgSrc: string;
}

const TaskbarElement = ({ color, imgSrc }: TaskbarElementProps) => {
  return (
    <div
      className="taskbar-element-container"
      style={{ backgroundColor: color }}
    >
      <img src={imgSrc}></img>
    </div>
  );
};

export default TaskbarElement;
