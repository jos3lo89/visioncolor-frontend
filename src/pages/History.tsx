import { useState, useEffect } from "react";
import type { HistoryApiResponse } from "../types/analysis";
import { getHistory } from "../api/analysisApi";
import Loader from "../components/Loader";
import HistoryCard from "../components/HistoryCard";

const History = () => {
  const [historyData, setHistoryData] = useState<HistoryApiResponse | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHistory = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getHistory(currentPage);
        setHistoryData(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    loadHistory();
  }, [currentPage]);

  const handleNextPage = () => {
    if (historyData && currentPage < historyData.total_pages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center text-red-400 p-8 bg-gray-800 rounded-lg">
          <strong>Error:</strong> {error}
        </div>
      );
    }

    if (!historyData || historyData.items.length === 0) {
      return (
        <div className="text-center text-gray-400 p-8 bg-gray-800 rounded-lg">
          No se encontraron análisis en el historial.
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {historyData.items.map((item) => (
          <HistoryCard key={item.id} item={item} />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 bg-gray-900">
      {renderContent()}

      {historyData && historyData.total_pages > 1 && (
        <div className="flex justify-between items-center mt-8 text-white">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1 || isLoading}
            className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>
          <span className="text-gray-300">
            Página {historyData.current_page} de {historyData.total_pages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === historyData.total_pages || isLoading}
            className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default History;
