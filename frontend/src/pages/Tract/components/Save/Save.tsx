import { useState } from "react";
import "./save.sass";

const Save = ({ suggested }: { suggested: string }) => {
  const [rotate, setRotation] = useState<boolean>(false);

  const handleSave = () => {
    navigator.clipboard.writeText(window.location.href);
    setRotation(true);
  };

  const [inputValue, setInputValue] = useState<string>(suggested);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  return (
    <div className="save">
      <input readOnly={false} value={inputValue} onChange={handleInputChange} />
      <img
        src="src/assets/save.svg"
        className={rotate ? "rotate" : ""}
        onClick={handleSave}
        onAnimationEnd={() => setRotation(false)}
      />
    </div>
  );
};

export default Save;
