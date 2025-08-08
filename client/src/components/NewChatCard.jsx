import { Plus } from 'lucide-react';

const NewChatCard = ({ onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-accent hover:bg-accent/80 border border-border rounded-lg p-4 cursor-pointer transition-colors mb-4"
    >
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <Plus className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-medium text-card-foreground">New Chat</h3>
          <p className="text-sm text-muted-foreground">Start a fresh conversation</p>
        </div>
      </div>
    </div>
  );
};

export default NewChatCard;