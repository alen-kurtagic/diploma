import { useContext } from "react";
import Category from "../Permit/Permit";
import "./permits.sass";
import { TractPageContext } from "../../TractPage";
import { categoryMapping } from "src/types/permitEnums";

const Permits = () => {
  const tractContext = useContext(TractPageContext);

  const filteredPermiters = tractContext.permitLayers.filter((permit) => {
    const category = categoryMapping[permit.category];

    return category.title
      .toLowerCase()
      .startsWith(tractContext.filter.toLowerCase());
  });

  return (
    <div className="permits">
      {filteredPermiters.map((permit) => (
        <Category
          key={permit.data.features[0].properties!.id}
          category={permit.category}
          difficulty={permit.difficulty}
          visibility={permit.visibility}
          data={permit.data}
        />
      ))}
    </div>
  );
};

export default Permits;
