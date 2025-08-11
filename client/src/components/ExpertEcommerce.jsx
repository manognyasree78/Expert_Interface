import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { ArrowLeft, Bell, Send } from 'lucide-react';
import { findAnswer } from '../data/questionsAnswers';
import ImageModal from './ImageModal';

// Helper function to generate refined queries
const generateRefinedQuery = (userInput, answer) => {
  if (answer.isOutOfExpertise) return null;
  
  const normalizedInput = userInput.toLowerCase();
  if (normalizedInput.includes('scalable') || normalizedInput.includes('architecture')) {
    return "How would you design a scalable architecture for a high-traffic e-commerce site?";
  }
  if (normalizedInput.includes('fraud') || normalizedInput.includes('payment')) {
    return "What are some strategies to prevent online payment fraud?";
  }
  if (normalizedInput.includes('personalization') || normalizedInput.includes('customer experience')) {
    return "How does personalization improve customer experience in e-commerce?";
  }
  return userInput;
};
import AttachButton from './AttachButton';
import BellInbox from './BellInbox';
import NewChatCard from './NewChatCard';
import SearchHistoryCard from './SearchHistoryCard';

const ExpertEcommerce = () => {
  const [, setLocation] = useLocation();
  const [messages, setMessages] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [showInbox, setShowInbox] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [chatThreads, setChatThreads] = useState([]);
  const [currentThreadId, setCurrentThreadId] = useState(null);
  const [refinedQueries, setRefinedQueries] = useState([]);
  const [imageModal, setImageModal] = useState({ isOpen: false, src: '', alt: '' });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
      setLocation('/');
      return;
    }
    setCurrentUser(user);

    // Load chat threads for this user and domain
    const threadsKey = `threads_${user.email}_ecommerce`;
    const savedThreads = JSON.parse(localStorage.getItem(threadsKey) || '[]');
    setChatThreads(savedThreads);
    
    // Load current thread or create new one
    if (savedThreads.length > 0) {
      const latestThread = savedThreads[savedThreads.length - 1];
      setCurrentThreadId(latestThread.id);
      setMessages(latestThread.messages.map(msg => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      })));
      setAnswers(latestThread.answers);
    } else {
      // Create first thread
      const newThreadId = Date.now();
      setCurrentThreadId(newThreadId);
    }

    // Check for pending question from dashboard
    const pendingQuestion = sessionStorage.getItem('pendingQuestion');
    if (pendingQuestion) {
      sessionStorage.removeItem('pendingQuestion');
      // Delay to ensure state is initialized
      setTimeout(() => {
        setCurrentMessage(pendingQuestion);
        handleSendMessage(pendingQuestion);
      }, 100);
    }
  }, []);

  const saveChatHistory = (newMessages, newAnswers) => {
    if (currentUser && currentThreadId) {
      const threadsKey = `threads_${currentUser.email}_ecommerce`;
      const currentThread = {
        id: currentThreadId,
        messages: newMessages,
        answers: newAnswers,
        lastUpdated: new Date()
      };
      
      const updatedThreads = chatThreads.filter(t => t.id !== currentThreadId);
      updatedThreads.push(currentThread);
      
      setChatThreads(updatedThreads);
      localStorage.setItem(threadsKey, JSON.stringify(updatedThreads));
    }
  };

  const startNewChat = () => {
    const newThreadId = Date.now();
    setCurrentThreadId(newThreadId);
    setMessages([]);
    setAnswers([]);
  };

  const selectThread = (thread) => {
    setCurrentThreadId(thread.id);
    setMessages(thread.messages.map(msg => ({
      ...msg,
      timestamp: new Date(msg.timestamp)
    })));
    setAnswers(thread.answers);
  };

  const getRefinedQuestion = (question) => {
    // Simple static refinements for e-commerce
    const refinements = {
      "architecture": "You meant... 'How do I design scalable architecture for high-traffic e-commerce sites?'",
      "fraud": "You meant... 'What are the best strategies to prevent online payment fraud?'",
      "personalization": "You meant... 'How does personalization enhance customer experience in e-commerce?'"
    };
    
    const key = Object.keys(refinements).find(k => question.toLowerCase().includes(k));
    return key ? refinements[key] : null;
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

    // Add refined question suggestion
    const refinedQuestion = getRefinedQuestion(question);
    if (refinedQuestion) {
      setTimeout(() => {
        const botMessage = {
          text: refinedQuestion,
          isUser: false,
          timestamp: new Date(),
          isRefinement: true
        };
        const messagesWithBot = [...newMessages, botMessage];
        setMessages(messagesWithBot);
        
        // Get answer
        const result = findAnswer(question, 'ecommerce');
        const newAnswers = [...answers, result.answer];
        
        // Store refined query for "You meant..." feature
        if (result.refinedQuery) {
          setRefinedQueries(prev => [...prev, result.refinedQuery]);
        }
        setAnswers(newAnswers);

        // Save to localStorage
        saveChatHistory(messagesWithBot, newAnswers);
      }, 500);
    } else {
      // Get answer immediately if no refinement
      const result = findAnswer(question, 'ecommerce');
      const newAnswers = [...answers, result.answer];
      
      // Store refined query for "You meant..." feature
      if (result.refinedQuery) {
        setRefinedQueries(prev => [...prev, result.refinedQuery]);
      }
      setAnswers(newAnswers);
      saveChatHistory(newMessages, newAnswers);
    }
  };

  const handleSendMessage = (messageText = currentMessage) => {
    if (!messageText || !messageText.trim()) return;
    
    handleQuestionSubmit(messageText);
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
          {/* Chat Controls */}
          <div className="p-4 border-b border-border">
            <div className="flex space-x-2 mb-4">
              <NewChatCard onClick={startNewChat} />
              <SearchHistoryCard 
                chatThreads={chatThreads} 
                onSelectThread={selectThread}
                onDeleteThread={(threadId) => {
                  const updatedThreads = chatThreads.filter(t => t.id !== threadId);
                  setChatThreads(updatedThreads);
                  const threadsKey = `threads_${currentUser.email}_ecommerce`;
                  localStorage.setItem(threadsKey, JSON.stringify(updatedThreads));
                }}
              />
            </div>
            <div className="text-sm text-muted-foreground mb-2">
              💬 Type your question and our expert engine will deliver a crisp, customized answer — made just for how you learn.
            </div>
          </div>
          
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl ${
                    message.isUser 
                      ? 'bg-primary text-primary-foreground ml-4' 
                      : message.isRefinement
                      ? 'bg-secondary/20 text-secondary border border-secondary/30 mr-4'
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
            <div className="bg-input border border-border rounded-lg flex items-center">
              <AttachButton onFileSelect={handleFileSelect} />
              <textarea
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about E-commerce..."
                className="flex-1 resize-none bg-transparent px-3 py-3 text-foreground placeholder-muted-foreground focus:outline-none"
                rows={1}
              />
              <button
                onClick={handleSendMessage}
                className="p-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors mr-2"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Preview Panel */}
        <div className="flex-1 bg-background overflow-y-auto p-6">
          {answers.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center max-w-2xl">
                <div className="text-6xl mb-6">🏪</div>
                <h2 className="text-3xl font-bold text-card-foreground mb-4">🏪 E-commerce Expert Assistance</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  I provide strategic e-commerce guidance with business context, modern tech trends, practical solutions, and real-world tools. 
                  Each answer includes business context, technology overview, solution approach, implementation tools, and practical tips.
                </p>
                <div className="space-y-3 text-left bg-accent/30 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-card-foreground mb-3">Popular Questions:</h3>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>• How would you design a scalable architecture for a high-traffic e-commerce site?</p>
                    <p>• What are some strategies to prevent online payment fraud?</p>
                    <p>• How does personalization improve customer experience in e-commerce?</p>
                  </div>
                  <div className="mt-4 p-3 bg-primary/20 rounded-lg">
                    <p className="text-xs text-muted-foreground italic">
                      💡 Ask me about scalable architecture, payment systems, customer experience, or any e-commerce challenge!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6 bg-card rounded-lg p-4 border border-border">
                <h2 className="text-lg font-semibold text-card-foreground mb-2">🏪 E-commerce Expert Assistance</h2>
                <p className="text-sm text-muted-foreground">
                  I provide strategic e-commerce guidance with business context, modern tech trends, practical solutions, and real-world tools. 
                  Each answer includes business context, technology overview, solution approach, implementation tools, and practical tips.
                </p>
              </div>
          <div className="max-w-4xl mx-auto space-y-8">
            {answers.map((answer, index) => (
              <div key={index} className="bg-background/50 rounded-2xl p-8 border-0 shadow-sm">
                {/* Removed question repetition as per requirements */}

                {answer.isOutOfExpertise ? (
                  <div className="bg-background/30 p-8 rounded-xl text-center border-0">
                    <div className="text-4xl mb-4">🤖</div>
                    <p className="text-slate-600 dark:text-slate-300 text-lg italic">{answer.message}</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {answer.title && (
                      <div className="text-center mb-4">
                        <h3 className="text-xl font-bold text-card-foreground">{answer.title}</h3>
                        {answer.visual && (
                          <div className="text-2xl mt-2">{answer.visual}</div>
                        )}
                      </div>
                    )}
                    
                    <div className="bg-background/30 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-card-foreground mb-3 flex items-center">
                        <span className="text-primary mr-2">🔹</span>
                        1. Business Context
                      </h3>
                      <p className="text-card-foreground leading-relaxed">{answer.businessContext}</p>
                    </div>

                    {/* Add E-commerce image if available */}
                    {answer.image && (
                      <div className="text-center mb-4">
                        <img 
                          src={answer.image} 
                          alt={answer.title}
                          className="max-w-full h-48 object-contain mx-auto rounded-lg cursor-pointer hover:opacity-90 transition-opacity border border-border"
                          onClick={() => setImageModal({ 
                            isOpen: true, 
                            src: answer.image, 
                            alt: answer.title 
                          })}
                          title="Click to enlarge and download"
                        />
                        <p className="text-xs text-muted-foreground mt-2 italic">Click image to enlarge and download</p>
                      </div>
                    )}

                    <div className="bg-background/30 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-card-foreground mb-3 flex items-center">
                        <span className="text-primary mr-2">🔹</span>
                        2. Technology Overview
                      </h3>
                      <p className="text-card-foreground leading-relaxed">{answer.technologyOverview}</p>
                    </div>

                    <div className="bg-background/30 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-card-foreground mb-3 flex items-center">
                        <span className="text-primary mr-2">🔹</span>
                        3. Solution Approach
                      </h3>
                      <div className="text-card-foreground leading-relaxed whitespace-pre-line">{answer.solutionApproach}</div>
                    </div>

                    <div className="bg-background/30 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-card-foreground mb-3 flex items-center">
                        <span className="text-primary mr-2">🔹</span>
                        4. Real-world Tools or Examples
                      </h3>
                      <div className="text-card-foreground leading-relaxed whitespace-pre-line">{answer.realWorldToolsOrExamples}</div>
                    </div>

                    <div className="bg-background/30 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-card-foreground mb-3 flex items-center">
                        <span className="text-primary mr-2">🔹</span>
                        5. Implementation Tips or Pitfalls
                      </h3>
                      <p className="text-card-foreground leading-relaxed">{answer.implementationTipsOrPitfalls}</p>
                    </div>
                    
                    {/* Show refined query below answer */}
                    {refinedQueries[index] && refinedQueries[index] !== messages[index]?.text && (
                      <div className="mt-6 text-sm text-muted-foreground italic text-center border-t border-border/30 pt-4">
                        <strong>You meant:</strong> {refinedQueries[index]}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            </div>
            </>
          )}

          {/* Image Modal */}
          <ImageModal 
            isOpen={imageModal.isOpen}
            onClose={() => setImageModal({ isOpen: false, src: '', alt: '' })}
            imageSrc={imageModal.src}
            imageAlt={imageModal.alt}
          />
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