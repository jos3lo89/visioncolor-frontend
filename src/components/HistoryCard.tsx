import type { AnalysisItem } from "../types/analysis";
import ColorDisplay from "./ColorDisplay";

interface HistoryCardProps {
  item: AnalysisItem;
}

const HistoryCard = ({ item }: HistoryCardProps) => {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-indigo-500/30">
      <img
        src={item.image_url}
        alt={`Análisis de ${item.filename}`}
        className="w-full h-48 object-cover"
        loading="lazy"
      />

      <div className="p-4">
        <ColorDisplay colors={item.dominant_colors} />

        {/* <p
          className="text-white font-semibold truncate mt-3"
          title={item.filename}
        >
          {item.filename}
        </p> */}
        <p className="text-gray-400 text-sm mt-1">
          {new Date(item.timestamp).toLocaleString("es-ES", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </p>
      </div>
    </div>
  );
};

export default HistoryCard;
