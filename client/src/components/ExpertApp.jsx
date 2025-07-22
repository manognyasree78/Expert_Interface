import { useState } from 'react';
import { useLocation } from 'wouter';
import { 
  Bell, 
  Settings, 
  User, 
  Edit3, 
  Send, 
  Megaphone, 
  Monitor, 
  TrendingUp, 
  Users, 
  Scale, 
  ShoppingCart 
} from 'lucide-react';

const ExpertApp = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [, setLocation] = useLocation();

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      // Send search query to n8n webhook
      const response = await fetch(`${import.meta.env.VITE_N8N_WEBHOOK_URL || 'https://n8n.mydomain.com'}/webhook/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery })
      });
      
      const data = await response.json();
      console.log('Search response:', data);
      
      // Navigate to chat page with the search query
      setLocation(`/chat?q=${encodeURIComponent(searchQuery)}`);
      
    } catch (error) {
      console.error('Search error:', error);
      // Still navigate to chat page even if webhook fails
      setLocation(`/chat?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleExpertClick = async (expertType) => {
    const expertQuery = `I need help with ${expertType.toLowerCase()}`;
    
    try {
      // Send expert type to n8n webhook
      const response = await fetch(`${import.meta.env.VITE_N8N_WEBHOOK_URL || 'https://n8n.mydomain.com'}/webhook/expert`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expertType, query: expertQuery })
      });
      
      const data = await response.json();
      console.log('Expert response:', data);
      
      // Navigate to chat page with expert context
      setLocation(`/chat?q=${encodeURIComponent(expertQuery)}&expert=${encodeURIComponent(expertType)}`);
      
    } catch (error) {
      console.error('Expert error:', error);
      // Still navigate to chat page even if webhook fails
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
      title: 'Marketing Expert',
      description: 'Strategy, campaigns, branding, and customer engagement solutions',
      icon: Megaphone,
      gradient: 'from-pink-400 to-purple-600',
      textColor: 'text-pink-100'
    },
    {
      title: 'Technology Expert',
      description: 'Software development, IT infrastructure, and digital transformation',
      icon: Monitor,
      gradient: 'from-sky-400 to-blue-600',
      textColor: 'text-sky-100'
    },
    {
      title: 'Finance Expert',
      description: 'Financial planning, investment strategies, and budget management',
      icon: TrendingUp,
      gradient: 'from-green-400 to-emerald-600',
      textColor: 'text-green-100'
    },
    {
      title: 'HR Expert',
      description: 'Talent acquisition, employee engagement, and HR tech',
      icon: Users,
      gradient: 'from-orange-400 to-amber-600',
      textColor: 'text-orange-100'
    },
    {
      title: 'Legal Expert',
      description: 'Contracts, compliance, IP protection, and legal advice',
      icon: Scale,
      gradient: 'from-purple-400 to-violet-600',
      textColor: 'text-purple-100'
    },
    {
      title: 'Sales Expert',
      description: 'Sales enablement, CRM strategy, and pipeline optimization',
      icon: ShoppingCart,
      gradient: 'from-yellow-400 to-orange-600',
      textColor: 'text-yellow-100'
    }
  ];

  return (
    <div className="font-inter bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-1">
            <span className="text-xl font-bold text-expert-pink">EXPERT</span>
            <span className="text-xl font-bold text-expert-purple">APP</span>
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

          {/* Expert Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertCards.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <div 
                  key={index}
                  className={`bg-gradient-to-br ${card.gradient} rounded-2xl p-6 text-white cursor-pointer transform hover:scale-105 transition-transform duration-200 shadow-lg`}
                  onClick={() => handleExpertClick(card.title)}
                >
                  <div className="mb-4">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    {card.title}
                  </h3>
                  <p className={`${card.textColor} text-sm`}>
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
