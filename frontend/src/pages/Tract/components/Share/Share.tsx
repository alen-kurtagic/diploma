import { useState } from "react";
import "./share.sass";

const Share = () => {
  const [rotate, setRotation] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setRotation(true);
  };

  return (
    <div className="share">
      <input readOnly={true} value={window.location.href} />
      <img
        src="src/assets/copy.svg"
        className={rotate ? "rotate" : ""}
        onClick={handleCopy}
        onAnimationEnd={() => setRotation(false)}
      />
    </div>
  );
};

export default Share;
