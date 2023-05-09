import React from "react";
import Category from "../Category/Category";
import "./categories.sass";

const Categories = () => {
  return (
    <div className="categories">
      <Category
        title="Kulturna"
        subtitle="Kulturna in dediška območja"
        imgSrc="src/assets/building.svg"
        color="#EFD48E"
      ></Category>
      <Category
        title="Energetska"
        subtitle="Varovana energetska območja"
        imgSrc="src/assets/lighting.svg"
        color="#FFF96B"
      ></Category>
      <Category
        title="Naravna"
        subtitle="Varovana naravna in gozdovna območja"
        imgSrc="src/assets/tree.svg"
        color="#A8DA81"
      ></Category>
      <Category
        title="Vodna"
        subtitle="Varovana vodna in podzemna območja"
        imgSrc="src/assets/drop.svg"
        color="#81D5FA"
      ></Category>
      <Category
        title="Transportna"
        subtitle="Varovana infrastrukturna območja"
        imgSrc="src/assets/truck.svg"
        color="#D9D9D9"
      ></Category>
    </div>
  );
};

export default Categories;
