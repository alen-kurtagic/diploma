import React from "react";
import TaskbarElement from "../TaskbarElement/TaskbarElement";
import "./taskbar.sass";

const Taskbar = () => {
  return (
    <div className="taskbar-container">
      <TaskbarElement
        imgSrc="src/assets/building.svg"
        color="#EFD48E"
      ></TaskbarElement>
      <TaskbarElement
        imgSrc="src/assets/lighting.svg"
        color="#FFF96B"
      ></TaskbarElement>
      <TaskbarElement
        imgSrc="src/assets/tree.svg"
        color="#A8DA81"
      ></TaskbarElement>
      <TaskbarElement
        imgSrc="src/assets/drop.svg"
        color="#81D5FA"
      ></TaskbarElement>
      <TaskbarElement
        imgSrc="src/assets/truck.svg"
        color="#D9D9D9"
      ></TaskbarElement>
    </div>
  );
};

export default Taskbar;
