import { X } from 'lucide-react';

const BellInbox = ({ isOpen, onClose, messages = [], answers = [] }) => {
  if (!isOpen) return null;

  const conversationHistory = [];
  let answerIndex = 0;
  
  messages.forEach((message) => {
    // Only process user messages (original questions)
    if (message.isUser) {
      const answer = answers[answerIndex] || null;
      
      // Only include if it's an out-of-expertise response
      if (answer && answer.isOutOfExpertise === true) {
        conversationHistory.push({
          question: message.text, // This is the original user question
          answer: answer,
          timestamp: message.timestamp
        });
      }
      
      // Increment answer index for each user question
      answerIndex++;
    }
    // Skip refinement messages (they don't get answers)
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card rounded-2xl w-full max-w-4xl mx-4 max-h-[80vh] border border-border">
        <div className="flex justify-between items-center p-6 border-b border-border">
          <h2 className="text-2xl font-bold text-card-foreground">Expert Notifications</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-96">
          {conversationHistory.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              No out-of-expertise questions yet. Questions outside my knowledge base will appear here for further review.
            </div>
          ) : (
            <div className="space-y-6">
              {conversationHistory.map((item, index) => (
                <div key={index} className="bg-accent rounded-lg p-4">
                  <div className="mb-3">
                    <div className="text-sm text-muted-foreground mb-1">
                      {item.timestamp?.toLocaleString()}
                    </div>
                    <div className="font-medium text-card-foreground">
                      Q: {item.question}
                    </div>
                  </div>
                  {item.answer && item.answer.isOutOfExpertise && (
                    <div className="bg-card rounded p-3 text-sm text-card-foreground">
                      <strong>Response:</strong>
                      <div className="mt-2">
                        <p className="text-orange-400 italic">{item.answer.message}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BellInbox;