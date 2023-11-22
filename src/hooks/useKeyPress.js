import { useEffect, useState } from "react";

export const useKeyPress = (targetKeys) => {
    const [keyPressed, setKeyPressed] = useState("");
  
    useEffect(() => {
      const downHandler = ({ key }) => {
        if (targetKeys.includes(key)) {
          setKeyPressed(key);
        }
      };
  
      const upHandler = ({ key }) => {
        if (targetKeys.includes(key)) {
          setKeyPressed("");
        }
      };
  
      window.addEventListener('keydown', downHandler);
      window.addEventListener('keyup', upHandler);
  
      return () => {
        window.removeEventListener('keydown', downHandler);
        window.removeEventListener('keyup', upHandler);
      };
    }, [...targetKeys]);
  
    return keyPressed;
  };