import { useState } from 'react';
import { X, Download } from 'lucide-react';

const ImageModal = ({ isOpen, onClose, imageSrc, imageAlt }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!isOpen || !imageSrc) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = imageAlt.replace(/\s+/g, '_').toLowerCase() + '.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-xl max-w-4xl max-h-full overflow-auto">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="text-lg font-semibold text-card-foreground">{imageAlt}</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="p-2 hover:bg-accent rounded-lg transition-colors flex items-center gap-2 text-sm"
              title="Download image"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="p-4">
          {!imageLoaded && (
            <div className="w-full h-64 bg-accent rounded-lg flex items-center justify-center">
              <div className="text-muted-foreground">Loading image...</div>
            </div>
          )}
          <img
            src={imageSrc}
            alt={imageAlt}
            onLoad={() => setImageLoaded(true)}
            className={`max-w-full h-auto rounded-lg ${imageLoaded ? 'block' : 'hidden'}`}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;