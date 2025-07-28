import { useState, useEffect } from 'react';
import { Settings, Bell, User, Send, Home } from 'lucide-react';
import { useLocation } from 'wouter';
import { findRelevantKnowledge } from '../data/expertKnowledge';

const PythonExpertPage = () => {
  const [location, setLocation] = useLocation();
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [expertResponses, setExpertResponses] = useState([]);


  // Check for stored search query from homepage on component mount
  useEffect(() => {
    // Only process search queries that come from homepage search, not direct navigation
    const storedData = sessionStorage.getItem('searchQuery');
    if (storedData) {
      try {
        const searchData = JSON.parse(storedData);
        if (searchData.query && searchData.fromSearch) {
          processUserQuery(searchData.query);
          sessionStorage.removeItem('searchQuery');
        }
      } catch (error) {
        sessionStorage.removeItem('searchQuery');
      }
    }
  }, []);

  // Process user query and generate expert response
  const processUserQuery = (query) => {
    const knowledge = findRelevantKnowledge(query, 'python');
    
    if (knowledge) {
      setMessages(prev => [...prev, 
        { text: query, isUser: true, timestamp: new Date() },
        { 
          text: "I've analyzed your Python question and prepared a comprehensive response. Check the preview panel for detailed guidance!", 
          isUser: false, 
          timestamp: new Date() 
        }
      ]);
      setExpertResponses(prev => [...prev, {
        ...knowledge,
        id: Date.now()
      }]);
    } else {
      setMessages(prev => [...prev,
        { text: query, isUser: true, timestamp: new Date() }
      ]);
      setExpertResponses(prev => [...prev, {
        question: query,
        answer: {
          fallback: true,
          message: "Sorry, that's out of my expertise. Let me connect to my human expert and get back to you."
        },
        id: Date.now()
      }]);
    }
  };

  // Simple message handler without n8n
  const handlePythonQuestion = (question) => {
    setMessages(prev => [...prev, { 
      text: "I'm here to help you with Python development! What specific challenge are you working on?", 
      isUser: false, 
      timestamp: new Date() 
    }]);
  };

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    const query = currentMessage;
    setCurrentMessage('');
    processUserQuery(query);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="font-inter bg-background text-foreground min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-card shadow-sm z-50 px-4 py-4 border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Home Button and Logo */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setLocation('/')}
              className="p-2 rounded-lg bg-accent hover:bg-muted transition-colors"
            >
              <Home className="w-5 h-5 text-foreground" />
            </button>
            <button 
              onClick={() => setLocation('/')}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <span className="text-xl font-bold text-primary">EXPERT</span>
              <span className="text-xl font-bold text-secondary">APP</span>
            </button>
          </div>
          
          {/* Header Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-lg hover:bg-accent transition-colors">
              <Settings className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="p-2 rounded-lg hover:bg-accent transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="p-2 rounded-lg hover:bg-accent transition-colors">
              <User className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </header>
      {/* Main Layout */}
      <div className="flex-1 flex">
        {/* Left Chat Panel - 30% */}
        <div className="w-full md:w-[30%] bg-card border-r border-border flex flex-col">
          {/* Expert Title */}
          <div className="p-4 border-b border-border bg-accent">
            <h2 className="text-lg font-bold text-card-foreground">Python Expert</h2>
            <p className="text-sm text-muted-foreground">Python development & automation specialist</p>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl ${
                      message.isUser
                        ? 'bg-primary text-primary-foreground ml-4'
                        : 'bg-accent text-accent-foreground mr-4'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <span className={`text-xs ${
                      message.isUser ? 'text-primary-foreground/70' : 'text-muted-foreground'
                    } block mt-1`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] p-3 rounded-2xl bg-gray-100 text-gray-800 mr-4">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center bg-input rounded-2xl overflow-hidden border border-border">
              <textarea
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about Python development..."
                className="flex-1 p-3 bg-transparent text-foreground placeholder-muted-foreground focus:outline-none resize-none max-h-32"
                rows="1"
              />
              <button
                onClick={handleSendMessage}
                disabled={!currentMessage.trim() || isLoading}
                className="p-3 text-muted-foreground hover:text-primary transition-colors disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Preview Panel - 70% */}
        <div className="hidden md:flex md:w-[70%] bg-background flex-col">
          {/* Preview Panel Header */}
          <div className="p-6 bg-card border-b border-border">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-card-foreground">Python Expert</h2>
              <div className="flex items-center space-x-2">
                {isLoading && (
                  <div className="flex items-center space-x-2 text-secondary">
                    <div className="w-4 h-4 border-2 border-secondary border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm">Processing...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex-1 p-8 overflow-y-auto">
            {expertResponses.length > 0 ? (
              <div className="max-w-4xl mx-auto space-y-8">
                {expertResponses.map((expertResponse, index) => (
                  <div key={expertResponse.id} className="bg-card rounded-2xl p-8 shadow-sm border border-border">
                    <div className="space-y-6">
                      <div className="border-b border-border pb-4">
                        <h2 className="text-2xl font-bold text-card-foreground mb-2">Python Expert Analysis #{index + 1}</h2>
                        <p className="text-lg text-secondary font-medium">{expertResponse.question}</p>
                      </div>
                      
                      {expertResponse.answer.fallback ? (
                        <div className="bg-red-50 p-8 rounded-lg text-center">
                          <div className="mb-4">
                            <div className="text-6xl mb-4">🤖</div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Out of My Expertise</h3>
                          </div>
                          <p className="text-gray-700 text-lg leading-relaxed">
                            {expertResponse.answer.message}
                          </p>
                          <div className="mt-6 p-4 bg-white rounded-lg">
                            <p className="text-sm text-gray-600">
                              Our human Python experts will review your question and provide a detailed response shortly.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          <div className="bg-blue-50 p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                              <span className="text-blue-600 mr-2">🔹</span>
                              1. Problem Overview
                            </h3>
                            <p className="text-gray-700 leading-relaxed">{expertResponse.answer.problemOverview}</p>
                          </div>

                          <div className="bg-indigo-50 p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                              <span className="text-indigo-600 mr-2">🔹</span>
                              2. Core Concept Explanation
                            </h3>
                            <p className="text-gray-700 leading-relaxed">{expertResponse.answer.coreConceptExplanation}</p>
                          </div>

                          <div className="bg-green-50 p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                              <span className="text-green-600 mr-2">🔹</span>
                              3. Step-by-Step Solution or Best Practice
                            </h3>
                            <div className="text-gray-700 leading-relaxed prose max-w-none">
                              <div dangerouslySetInnerHTML={{ __html: expertResponse.answer.stepByStepSolution.replace(/\n/g, '<br>').replace(/```python/g, '<pre class="bg-gray-800 text-white p-4 rounded mt-2 mb-2 overflow-x-auto"><code>').replace(/```/g, '</code></pre>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                            </div>
                          </div>

                          <div className="bg-yellow-50 p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                              <span className="text-yellow-600 mr-2">🔹</span>
                              4. Gotchas or Common Pitfalls
                            </h3>
                            <p className="text-gray-700 leading-relaxed">{expertResponse.answer.gotchasAndPitfalls}</p>
                          </div>

                          <div className="bg-purple-50 p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                              <span className="text-purple-600 mr-2">🔹</span>
                              5. Summary or Recommendation
                            </h3>
                            <p className="text-gray-700 leading-relaxed">{expertResponse.answer.summaryRecommendation}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center max-w-2xl">
                  <h1 className="text-4xl font-bold mb-4 text-[#ff5000]">
                    Welcome to the Python Expert
                  </h1>
                  <p className="text-lg text-gray-600 mb-6">
                    Your specialized Python development assistant for automation, data analysis, web frameworks, and AI/ML solutions
                  </p>
                  <div className="bg-white rounded-2xl p-8 shadow-sm">
                    <p className="text-gray-500">
                      Ask me any Python-related question and I'll provide detailed guidance and best practices.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PythonExpertPage;