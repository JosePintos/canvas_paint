import { createContext } from "react";
import { SelectedColorContextType } from "../types/selected-color.type";

export const SelectedColorContext = createContext<
  SelectedColorContextType | undefined
>(undefined);
