import { useState, useEffect } from 'react';
import { Settings, Bell, User, Send, Home } from 'lucide-react';
import { useLocation } from 'wouter';

const EcommerceExpertPage = () => {
  const [location, setLocation] = useLocation();
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [n8nResponse, setN8nResponse] = useState(null);

  // Get initial query from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    if (query && messages.length === 0) {
      setMessages([{ text: query, isUser: true, timestamp: new Date() }]);
      // Simulate API call to n8n
      handleN8nResponse(query);
    }
  }, []);

  const handleN8nResponse = async (query) => {
    setIsLoading(true);
    
    // Add user message immediately for responsiveness
    setMessages(prev => [...prev, { 
      text: "I'm processing your E-commerce question. Let me help you with that.", 
      isUser: false, 
      timestamp: new Date() 
    }]);
    
    // Send to n8n webhook silently in background
    try {
      fetch('https://n8n.ottobon.in/webhook-test/session-start', {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          query, 
          expertType: 'E-commerce Modernization Expert',
          timestamp: new Date().toISOString()
        })
      }).then(response => {
        if (response.ok) {
          return response.json();
        }
        return null;
      }).then(data => {
        if (data) {
          console.log('n8n response received:', data);
          setN8nResponse(data);
          
          // Update chat with actual response if available
          const responseText = data.message || data.response || data.output || "E-commerce expert analysis complete.";
          setMessages(prev => [...prev, { 
            text: responseText, 
            isUser: false, 
            timestamp: new Date() 
          }]);
        } else {
          // Set basic response when n8n is not available
          setN8nResponse({
            query: query,
            expert: 'E-commerce Modernization Expert',
            message: 'E-commerce expert ready to assist with your question'
          });
        }
      }).catch(() => {
        // Set basic response on any error
        setN8nResponse({
          query: query,
          expert: 'E-commerce Modernization Expert',
          message: 'E-commerce expert ready to assist with your question'
        });
      });
    } catch (error) {
      // Set basic response on any fetch error
      setN8nResponse({
        query: query,
        expert: 'E-commerce Modernization Expert',
        message: 'E-commerce expert ready to assist with your question'
      });
    }
    
    setIsLoading(false);
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const newMessage = { text: currentMessage, isUser: true, timestamp: new Date() };
    setMessages(prev => [...prev, newMessage]);
    
    const messageToSend = currentMessage;
    setCurrentMessage('');
    
    await handleN8nResponse(messageToSend);
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
            {n8nResponse ? (
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">n8n Workflow Response</h3>
                      <span className="text-xs text-gray-500">
                        {new Date().toLocaleTimeString()}
                      </span>
                    </div>
                    
                    {/* Display n8n response data */}
                    {typeof n8nResponse === 'object' ? (
                      <div className="space-y-4">
                        {Object.entries(n8nResponse).map(([key, value]) => (
                          <div key={key} className="border-b border-gray-100 pb-4 last:border-b-0">
                            <h4 className="text-md font-semibold text-gray-800 mb-2 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            </h4>
                            <div className="text-gray-600">
                              {typeof value === 'object' ? (
                                <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                                  {JSON.stringify(value, null, 2)}
                                </pre>
                              ) : (
                                <div className="bg-green-50 p-4 rounded-lg">
                                  <p className="whitespace-pre-wrap text-gray-800">{String(value)}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-gray-600">
                        <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto font-mono text-sm">
                          {JSON.stringify(n8nResponse, null, 2)}
                        </pre>
                      </div>
                    )}
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
                      I can help you with:
                    </p>
                    <ul className="text-left text-gray-600 space-y-2 mb-6">
                      <li>• Online store setup and optimization</li>
                      <li>• Digital marketing and SEO strategies</li>
                      <li>• Payment gateway integration</li>
                      <li>• Inventory and order management</li>
                      <li>• Customer acquisition and retention</li>
                      <li>• Conversion rate optimization</li>
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