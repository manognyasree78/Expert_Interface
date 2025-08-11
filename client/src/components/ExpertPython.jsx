import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { ArrowLeft, Bell, Send } from 'lucide-react';
import { findAnswer } from '../data/questionsAnswers';

// Helper function to generate refined queries
const generateRefinedQuery = (userInput, answer) => {
  if (answer.isOutOfExpertise) return null;
  
  const normalizedInput = userInput.toLowerCase();
  if (normalizedInput.includes('static') && normalizedInput.includes('class')) {
    return "What's the difference between @staticmethod and @classmethod decorators?";
  }
  if (normalizedInput.includes('slice') || normalizedInput.includes('slicing')) {
    return "How does Python list slicing work with start:stop:step syntax?";
  }
  if (normalizedInput.includes('function')) {
    return "How do I create and use functions in Python with parameters and return values?";
  }
  return userInput;
};
import AttachButton from './AttachButton';
import BellInbox from './BellInbox';
import NewChatCard from './NewChatCard';
import SearchHistoryCard from './SearchHistoryCard';

const ExpertPython = () => {
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

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
      setLocation('/');
      return;
    }
    setCurrentUser(user);

    // Load chat threads for this user and domain
    const threadsKey = `threads_${user.email}_python`;
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
      const threadsKey = `threads_${currentUser.email}_python`;
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
    // Simple static refinements - you can expand this
    const refinements = {
      "static method": "You meant... 'What's the difference between @staticmethod and @classmethod decorators?'",
      "slicing": "You meant... 'How does Python list slicing work with start:stop:step syntax?'",
      "function": "You meant... 'How do I create and use functions in Python with parameters and return values?'"
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
        const result = findAnswer(question, 'python');
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
      const result = findAnswer(question, 'python');
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
    if (!messageText || typeof messageText !== 'string' || !messageText.trim()) return;
    
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
          <h1 className="text-xl font-bold text-card-foreground">🐍 Python Expert</h1>
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
                  const threadsKey = `threads_${currentUser.email}_python`;
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
                placeholder="Ask about Python..."
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
                <div className="text-6xl mb-6">🐍</div>
                <h2 className="text-3xl font-bold text-card-foreground mb-4">🐍 Python Expert Assistance</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  I provide comprehensive Python guidance with practical examples, code snippets, and real-world analogies. 
                  Each answer includes problem overview, core concepts, step-by-step solutions, common pitfalls, and actionable recommendations.
                </p>
                <div className="space-y-3 text-left bg-accent/30 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-card-foreground mb-3">Popular Questions:</h3>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>• What is the difference between static method and class method?</p>
                    <p>• What is slicing in Python, and how do you slice a list?</p>
                    <p>• What is a function in Python? Write a function that returns the square of a number.</p>
                  </div>
                  <div className="mt-4 p-3 bg-secondary/20 rounded-lg">
                    <p className="text-xs text-muted-foreground italic">
                      💡 Type any question in the chat or ask about functions, data structures, object-oriented programming!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6 bg-card rounded-lg p-4 border border-border">
                <h2 className="text-lg font-semibold text-card-foreground mb-2">🐍 Python Expert Assistance</h2>
                <p className="text-sm text-muted-foreground">
                  I provide comprehensive Python guidance with practical examples, code snippets, and real-world analogies. 
                  Each answer includes problem overview, core concepts, step-by-step solutions, common pitfalls, and actionable recommendations.
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
                        <span className="text-secondary mr-2">🔹</span>
                        1. Problem Overview
                      </h3>
                      <p className="text-card-foreground leading-relaxed">{answer.problemOverview}</p>
                    </div>

                    <div className="bg-background/30 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-card-foreground mb-3 flex items-center">
                        <span className="text-secondary mr-2">🔹</span>
                        2. Core Concept Explanation
                      </h3>
                      <p className="text-card-foreground leading-relaxed">{answer.coreConceptExplanation}</p>
                    </div>

                    <div className="bg-background/30 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-card-foreground mb-3 flex items-center">
                        <span className="text-secondary mr-2">🔹</span>
                        3. Step-by-Step Solution
                      </h3>
                      <div className="text-card-foreground leading-relaxed">
                        <pre className="bg-card p-4 rounded text-sm overflow-x-auto whitespace-pre-wrap font-mono">
                          <code>{answer.stepByStepSolution}</code>
                        </pre>
                      </div>
                    </div>

                    <div className="bg-background/30 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-card-foreground mb-3 flex items-center">
                        <span className="text-secondary mr-2">🔹</span>
                        4. Gotchas or Common Pitfalls
                      </h3>
                      <p className="text-card-foreground leading-relaxed">{answer.gotchasOrPitfalls}</p>
                    </div>

                    <div className="bg-background/30 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-card-foreground mb-3 flex items-center">
                        <span className="text-secondary mr-2">🔹</span>
                        5. Summary or Recommendation
                      </h3>
                      <p className="text-card-foreground leading-relaxed">{answer.summaryOrRecommendation}</p>
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

export default ExpertPython;