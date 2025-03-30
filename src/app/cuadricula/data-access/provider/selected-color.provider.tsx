import { useState } from "react";
import { SelectedColorContext } from "../context/selected-color.context";

export const SelectedColorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedColor, setSelectedColor] = useState<string>(
    localStorage.getItem("mainColor") || "black"
  );
  const [isPainting, setIsPainting] = useState<boolean>(false);

  const handleSetSelectedColor = (option: string) => {
    setSelectedColor(option);
    localStorage.setItem("mainColor", option);
  };

  return (
    <SelectedColorContext.Provider
      value={{
        selectedColor,
        setSelectedColor: handleSetSelectedColor,
        isPainting,
        setIsPainting,
      }}
    >
      {children}
    </SelectedColorContext.Provider>
  );
};
