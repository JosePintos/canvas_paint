import { ReactNode, useState } from "react";
import { GridContext } from "../context/grid.context";

export const GridProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCells, setSelectedCells] = useState(new Set<string>());
  const [isMouseDown, setIsMouseDown] = useState(false);

  const toggleCell = (row: number, col: number) => {
    setSelectedCells((prev) => {
      const newSet = new Set(prev);
      const key = `${row}-${col}`;
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  return (
    <GridContext.Provider
      value={{ selectedCells, toggleCell, isMouseDown, setIsMouseDown }}
    >
      {children}
    </GridContext.Provider>
  );
};
