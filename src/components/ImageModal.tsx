interface ImageModalProps {
  imageUrl: string;
  altText: string;
  onClose: () => void;
}

const ImageModal = ({ imageUrl, altText, onClose }: ImageModalProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-lg font-bold text-white transition hover:bg-red-700 focus:outline-none cursor-pointer"
          aria-label="Cerrar modal"
        >
          &times;
        </button>

        <img
          src={imageUrl}
          alt={altText}
          className="block max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
        />
      </div>
    </div>
  );
};

export default ImageModal;
