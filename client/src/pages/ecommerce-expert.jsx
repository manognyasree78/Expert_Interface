import { useState, useEffect } from 'react';
import { Settings, Bell, User, Send, Home } from 'lucide-react';
import { useLocation } from 'wouter';
import { findRelevantKnowledge } from '../data/expertKnowledge';

const EcommerceExpertPage = () => {
  const [location, setLocation] = useLocation();
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [expertResponse, setExpertResponse] = useState(null);


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
    const knowledge = findRelevantKnowledge(query, 'ecommerce');
    
    if (knowledge) {
      setMessages(prev => [...prev, 
        { text: query, isUser: true, timestamp: new Date() },
        { 
          text: "I've analyzed your E-commerce question and prepared a comprehensive strategy. Check the preview panel for detailed guidance!", 
          isUser: false, 
          timestamp: new Date() 
        }
      ]);
      setExpertResponse(knowledge);
    } else {
      setMessages(prev => [...prev,
        { text: query, isUser: true, timestamp: new Date() },
        { 
          text: "I'm here to help you with E-commerce modernization! For the most detailed responses, try asking about topics like headless architecture, personalization, microservices, or performance optimization.", 
          isUser: false, 
          timestamp: new Date() 
        }
      ]);
    }
  };

  // Simple message handler without n8n
  const handleEcommerceQuestion = (question) => {
    setMessages(prev => [...prev, { 
      text: "I'm here to help you with E-commerce modernization! What specific challenge are you working on?", 
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
    <div className="font-inter bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm z-50 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Home Button and Logo */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setLocation('/')}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <Home className="w-5 h-5 text-gray-600" />
            </button>
            <button 
              onClick={() => setLocation('/')}
              className="flex items-center space-x-1 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <span className="text-xl font-bold text-expert-pink">EXPERT</span>
              <span className="text-xl font-bold text-expert-purple">APP</span>
            </button>
          </div>
          
          {/* Header Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <User className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 flex">
        {/* Left Chat Panel - 30% */}
        <div className="w-full md:w-[30%] bg-white border-r border-gray-200 flex flex-col">
          {/* Expert Title */}
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-teal-50">
            <h2 className="text-lg font-bold text-gray-800">E-commerce Modernization Expert</h2>
            <p className="text-sm text-gray-600">Online business modernization & digital transformation specialist</p>
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
                        ? 'bg-gradient-to-r from-green-400 to-teal-600 text-white ml-4'
                        : 'bg-gray-100 text-gray-800 mr-4'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <span className={`text-xs ${
                      message.isUser ? 'text-green-100' : 'text-gray-500'
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
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center bg-gray-50 rounded-2xl overflow-hidden">
              <textarea
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about e-commerce strategies..."
                className="flex-1 p-3 bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none resize-none max-h-32"
                rows="1"
              />
              <button
                onClick={handleSendMessage}
                disabled={!currentMessage.trim() || isLoading}
                className="p-3 text-gray-400 hover:text-green-600 transition-colors disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Preview Panel - 70% */}
        <div className="hidden md:flex md:w-[70%] bg-gray-50 flex-col">
          {/* Preview Panel Header */}
          <div className="p-6 bg-white border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">E-commerce Modernization Expert</h2>
              <div className="flex items-center space-x-2">
                {isLoading && (
                  <div className="flex items-center space-x-2 text-green-600">
                    <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm">Processing...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex-1 p-8 overflow-y-auto">
            {expertResponse ? (
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <div className="space-y-6">
                    <div className="border-b border-gray-200 pb-4">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">E-commerce Modernization Strategy</h2>
                      <p className="text-lg text-green-600 font-medium">{expertResponse.question}</p>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="bg-blue-50 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                          <span className="text-blue-600 mr-2">🔹</span>
                          1. Business Context
                        </h3>
                        <p className="text-gray-700 leading-relaxed">{expertResponse.answer.businessContext}</p>
                      </div>

                      <div className="bg-indigo-50 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                          <span className="text-indigo-600 mr-2">🔹</span>
                          2. Modern Tech/Trends Overview
                        </h3>
                        <p className="text-gray-700 leading-relaxed">{expertResponse.answer.modernTechTrendsOverview}</p>
                      </div>

                      <div className="bg-green-50 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                          <span className="text-green-600 mr-2">🔹</span>
                          3. Solution Approach
                        </h3>
                        <div className="text-gray-700 leading-relaxed prose max-w-none">
                          <div dangerouslySetInnerHTML={{ __html: expertResponse.answer.solutionApproach.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\* /g, '• ') }} />
                        </div>
                      </div>

                      <div className="bg-yellow-50 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                          <span className="text-yellow-600 mr-2">🔹</span>
                          4. Real-world Tools or Examples
                        </h3>
                        <div className="text-gray-700 leading-relaxed prose max-w-none">
                          <div dangerouslySetInnerHTML={{ __html: expertResponse.answer.realWorldToolsExamples.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\* /g, '• ') }} />
                        </div>
                      </div>

                      <div className="bg-purple-50 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                          <span className="text-purple-600 mr-2">🔹</span>
                          5. Implementation Tips or Pitfalls
                        </h3>
                        <p className="text-gray-700 leading-relaxed">{expertResponse.answer.implementationTipsAndPitfalls}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center max-w-2xl">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Welcome to the E-commerce Modernization Expert
                  </h1>
                  <p className="text-lg text-gray-600 mb-6">
                    Your specialized consultant for modernizing e-commerce platforms and digital transformation
                  </p>
                  <div className="bg-white rounded-2xl p-8 shadow-sm">
                    <p className="text-gray-500 mb-4">
                      Try asking about:
                    </p>
                    <ul className="text-left text-gray-600 space-y-2 mb-6">
                      <li>• "How can I migrate to headless architecture?"</li>
                      <li>• "What are best practices for personalized recommendations?"</li>
                      <li>• "How do I integrate AI-driven search and filtering?"</li>
                      <li>• "Can you guide me on microservices migration?"</li>
                      <li>• "What tools improve site speed and UX?"</li>
                    </ul>
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

export default EcommerceExpertPage;