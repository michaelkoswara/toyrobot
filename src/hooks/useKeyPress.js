import { useEffect, useState } from "react";

export const useKeyPress = (targetKeys) => {
  const [keyPressed, setKeyPressed] = useState("");
  const [nonTargetKeyPressed, setNonTargetKeyPressed] = useState("");
  const targetedKeys = [...targetKeys];

  useEffect(() => {
    const downHandler = ({ key }) => {
      if (targetKeys.includes(key)) {
        setKeyPressed(key);
      } else {
        setNonTargetKeyPressed(key);
      }
    };

    const upHandler = ({ key }) => {
      if (targetKeys.includes(key)) {
        setKeyPressed("");
      } else {
        setNonTargetKeyPressed("");
      }
    };

    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [targetedKeys]);

  return [keyPressed, nonTargetKeyPressed];
};
