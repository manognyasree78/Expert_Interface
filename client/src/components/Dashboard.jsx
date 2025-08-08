import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { User, ChevronDown, Home, Send, Code, ShoppingBag } from 'lucide-react';

const Dashboard = () => {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
      setLocation('/');
      return;
    }
    setCurrentUser(user);
  }, []);

  const detectDomain = (query) => {
    const lowerQuery = query.toLowerCase();
    
    // Python keywords
    const pythonKeywords = ['python', 'function', 'class', 'method', 'list', 'dictionary', 'loop', 'variable', 'import', 'def', 'return'];
    
    // E-commerce keywords  
    const ecommerceKeywords = ['ecommerce', 'e-commerce', 'shop', 'store', 'payment', 'cart', 'order', 'customer', 'product', 'sales', 'marketing', 'business'];
    
    const hasPythonKeywords = pythonKeywords.some(keyword => lowerQuery.includes(keyword));
    const hasEcommerceKeywords = ecommerceKeywords.some(keyword => lowerQuery.includes(keyword));
    
    if (hasPythonKeywords) return 'python';
    if (hasEcommerceKeywords) return 'ecommerce';
    return 'python'; // default
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    const domain = detectDomain(searchQuery);
    
    // Store the question for the expert page
    sessionStorage.setItem('pendingQuestion', searchQuery);
    
    // Navigate to appropriate expert page
    setLocation(`/expert/${domain}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleCardClick = (domain) => {
    setLocation(`/expert/${domain}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setLocation('/');
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="flex justify-between items-center p-6 border-b border-border">
        <div className="flex items-center space-x-4">
          <Home className="w-8 h-8 text-primary" />
          <div className="text-2xl font-bold">
            <span className="text-primary">EXPERT</span>
            <span className="text-secondary ml-2">APP</span>
          </div>
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="flex items-center space-x-2 p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <User className="w-6 h-6 text-muted-foreground" />
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </button>
          
          {showProfileDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-10">
              <button className="w-full text-left px-4 py-2 hover:bg-accent text-card-foreground">
                Learnability Profile
              </button>
              <button 
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-accent text-card-foreground border-t border-border"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Welcome back, {currentUser.email.split('@')[0]}!
          </h1>
          <p className="text-xl text-muted-foreground mb-12">
            What can I help you with today?
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="flex items-center bg-card border border-border rounded-2xl overflow-hidden shadow-lg">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Hey, how can I help you today..."
                className="flex-1 px-6 py-4 bg-transparent text-foreground placeholder-muted-foreground focus:outline-none"
              />
              <button 
                onClick={handleSearch}
                className="bg-primary text-primary-foreground px-6 py-4 hover:bg-primary/90 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Expert Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Python Expert Card */}
            <div 
              onClick={() => handleCardClick('python')}
              className="bg-card border border-border rounded-2xl p-8 cursor-pointer hover:border-secondary/50 transition-all duration-200 group"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-4">
                  🟦 Python Expert
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Python development, automation, data analysis, web frameworks, and AI/ML solutions
                </p>
              </div>
            </div>

            {/* E-commerce Expert Card */}
            <div 
              onClick={() => handleCardClick('ecommerce')}
              className="bg-card border border-border rounded-2xl p-8 cursor-pointer hover:border-primary/50 transition-all duration-200 group"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <ShoppingBag className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-4">
                  🟧 E-commerce Modernization Expert
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Online store setup, digital marketing, payment systems, and sales optimization
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;