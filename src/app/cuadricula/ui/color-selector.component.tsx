import React from "react";
import { useSelectedColor } from "../hook/useSelectColor";

interface ColorsSelectorProps {
  setMenuVisible: (visible: boolean) => void;
  position: { x: number; y: number };
}

const COLOR_OPTIONS = ["Red", "Blue", "Yellow", "Black", "Green"];

export const ColorsSelectorComponent: React.FC<ColorsSelectorProps> = ({
  setMenuVisible,
  position,
}) => {
  const { setSelectedColor } = useSelectedColor();

  const handleColorChange = (color: string) => {
    setSelectedColor(color.toLowerCase());
    localStorage.setItem("mainColor", color.toLowerCase());
    setMenuVisible(false);
  };

  return (
    <div
      className="absolute bg-blue-400 shadow-md rounded-md p-2 text-black"
      style={{ top: position.y, left: position.x }}
    >
      <ul>
        {COLOR_OPTIONS.map((color) => (
          <li
            key={color}
            className="p-2 hover:bg-gray-300 cursor-pointer"
            onClick={() => handleColorChange(color)}
          >
            {color}
          </li>
        ))}
      </ul>
    </div>
  );
};
