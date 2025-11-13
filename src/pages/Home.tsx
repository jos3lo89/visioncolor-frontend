import ImageAnalysis from "../features/ImageAnalysis";
import RealtimeAnalysis from "../features/RealtimeAnalysis";

const Home = () => {
  return (
    <main className="max-w-4xl mx-auto space-y-12 pt-8 pb-16">
      <ImageAnalysis />

      <hr className="border-t-2 border-gray-700 my-10" />

      <RealtimeAnalysis />
    </main>
  );
};
export default Home;
