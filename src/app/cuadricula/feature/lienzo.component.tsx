import { useCallback, useEffect, useRef, useState } from "react";
import { ColorsSelectorComponent } from "../ui/color-selector/color-selector.component";
import { useSelectedColor } from "../hook/useSelectColor";
import { ControlsComponent } from "../ui/controls/controls.component";

export const LienzoComponent = () => {
  const [squareHeight, setSquareHeight] = useState(window.innerHeight / 100);
  const [cellsColumns, setCellsColumns] = useState(
    Math.floor(window.innerWidth / squareHeight)
  );
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isEraserMode, setIsEraserMode] = useState<boolean>(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridStateRef = useRef<Map<string, string>>(new Map());

  const { setIsPainting, isPainting, selectedColor } = useSelectedColor();

  useEffect(() => {
    const updateSize = () => {
      const newSquareHeight = window.innerHeight / 100;
      setSquareHeight(newSquareHeight);
      setCellsColumns(Math.floor(window.innerWidth / newSquareHeight));
    };

    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      drawGrid();
    }

    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      drawGrid();
    }
  }, [cellsColumns, squareHeight]);

  const drawGrid = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.strokeStyle = "#e5e7eb";
    context.lineWidth = 1;

    for (let i = 0; i <= 100; i++) {
      const y = i * squareHeight;
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(canvas.width, y);
      context.stroke();
    }

    for (let j = 0; j < cellsColumns; j++) {
      const x = j * squareHeight;
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, canvas.height);
      context.stroke();
    }

    gridStateRef.current.forEach((coords, color) => {
      const [row, col] = coords.split("-").map(Number);
      context.fillStyle = color;
      context.fillRect(
        row * squareHeight + 1,
        col * squareHeight + 1,
        squareHeight - 1,
        squareHeight - 1
      );
    });
  }, [cellsColumns, squareHeight]);

  const paintCell = useCallback(
    (row: number, col: number) => {
      const cellKey = `${col}-${row}`;
      gridStateRef.current.set(cellKey, selectedColor);

      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext("2d");
      if (!context) return;

      if (isEraserMode) {
        gridStateRef.current.delete(cellKey);

        context.clearRect(
          col * squareHeight,
          row * squareHeight,
          squareHeight,
          squareHeight
        );

        context.strokeStyle = "#e5e7eb";
        context.lineWidth = 1;

        context.beginPath();
        context.moveTo(col * squareHeight, row * squareHeight);
        context.lineTo((col + 1) * squareHeight, row * squareHeight);
        context.stroke();

        context.beginPath();
        context.moveTo(col * squareHeight, (row + 1) * squareHeight);
        context.lineTo((col + 1) * squareHeight, (row + 1) * squareHeight);
        context.stroke();

        context.beginPath();
        context.moveTo(col * squareHeight, row * squareHeight);
        context.lineTo(col * squareHeight, (row + 1) * squareHeight);
        context.stroke();

        context.beginPath();
        context.moveTo((col + 1) * squareHeight, row * squareHeight);
        context.lineTo((col + 1) * squareHeight, (row + 1) * squareHeight);
        context.stroke();
      } else {
        gridStateRef.current.set(cellKey, selectedColor);

        context.fillStyle = selectedColor;
        context.fillRect(
          col * squareHeight + 1,
          row * squareHeight + 1,
          squareHeight - 1,
          squareHeight - 1
        );
      }
    },
    [isEraserMode, selectedColor, squareHeight]
  );

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      if (event.button !== 0) return;

      setIsPainting(true);

      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const col = Math.floor(x / squareHeight);
      const row = Math.floor(y / squareHeight);

      paintCell(row, col);
    },
    [squareHeight, paintCell, setIsPainting]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isPainting) return;

      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const col = Math.floor(x / squareHeight);
      const row = Math.floor(y / squareHeight);

      paintCell(row, col);
    },
    [squareHeight, isPainting, paintCell]
  );

  const handleMouseUp = useCallback(() => {
    setIsPainting(false);
  }, [setIsPainting]);

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseUp]);

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

  const handleOpenMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setPosition({ x: event.clientX - 5, y: event.clientY - 5 });
    setIsMenuOpen(true);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "e") {
        setIsEraserMode((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="relative w-screen h-screen" onContextMenu={handleOpenMenu}>
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
      />

      <ControlsComponent
        isEraserMode={isEraserMode}
        toggleEraserMode={setIsEraserMode}
      />

      {isMenuOpen && (
        <ColorsSelectorComponent
          position={position}
          setIsMenuOpen={setIsMenuOpen}
          isMenuOpen={isMenuOpen}
          menuRef={menuRef}
        />
      )}
    </div>
  );
};
