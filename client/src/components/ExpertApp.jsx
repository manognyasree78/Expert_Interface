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
      expertType: expertTypeName,
      fromSearch: true
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
    // Navigate directly to specific expert page without pre-populating questions
    if (expertType === 'Python Expert') {
      setLocation('/python-expert');
    } else if (expertType === 'E-commerce Modernization Expert') {
      setLocation('/ecommerce-expert');
    } else {
      setLocation('/chat');
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
      iconBg: 'bg-secondary'
    },
    {
      title: 'E-commerce Modernization Expert', 
      description: 'Online store setup, digital marketing, payment systems, and sales optimization',
      icon: ShoppingBag,
      iconBg: 'bg-primary'
    }
  ];

  return (
    <div className="font-inter bg-background text-foreground min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-card shadow-sm z-50 px-4 py-4 border-b border-border">
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
              <Bell className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="p-2 rounded-lg hover:bg-accent transition-colors">
              <Settings className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="p-2 rounded-lg hover:bg-accent transition-colors">
              <User className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12 pt-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Welcome to Expert App
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              One stop, where you can meet all the solutions for your problems
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="flex items-center bg-card rounded-2xl shadow-lg overflow-hidden border border-border">
                <div className="pl-6 pr-3 py-4">
                  <Edit3 className="w-5 h-5 text-muted-foreground" />
                </div>
                <input 
                  type="text" 
                  placeholder="Hey, how can I help you today..." 
                  className="flex-1 py-4 px-2 text-foreground placeholder-muted-foreground bg-transparent focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-4 transition-colors"
                  onClick={handleSearch}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Expert Cards Section */}
          <div className="mb-16">
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {expertCards.map((card, index) => {
                const IconComponent = card.icon;
                return (
                  <div 
                    key={index}
                    className="bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-200 cursor-pointer group"
                    onClick={() => handleExpertClick(card.title)}
                  >
                    <div className="text-center">
                      <div className={`w-16 h-16 ${card.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-card-foreground mb-4">
                        {card.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExpertApp;
