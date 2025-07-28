import { useState } from 'react';
import { useLocation } from 'wouter';
import { 
  Bell, 
  Settings, 
  User, 
  Edit3, 
  Send, 
  Home,
  Code,
  ShoppingBag
} from 'lucide-react';

const ExpertApp = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [, setLocation] = useLocation();

  const detectExpertType = (query) => {
    const lowerQuery = query.toLowerCase();
    
    // Python-related keywords
    const pythonKeywords = ['python', 'django', 'flask', 'pandas', 'numpy', 'matplotlib', 'scikit', 'tensorflow', 'pytorch', 'jupyter', 'pip', 'conda', 'automation', 'script', 'data analysis', 'machine learning', 'ai', 'ml'];
    
    // E-commerce-related keywords
    const ecommerceKeywords = ['ecommerce', 'e-commerce', 'online store', 'shopify', 'woocommerce', 'magento', 'payment', 'checkout', 'cart', 'inventory', 'product', 'order', 'shipping', 'customer', 'sales', 'marketing', 'seo', 'conversion'];
    
    if (pythonKeywords.some(keyword => lowerQuery.includes(keyword))) {
      return 'python';
    } else if (ecommerceKeywords.some(keyword => lowerQuery.includes(keyword))) {
      return 'ecommerce';
    }
    
    return 'general';
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    // Detect expert type and navigate accordingly
    const expertType = detectExpertType(searchQuery);
    
    // Determine expert type name for n8n
    let expertTypeName = 'General Expert';
    if (expertType === 'python') {
      expertTypeName = 'Python Expert';
    } else if (expertType === 'ecommerce') {
      expertTypeName = 'E-commerce Modernization Expert';
    }

    // Store query data for the expert page
    sessionStorage.setItem('searchQuery', JSON.stringify({
      query: searchQuery,
      expertType: expertTypeName
    }));

    // Navigate to appropriate expert page based on detected type
    if (expertType === 'python') {
      setLocation('/python-expert');
    } else if (expertType === 'ecommerce') {
      setLocation('/ecommerce-expert');
    } else {
      // For general queries, navigate to Python expert as default
      setLocation('/python-expert');
    }
  };

  const handleExpertClick = async (expertType) => {
    const expertQuery = `I need help with ${expertType.toLowerCase()}`;
    
    // Store query data for the expert page
    sessionStorage.setItem('searchQuery', JSON.stringify({
      query: expertQuery,
      expertType: expertType
    }));

    // Navigate directly to specific expert page
    if (expertType === 'Python Expert') {
      setLocation(`/python-expert?q=${encodeURIComponent(expertQuery)}`);
    } else if (expertType === 'E-commerce Modernization Expert') {
      setLocation(`/ecommerce-expert?q=${encodeURIComponent(expertQuery)}`);
    } else {
      setLocation(`/chat?q=${encodeURIComponent(expertQuery)}&expert=${encodeURIComponent(expertType)}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const expertCards = [
    {
      title: 'Python Expert',
      description: 'Python development, automation, data analysis, web frameworks, and AI/ML solutions',
      icon: Code,
      gradient: 'from-blue-400 to-indigo-600',
      textColor: 'text-blue-100'
    },
    {
      title: 'E-commerce Modernization Expert',
      description: 'Online store setup, digital marketing, payment systems, and sales optimization',
      icon: ShoppingBag,
      gradient: 'from-green-400 to-teal-600',
      textColor: 'text-green-100'
    }
  ];

  return (
    <div className="font-inter bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50 px-4 py-4">
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
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <User className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12 pt-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Welcome to Expert App.
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              One stop, where you can meet all the solutions for your problems
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="flex items-center bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="pl-6 pr-3 py-4">
                  <Edit3 className="w-5 h-5 text-gray-400" />
                </div>
                <input 
                  type="text" 
                  placeholder="Hey, how can I help you today..." 
                  className="flex-1 py-4 px-2 text-gray-700 placeholder-gray-400 focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button 
                  className="bg-gradient-to-r from-expert-pink to-expert-purple text-white px-6 py-4 hover:opacity-90 transition-opacity"
                  onClick={handleSearch}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Expert Cards - 2 Big Centered Blocks */}
          <div className="flex flex-col md:flex-row gap-8 justify-center max-w-4xl mx-auto">
            {expertCards.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <div 
                  key={index}
                  className={`bg-gradient-to-br ${card.gradient} rounded-3xl p-8 text-white cursor-pointer transform hover:scale-105 transition-transform duration-200 shadow-xl flex-1 min-h-[280px] flex flex-col justify-center`}
                  onClick={() => handleExpertClick(card.title)}
                >
                  <div className="mb-6 flex justify-center">
                    <IconComponent className="w-16 h-16" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-center">
                    {card.title}
                  </h3>
                  <p className={`${card.textColor} text-base leading-relaxed text-center`}>
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExpertApp;
