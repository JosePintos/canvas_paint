import { memo } from "react";
import { CuadroComponent } from "./cuadro.component";

export const GridRow = memo(
  ({ rowIndex, columnsCount }: { rowIndex: number; columnsCount: number }) => {
    return (
      <>
        {Array.from({ length: columnsCount }).map((_, colIndex) => (
          <CuadroComponent
            key={`${rowIndex}-${colIndex}`}
            rowIndex={rowIndex}
            colIndex={colIndex}
          />
        ))}
      </>
    );
  }
);
