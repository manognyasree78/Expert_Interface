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