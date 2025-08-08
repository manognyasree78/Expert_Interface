import { useState } from 'react';
import { Paperclip, File, Image } from 'lucide-react';

const AttachButton = ({ onFileSelect }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(prev => [...prev, ...files]);
    onFileSelect(files);
  };

  const getFileIcon = (file) => {
    if (file.type.startsWith('image/')) {
      return <Image className="w-4 h-4" />;
    }
    return <File className="w-4 h-4" />;
  };

  return (
    <div className="relative">
      <input
        type="file"
        multiple
        accept=".pdf,.docx,.txt,.png,.jpg,.jpeg"
        onChange={handleFileSelect}
        className="hidden"
        id="file-upload"
      />
      <label
        htmlFor="file-upload"
        className="p-2 text-muted-foreground hover:text-primary cursor-pointer transition-colors"
      >
        <Paperclip className="w-5 h-5" />
      </label>
      
      {selectedFiles.length > 0 && (
        <div className="absolute bottom-full left-0 mb-2 bg-card border border-border rounded-lg shadow-lg p-2 min-w-48">
          {selectedFiles.map((file, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm text-card-foreground">
              {getFileIcon(file)}
              <span className="truncate">{file.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AttachButton;