import { History, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import SearchHistoryModal from './SearchHistoryModal';

const SearchHistoryCard = ({ chatThreads, onSelectThread, onDeleteThread }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div 
        onClick={() => setShowModal(true)}
        className="bg-accent hover:bg-accent/80 border border-border rounded-lg p-3 cursor-pointer transition-colors flex-1"
      >
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
            <History className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-card-foreground">🔍 Search History</h3>
            <p className="text-xs text-muted-foreground">
              {chatThreads.length === 0 ? 'No history yet' : `${chatThreads.length} thread${chatThreads.length !== 1 ? 's' : ''}`}
            </p>
          </div>
        </div>
      </div>

      <SearchHistoryModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        chatThreads={chatThreads}
        onSelectThread={onSelectThread}
        onDeleteThread={onDeleteThread}
      />
    </>
  );
};

export default SearchHistoryCard;