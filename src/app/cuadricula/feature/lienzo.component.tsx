import { useCallback, useEffect, useRef, useState } from "react";
import { CuadroComponent } from "../ui/cuadro.component";
import { ColorsSelectorComponent } from "../ui/color-selector.component";
import { useSelectedColor } from "../hook/useSelectColor";
import { GridRow } from "../ui/grid-row.component";

export const LienzoComponent = () => {
  const [squareHeight, setSquareHeight] = useState(window.innerHeight / 100);
  const [cellsColumns, setCellsColumns] = useState(
    Math.floor(window.innerWidth / squareHeight)
  );
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const { setIsPainting } = useSelectedColor();

  const gridRef = useRef<HTMLDivElement>(null);

  // Throttled resize handler
  const resizeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleOpenMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setPosition({ x: event.clientX, y: event.clientY });
    setIsMenuOpen(true);
  };

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button === 0) {
        // Left click only
        setIsPainting(true);
      }
    },
    [setIsPainting]
  );

  const handleMouseUp = useCallback(() => {
    setIsPainting(false);
  }, [setIsPainting]);

  useEffect(() => {
    const updateSize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }

      resizeTimeoutRef.current = setTimeout(() => {
        const newSquareHeight = window.innerHeight / 100;
        setSquareHeight(newSquareHeight);
        setCellsColumns(Math.floor(window.innerWidth / newSquareHeight));
      }, 100);
    };

    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsPainting(false);
    };

    window.addEventListener("mouseup", handleGlobalMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [setIsPainting]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseUp]);

  const rowIndices = Array.from({ length: 100 }, (_, i) => i);

  return (
    <div
      ref={gridRef}
      className="grid"
      style={{
        gridTemplateRows: `repeat(100, 1fr)`,
        gridTemplateColumns: `repeat(${cellsColumns}, 1fr)`,
        height: "100vh",
        width: "100vw",
      }}
      onContextMenu={handleOpenMenu}
      onMouseDown={handleMouseDown}
    >
      {rowIndices.map((rowIndex) => (
        <GridRow
          key={`row-${rowIndex}`}
          rowIndex={rowIndex}
          columnsCount={cellsColumns}
        />
      ))}

      {isMenuOpen && (
        <div ref={menuRef}>
          <ColorsSelectorComponent
            position={position}
            setMenuVisible={setIsMenuOpen}
          />
        </div>
      )}
    </div>
  );
};
