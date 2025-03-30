import { useContext } from "react";
import { GridContext } from "../data-access/context/grid.context";

export const useGrid = () => {
  const context = useContext(GridContext);
  if (!context) {
    throw new Error("useGrid must be used within a GridProvider");
  }
  return context;
};
