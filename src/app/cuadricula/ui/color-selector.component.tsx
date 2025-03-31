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
      className="absolute bg-white shadow-md rounded-md p-2 border border-gray-300"
      style={{ top: position.y, left: position.x }}
    >
      <ul className="flex flex-row gap-1">
        {COLOR_OPTIONS.map((color) => (
          <li
            key={color}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-gray-100"
            onClick={() => handleColorChange(color)}
          >
            <div
              className="w-6 h-6 rounded border border-gray-300"
              style={{ backgroundColor: color }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
