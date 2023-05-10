import React from "react";
import TaskbarElement from "../TaskbarElement/TaskbarElement";
import "./taskbar.sass";

const Taskbar = () => {
  return (
    <div className="taskbar-container">
      <TaskbarElement
        id="culture"
        imgSrc="src/assets/building.svg"
        color="#EFD48E"
      ></TaskbarElement>
      <TaskbarElement
        id="energy"
        imgSrc="src/assets/lighting.svg"
        color="#FFF96B"
      ></TaskbarElement>
      <TaskbarElement
        id="nature"
        imgSrc="src/assets/tree.svg"
        color="#A8DA81"
      ></TaskbarElement>
      <TaskbarElement
        id="water"
        imgSrc="src/assets/drop.svg"
        color="#81D5FA"
      ></TaskbarElement>
      <TaskbarElement
        id="transport"
        imgSrc="src/assets/truck.svg"
        color="#D9D9D9"
      ></TaskbarElement>
    </div>
  );
};

export default Taskbar;
