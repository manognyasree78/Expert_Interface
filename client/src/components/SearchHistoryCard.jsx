import { History, MessageSquare } from 'lucide-react';

const SearchHistoryCard = ({ chatThreads, onSelectThread }) => {
  return (
    <div className="bg-accent border border-border rounded-lg p-4 mb-4">
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
          <History className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-medium text-card-foreground">Search History</h3>
          <p className="text-sm text-muted-foreground">Your past conversations</p>
        </div>
      </div>
      
      <div className="space-y-2 max-h-32 overflow-y-auto">
        {chatThreads.length === 0 ? (
          <p className="text-sm text-muted-foreground">No chat history yet</p>
        ) : (
          chatThreads.map((thread, index) => (
            <div 
              key={index}
              onClick={() => onSelectThread(thread)}
              className="flex items-center space-x-2 p-2 hover:bg-card rounded cursor-pointer transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-card-foreground truncate">
                {thread.messages[0]?.text || `Chat ${index + 1}`}
              </span>
              <span className="text-xs text-muted-foreground ml-auto">
                {thread.messages[0]?.timestamp?.toLocaleDateString()}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchHistoryCard;