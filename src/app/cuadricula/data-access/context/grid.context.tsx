import { createContext } from "react";

export const GridContext = createContext<{
  selectedCells: Set<string>;
  toggleCell: (row: number, col: number) => void;
  isMouseDown: boolean;
  setIsMouseDown: (value: boolean) => void;
} | null>(null);
