import { useState, useEffect } from 'react';
import { Settings, Bell, User, Send, Home } from 'lucide-react';
import { useLocation } from 'wouter';

const PythonExpertPage = () => {
  const [location, setLocation] = useLocation();
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  // Check for stored search query from homepage on component mount
  useEffect(() => {
    // First check for stored search data from homepage
    const storedData = sessionStorage.getItem('searchQuery');
    if (storedData) {
      try {
        const searchData = JSON.parse(storedData);
        if (searchData.query) {
          setMessages([
            { text: searchData.query, isUser: true, timestamp: new Date() },
            { 
              text: "I'm here to help you with Python development! How can I assist you today?", 
              isUser: false, 
              timestamp: new Date() 
            }
          ]);
          sessionStorage.removeItem('searchQuery');
          return;
        }
      } catch (error) {
        sessionStorage.removeItem('searchQuery');
      }
    }
    
    // Then check URL params as fallback
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    if (query && messages.length === 0) {
      setMessages([
        { text: query, isUser: true, timestamp: new Date() },
        { text: "I'm here to help you with Python development! How can I assist you today?", isUser: false, timestamp: new Date() }
      ]);
    }
  }, []);

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

    const newMessage = { text: currentMessage, isUser: true, timestamp: new Date() };
    setMessages(prev => [...prev, newMessage, {
      text: "I'm here to help you with Python development! What specific challenge are you working on?",
      isUser: false,
      timestamp: new Date()
    }]);
    
    setCurrentMessage('');
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
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h2 className="text-lg font-bold text-gray-800">Python Expert</h2>
            <p className="text-sm text-gray-600">Python development & automation specialist</p>
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
                        ? 'bg-gradient-to-r from-blue-400 to-indigo-600 text-white ml-4'
                        : 'bg-gray-100 text-gray-800 mr-4'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <span className={`text-xs ${
                      message.isUser ? 'text-blue-100' : 'text-gray-500'
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
                placeholder="Ask me about Python development..."
                className="flex-1 p-3 bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none resize-none max-h-32"
                rows="1"
              />
              <button
                onClick={handleSendMessage}
                disabled={!currentMessage.trim() || isLoading}
                className="p-3 text-gray-400 hover:text-blue-600 transition-colors disabled:opacity-50"
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
              <h2 className="text-xl font-bold text-gray-900">Python Expert</h2>
              <div className="flex items-center space-x-2">
                {isLoading && (
                  <div className="flex items-center space-x-2 text-blue-600">
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm">Processing...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex-1 p-8 overflow-y-auto">
            <div className="flex items-center justify-center h-full">
              <div className="text-center max-w-2xl">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Welcome to the Python Expert
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                  Your specialized Python development assistant for automation, data analysis, web frameworks, and AI/ML solutions
                </p>
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <p className="text-gray-500 mb-4">
                    I can help you with:
                  </p>
                  <ul className="text-left text-gray-600 space-y-2 mb-6">
                    <li>• Python scripting and automation</li>
                    <li>• Web development with Django/Flask</li>
                    <li>• Data analysis with pandas/numpy</li>
                    <li>• Machine learning with scikit-learn/TensorFlow</li>
                    <li>• API development and integration</li>
                    <li>• Code optimization and debugging</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PythonExpertPage;