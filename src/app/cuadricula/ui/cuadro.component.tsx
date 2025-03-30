import { memo, useEffect, useRef, useState } from "react";
import { useSelectedColor } from "../hook/useSelectColor";

export const CuadroComponent = memo(
  ({ rowIndex, colIndex }: { rowIndex: number; colIndex: number }) => {
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const [bgColor, setBgColor] = useState<string>("white");
    const { selectedColor, isPainting } = useSelectedColor();

    const cellRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      setBgColor(isSelected ? selectedColor : "white");
    }, [isSelected]);

    useEffect(() => {
      const cell = cellRef.current;
      if (!cell) return;

      const handleMouseEnter = () => {
        if (isPainting) {
          setIsSelected(true);
        }
      };

      const handleMouseDown = (e: MouseEvent) => {
        if (e.button === 0) {
          setIsSelected(!isSelected);
        }
      };

      // Add event listeners directly to DOM for better performance
      cell.addEventListener("mouseenter", handleMouseEnter);
      cell.addEventListener("mousedown", handleMouseDown);

      return () => {
        cell.removeEventListener("mouseenter", handleMouseEnter);
        cell.removeEventListener("mousedown", handleMouseDown);
      };
    }, [isPainting]);

    return (
      <div
        ref={cellRef}
        className="border border-gray-400"
        style={{
          backgroundColor: `${bgColor}`,
          width: "100%",
          height: "100%",
        }}
      ></div>
    );
  }
);
