import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { ArrowLeft, Bell, Send } from 'lucide-react';
import { findAnswer } from '../data/questionsAnswers';
import AttachButton from './AttachButton';
import BellInbox from './BellInbox';

const ExpertEcommerce = () => {
  const [, setLocation] = useLocation();
  const [messages, setMessages] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [showInbox, setShowInbox] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
      setLocation('/');
      return;
    }
    setCurrentUser(user);

    // Load chat history for this user and domain
    const chatKey = `chat_${user.email}_ecommerce`;
    const answersKey = `answers_${user.email}_ecommerce`;
    const savedMessages = JSON.parse(localStorage.getItem(chatKey) || '[]');
    const savedAnswers = JSON.parse(localStorage.getItem(answersKey) || '[]');
    
    setMessages(savedMessages.map(msg => ({
      ...msg,
      timestamp: new Date(msg.timestamp)
    })));
    setAnswers(savedAnswers);

    // Check for pending question from dashboard
    const pendingQuestion = sessionStorage.getItem('pendingQuestion');
    if (pendingQuestion) {
      sessionStorage.removeItem('pendingQuestion');
      handleQuestionSubmit(pendingQuestion);
    }
  }, []);

  const saveChatHistory = (newMessages, newAnswers) => {
    if (currentUser) {
      const chatKey = `chat_${currentUser.email}_ecommerce`;
      const answersKey = `answers_${currentUser.email}_ecommerce`;
      localStorage.setItem(chatKey, JSON.stringify(newMessages));
      localStorage.setItem(answersKey, JSON.stringify(newAnswers));
    }
  };

  const handleQuestionSubmit = (question) => {
    const userMessage = {
      text: question,
      isUser: true,
      timestamp: new Date(),
      attachedFiles: [...attachedFiles]
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setAttachedFiles([]);

    // Get answer
    const answer = findAnswer(question, 'ecommerce');
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    // Save to localStorage
    saveChatHistory(newMessages, newAnswers);
  };

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;
    
    handleQuestionSubmit(currentMessage);
    setCurrentMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileSelect = (files) => {
    setAttachedFiles(files);
  };

  if (!currentUser) return null;

  return (
    <div className="h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setLocation('/dashboard')}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </button>
          <h1 className="text-xl font-bold text-card-foreground">🛍 E-commerce Expert</h1>
          <button 
            onClick={() => setShowInbox(true)}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <Bell className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Chat Panel */}
        <div className="w-[30%] bg-card border-r border-border flex flex-col">
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl ${
                    message.isUser 
                      ? 'bg-primary text-primary-foreground ml-4' 
                      : 'bg-accent text-accent-foreground mr-4'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                    {message.attachedFiles && message.attachedFiles.length > 0 && (
                      <div className="mt-2 text-xs opacity-75">
                        📎 {message.attachedFiles.length} file(s) attached
                      </div>
                    )}
                    <div className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-border">
            <div className="flex items-end space-x-2">
              <AttachButton onFileSelect={handleFileSelect} />
              <div className="flex-1">
                <textarea
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about E-commerce..."
                  className="w-full resize-none bg-input border border-border rounded-lg px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={1}
                />
              </div>
              <button
                onClick={handleSendMessage}
                className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Preview Panel */}
        <div className="flex-1 bg-background overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {answers.map((answer, index) => (
              <div key={index} className="bg-card rounded-2xl p-8 border border-border">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-card-foreground mb-2">
                    E-commerce Expert Analysis #{index + 1}
                  </h2>
                  <p className="text-lg text-primary font-medium">
                    {messages[index]?.text}
                  </p>
                </div>

                {answer.isOutOfExpertise ? (
                  <div className="bg-red-50 dark:bg-red-900/20 p-8 rounded-lg text-center">
                    <div className="text-6xl mb-4">🤖</div>
                    <h3 className="text-xl font-semibold text-card-foreground mb-2">Out of My Expertise</h3>
                    <p className="text-muted-foreground text-lg">{answer.message}</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-accent p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-card-foreground mb-3 flex items-center">
                        <span className="text-primary mr-2">🔹</span>
                        1. Business Context
                      </h3>
                      <p className="text-card-foreground leading-relaxed">{answer.businessContext}</p>
                    </div>

                    <div className="bg-accent p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-card-foreground mb-3 flex items-center">
                        <span className="text-primary mr-2">🔹</span>
                        2. Modern Tech/Trends Overview
                      </h3>
                      <p className="text-card-foreground leading-relaxed">{answer.modernTechTrendsOverview}</p>
                    </div>

                    <div className="bg-accent p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-card-foreground mb-3 flex items-center">
                        <span className="text-primary mr-2">🔹</span>
                        3. Solution Approach
                      </h3>
                      <p className="text-card-foreground leading-relaxed">{answer.solutionApproach}</p>
                    </div>

                    <div className="bg-accent p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-card-foreground mb-3 flex items-center">
                        <span className="text-primary mr-2">🔹</span>
                        4. Real-world Tools or Examples
                      </h3>
                      <p className="text-card-foreground leading-relaxed">{answer.realWorldToolsOrExamples}</p>
                    </div>

                    <div className="bg-accent p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-card-foreground mb-3 flex items-center">
                        <span className="text-primary mr-2">🔹</span>
                        5. Implementation Tips or Pitfalls
                      </h3>
                      <p className="text-card-foreground leading-relaxed">{answer.implementationTipsOrPitfalls}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bell Inbox Modal */}
      <BellInbox 
        isOpen={showInbox} 
        onClose={() => setShowInbox(false)} 
        messages={messages} 
        answers={answers} 
      />
    </div>
  );
};

export default ExpertEcommerce;