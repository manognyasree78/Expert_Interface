import { useState } from 'react';
import { CheckCircle } from 'lucide-react';

const ProfileModal = ({ isOpen, onClose, onSave }) => {
  const [step, setStep] = useState('welcome');
  const [profileData, setProfileData] = useState({
    explanationStyle: '',
    interests: '',
    detailLevel: '',
    learningStyle: '',
    feedbackStyle: ''
  });

  const handleSave = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const updatedUser = { ...currentUser, profile: profileData };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    setStep('complete');
  };

  const handleComplete = () => {
    onSave(profileData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card rounded-2xl p-8 w-full max-w-2xl mx-4 border border-border max-h-[90vh] overflow-y-auto">
        
        {step === 'welcome' && (
          <div className="text-center">
            <div className="text-6xl mb-6">🧠</div>
            <h2 className="text-3xl font-bold text-card-foreground mb-4">Learnability Profile</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Hi! I want to answer your questions in the way you understand best...
            </p>
            <button
              onClick={() => setStep('questions')}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Let's Start
            </button>
          </div>
        )}

        {step === 'questions' && (
          <div>
            <h2 className="text-2xl font-bold text-card-foreground mb-6">Tell Us About Yourself</h2>
            
            <div className="space-y-8">
              {/* Question 1 */}
              <div>
                <h3 className="text-lg font-semibold text-card-foreground mb-4">
                  How do you like things explained?
                </h3>
                <div className="space-y-2">
                  {[
                    'With simple examples',
                    'With step-by-step instructions', 
                    'Through stories or analogies'
                  ].map((option) => (
                    <label key={option} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="explanationStyle"
                        value={option}
                        onChange={(e) => setProfileData({...profileData, explanationStyle: e.target.value})}
                        className="text-primary focus:ring-primary"
                      />
                      <span className="text-card-foreground">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Question 2 */}
              <div>
                <h3 className="text-lg font-semibold text-card-foreground mb-4">
                  Which topics or hobbies do you love?
                </h3>
                <input
                  type="text"
                  value={profileData.interests}
                  onChange={(e) => setProfileData({...profileData, interests: e.target.value})}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Tell us about your interests..."
                />
              </div>

              {/* Question 3 */}
              <div>
                <h3 className="text-lg font-semibold text-card-foreground mb-4">
                  How much detail do you prefer?
                </h3>
                <div className="space-y-2">
                  {[
                    'Short and to the point',
                    'Balanced',
                    'Detailed, with all steps'
                  ].map((option) => (
                    <label key={option} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="detailLevel"
                        value={option}
                        onChange={(e) => setProfileData({...profileData, detailLevel: e.target.value})}
                        className="text-primary focus:ring-primary"
                      />
                      <span className="text-card-foreground">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Question 4 */}
              <div>
                <h3 className="text-lg font-semibold text-card-foreground mb-4">
                  What's your favorite way to learn?
                </h3>
                <div className="space-y-2">
                  {[
                    'Reading or text',
                    'Doing hands-on activities',
                    'Listening to explanations'
                  ].map((option) => (
                    <label key={option} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="learningStyle"
                        value={option}
                        onChange={(e) => setProfileData({...profileData, learningStyle: e.target.value})}
                        className="text-primary focus:ring-primary"
                      />
                      <span className="text-card-foreground">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Question 5 */}
              <div>
                <h3 className="text-lg font-semibold text-card-foreground mb-4">
                  How do you want feedback? (Optional)
                </h3>
                <div className="space-y-2">
                  {[
                    'Quick tips only',
                    'Detailed feedback on mistakes',
                    'Encourage me, don\'t criticize',
                    'No feedback, just answers'
                  ].map((option) => (
                    <label key={option} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="feedbackStyle"
                        value={option}
                        onChange={(e) => setProfileData({...profileData, feedbackStyle: e.target.value})}
                        className="text-primary focus:ring-primary"
                      />
                      <span className="text-card-foreground">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2 mt-6">
                <input type="checkbox" className="text-primary focus:ring-primary" defaultChecked />
                <span className="text-sm text-muted-foreground">Remember this for all conversations</span>
              </div>

              <button
                onClick={handleSave}
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Save Profile
              </button>
            </div>
          </div>
        )}

        {step === 'complete' && (
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-card-foreground mb-4">All Set!</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Your profile has been saved. Let's get started with Expert App!
            </p>
            <button
              onClick={handleComplete}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Get Started
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileModal;