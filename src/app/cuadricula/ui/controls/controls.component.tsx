export const ControlsComponent = ({
  isEraserMode,
  toggleEraserMode,
}: {
  isEraserMode: boolean;
  toggleEraserMode: (toggle: boolean) => void;
}) => {
  return (
    <div className="absolute top-4 right-4 bg-white p-2 rounded shadow-md">
      <button
        className={`px-3 py-1 rounded mr-2 ${
          isEraserMode ? "bg-red-500 text-white" : "bg-gray-200"
        }`}
        onClick={() => toggleEraserMode(!isEraserMode)}
      >
        {isEraserMode ? "Erase Mode" : "Paint Mode"}
      </button>
      <span className="text-sm text-gray-600 ml-2">Press 'E' to erase</span>
    </div>
  );
};
