export type SelectedColorContextType = {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  isPainting: boolean;
  setIsPainting: (isPainting: boolean) => void;
};
