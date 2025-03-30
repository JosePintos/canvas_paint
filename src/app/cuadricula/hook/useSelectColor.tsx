import { useContext } from "react";
import { SelectedColorContext } from "../data-access/context/selected-color.context";

export const useSelectedColor = () => {
  const context = useContext(SelectedColorContext);
  if (!context) {
    throw new Error("useSelectedColor outside of SelectedColorProvider");
  }
  return context;
};
