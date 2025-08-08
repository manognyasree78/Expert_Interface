import { X, MessageSquare, Trash2 } from 'lucide-react';

const SearchHistoryModal = ({ isOpen, onClose, chatThreads, onSelectThread, onDeleteThread }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card rounded-2xl w-full max-w-2xl mx-4 max-h-[70vh] border border-border">
        <div className="flex justify-between items-center p-6 border-b border-border">
          <h2 className="text-2xl font-bold text-card-foreground">Chat History</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-96">
          {chatThreads.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              No chat history yet. Start a conversation to see your threads here!
            </div>
          ) : (
            <div className="space-y-3">
              {chatThreads.map((thread, index) => (
                <div 
                  key={index}
                  className="bg-accent border border-border rounded-lg p-4 hover:bg-accent/80 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div 
                      onClick={() => {
                        onSelectThread(thread);
                        onClose();
                      }}
                      className="flex-1 cursor-pointer"
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <MessageSquare className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-card-foreground">
                          Chat {index + 1}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {thread.messages[0]?.timestamp ? new Date(thread.messages[0].timestamp).toLocaleDateString() : ''}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {thread.messages[0]?.text || 'No messages'}
                      </p>
                      <div className="mt-2 text-xs text-muted-foreground">
                        {thread.messages.length} message{thread.messages.length !== 1 ? 's' : ''}
                      </div>
                    </div>
                    <button
                      onClick={() => onDeleteThread(thread.id)}
                      className="ml-4 p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                      title="Delete thread"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchHistoryModal;