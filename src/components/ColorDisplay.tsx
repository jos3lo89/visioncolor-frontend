interface Props {
  colors: string[];
}

const ColorDisplay = ({ colors }: Props) => {
  if (!colors || colors.length === 0) {
    return (
      <p className="text-gray-400 italic">
        No se detectaron colores dominantes.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4 bg-gray-900 rounded-lg border border-gray-700">
      {colors.map((color) => (
        <div
          key={color}
          className="w-24 h-24 sm:w-28 sm:h-28 flex flex-col justify-end items-center rounded-lg shadow-md transition-transform duration-200 hover:scale-105"
          style={{ backgroundColor: color }}
        >
          <span
            className="text-xs font-semibold p-1 rounded-b-lg w-full text-center"
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
              color: "#fff",
              textShadow: "0 0 2px rgba(0,0,0,0.8)",
            }}
          >
            {color}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ColorDisplay;
