import { PacmanLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="w-full flex items-center justify-center py-6" role="status">
      <PacmanLoader color="#a78bfa" size={24} />
    </div>
  );
};

export default Loader;
