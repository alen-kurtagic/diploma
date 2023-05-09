import "./category.sass";
import Approver from "../Approver/Approver";

interface CategoryProps {
  title: string;
  subtitle: string;
  imgSrc: string;
  color: string;
}

const Category = ({ title, subtitle, imgSrc, color }: CategoryProps) => {
  return (
    <div className="category-container">
      <div className="category-header" style={{ backgroundColor: color }}>
        <img src={imgSrc}></img>
        <div className="titles">
          <p className="title">{title} soglasja</p>
          <p className="subtitle">{subtitle}</p>
        </div>
      </div>
      <div className="category-content">
        <Approver></Approver>
      </div>
    </div>
  );
};

export default Category;
