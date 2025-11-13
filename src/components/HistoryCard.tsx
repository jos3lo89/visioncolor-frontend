import { useState } from "react";
import type { AnalysisItem } from "../types/analysis";
import ColorDisplay from "./ColorDisplay";
import ImageModal from "./ImageModal";

interface HistoryCardProps {
  item: AnalysisItem;
}

const HistoryCard = ({ item }: HistoryCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-indigo-500/30">
        <img
          src={item.image_url}
          alt={`Análisis de ${item.filename}`}
          className="w-full h-48 object-cover cursor-pointer"
          loading="lazy"
          onClick={() => setIsModalOpen(true)}
        />

        <div className="p-4">
          <ColorDisplay colors={item.dominant_colors} />

          <p className="text-gray-400 text-sm mt-1">
            {new Date(item.timestamp).toLocaleString("es-ES", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        </div>
      </div>

      {isModalOpen && (
        <ImageModal
          imageUrl={item.image_url}
          altText={`Análisis de ${item.filename}`}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default HistoryCard;
