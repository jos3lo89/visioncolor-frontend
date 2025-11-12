import React from "react";
import "./index.css";
import ImageAnalysis from "./features/ImageAnalysis";
import RealtimeAnalysis from "./features/RealtimeAnalysis";

const App: React.FC = () => {
  React.useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8">
      <header className="text-center mb-10 w-full max-w-4xl">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-indigo-600 mb-4">
          Visión Color
        </h1>
        <p className="text-xl text-gray-300">
          Un analizador de colores dominantes en imágenes y video en tiempo
          real.
        </p>
      </header>

      <main className="w-full max-w-4xl space-y-12">
        <ImageAnalysis />

        <hr className="border-t-2 border-gray-700 my-10" />

        <RealtimeAnalysis />
      </main>

      <footer className="mt-20 text-gray-500 text-sm">
        &copy; 2025 Visión Color. Casi todos los derechos reservados.
      </footer>
    </div>
  );
};

export default App;
