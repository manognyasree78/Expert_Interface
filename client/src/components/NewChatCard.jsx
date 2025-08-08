import { Plus } from 'lucide-react';

const NewChatCard = ({ onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-accent hover:bg-accent/80 border border-border rounded-lg p-3 cursor-pointer transition-colors flex-1"
      data-testid="button-new-chat"
    >
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <Plus className="w-4 h-4 text-white" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-card-foreground">🆕 New Chat</h3>
          <p className="text-xs text-muted-foreground">Start fresh</p>
        </div>
      </div>
    </div>
  );
};

export default NewChatCard;