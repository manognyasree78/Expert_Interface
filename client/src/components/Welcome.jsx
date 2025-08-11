import { useState } from 'react';
import { useLocation } from 'wouter';
import LoginModal from './LoginModal';
import ProfileModal from './ProfileModal';

const Welcome = () => {
  const [, setLocation] = useLocation();
  const [showLogin, setShowLogin] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    setShowProfile(true);
  };

  const handleProfileSave = () => {
    setLocation('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        <div className="text-2xl font-bold">
          <span className="text-primary">EXPERT</span>
          <span className="text-secondary ml-2">APP</span>
        </div>
        <div className="space-x-4">
          <button
            onClick={() => setShowLogin(true)}
            className="px-6 py-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            Login
          </button>
          <button
            onClick={() => setShowLogin(true)}
            className="px-6 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors"
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-4xl w-full">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground text-center">
              Welcome to Expert App
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl text-center">
              One stop, where you can meet all the solutions for your problems
            </p>
            
            <button
              onClick={() => setShowLogin(true)}
              className="bg-primary text-primary-foreground px-12 py-4 rounded-2xl text-xl font-semibold hover:bg-primary/90 transition-colors shadow-lg"
            >
              Get Started
            </button>
            
            {/* Description section */}
            <div className="mt-16 max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Why Choose Expert Hub?</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">❄️</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">Intelligent Routing</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Our AI automatically routes your questions to the most relevant expert based on keywords and context.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💻</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">Expert Knowledge</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Get detailed, practical advice with code examples, best practices, and step-by-step guidance.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📈</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">Real-time Responses</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Chat interface with instant responses and the ability to ask follow-up questions for deeper insights.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <LoginModal 
        isOpen={showLogin} 
        onClose={() => setShowLogin(false)}
        onSuccess={handleLoginSuccess}
      />
      
      <ProfileModal 
        isOpen={showProfile} 
        onClose={() => setShowProfile(false)}
        onSave={handleProfileSave}
      />
    </div>
  );
};

export default Welcome;