import React from "react";
import "./color-selector.css";
import { useSelectedColor } from "../../hook/useSelectColor";

interface ColorsSelectorProps {
  setIsMenuOpen: (visible: boolean) => void;
  isMenuOpen: boolean;
  position: { x: number; y: number };
  menuRef: React.RefObject<HTMLDivElement | null>;
}

const COLOR_OPTIONS = ["Red", "Blue", "Yellow", "Black", "Green"];

export const ColorsSelectorComponent: React.FC<ColorsSelectorProps> = ({
  setIsMenuOpen,
  isMenuOpen,
  position,
  menuRef,
}) => {
  const { setSelectedColor } = useSelectedColor();

  const handleColorChange = (color: string) => {
    setSelectedColor(color.toLowerCase());
    localStorage.setItem("mainColor", color.toLowerCase());
    setIsMenuOpen(false);
  };

  return (
    <div
      ref={menuRef}
      className={`absolute bg-white shadow-md rounded-md p-2 border border-gray-300 ${
        isMenuOpen ? "fade-enter" : "fade-exit"
      }`}
      style={{ top: position.y, left: position.x }}
      onMouseLeave={() => setIsMenuOpen(false)}
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
