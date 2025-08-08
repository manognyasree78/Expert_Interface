// Static questions and answers for Expert App

export const pythonQuestions = {
  "static method vs class method": {
    title: "Static Method vs. Class Method (Cooking Analogy)",
    problemOverview: "Think of a kitchen where different cooking methods serve different purposes. Static methods are like using a standalone tool that doesn't need to know about your specific kitchen setup, while class methods are like recipes that need to know what kind of kitchen they're working in.",
    coreConceptExplanation: "Static methods (@staticmethod) are independent utility functions that belong to a class but don't need access to the class or instance. Class methods (@classmethod) receive the class itself as the first parameter and can access class-level data.",
    stepByStepSolution: `# Kitchen analogy example
class Kitchen:
    kitchen_type = "Modern"
    
    @staticmethod
    def chop_vegetables(veggies):
        # This works the same in any kitchen
        return f"Chopped {veggies}"
    
    @classmethod
    def prepare_meal(cls, ingredients):
        # This knows what type of kitchen it's in
        return f"Preparing meal in {cls.kitchen_type} kitchen with {ingredients}"

# Usage:
Kitchen.chop_vegetables("carrots")  # Works independently
Kitchen.prepare_meal("pasta")       # Uses class information`,
    gotchasOrPitfalls: "Static methods can't access 'self' or 'cls' - they're completely independent. Class methods can't access instance variables, only class variables.",
    summaryOrRecommendation: "Use @staticmethod for utility functions that logically belong to the class but work independently. Use @classmethod when you need access to the class itself, often for alternative constructors.",
    visual: "🍳 Kitchen → 🔪 Static Tool (chop anywhere) vs 📋 Recipe (needs kitchen context)"
  },
  "python slicing": {
    title: "Python Slicing (Chef Analogy)",
    problemOverview: "Imagine you're a chef slicing ingredients on a cutting board. Python slicing works like telling your assistant exactly which pieces to take from a line of ingredients.",
    coreConceptExplanation: "Slicing uses [start:stop:step] syntax where 'start' is where you begin cutting, 'stop' is where you end (exclusive), and 'step' is how many pieces you skip each time.",
    stepByStepSolution: `# Chef's ingredient line: [🥕, 🥒, 🍅, 🧅, 🥬, 🌶️, 🥔, 🥦]
ingredients = ['carrot', 'cucumber', 'tomato', 'onion', 'lettuce', 'pepper', 'potato', 'broccoli']

# Take pieces 1 through 4 (not including 4)
ingredients[1:4]  # → ['cucumber', 'tomato', 'onion']

# Take every other ingredient
ingredients[::2]  # → ['carrot', 'tomato', 'lettuce', 'potato']

# Reverse the whole line
ingredients[::-1]  # → ['broccoli', 'potato', 'pepper', ...]

# Last 3 ingredients
ingredients[-3:]  # → ['pepper', 'potato', 'broccoli']`,
    gotchasOrPitfalls: "Remember: 'stop' is exclusive (you don't include that piece). Negative indices count from the end. Slicing creates a new list, not a reference.",
    summaryOrRecommendation: "Master slicing for clean, readable code. It's more efficient than loops for extracting portions of sequences. Practice with different step values.",
    visual: "🔪 Cutting board timeline: [0] [1] [2] [3] [4] → slice[1:4] takes positions 1,2,3"
  },
  "what is a function": {
    title: "What is a Function in Python (Cooking Example)",
    problemOverview: "A function is like a recipe in cooking - it takes ingredients (parameters), follows steps (code), and produces a dish (return value). You can use the same recipe multiple times with different ingredients.",
    coreConceptExplanation: "Functions are reusable blocks of code defined with 'def'. They can accept inputs (parameters), process them, and return results. This promotes code reusability and organization.",
    stepByStepSolution: `# Recipe function example
def make_smoothie(fruit, liquid="water"):
    """
    A recipe function that makes a smoothie
    """
    steps = f"1. Add {fruit} to blender"
    steps += f"\\n2. Pour {liquid}"
    steps += f"\\n3. Blend for 30 seconds"
    result = f"Delicious {fruit} smoothie ready!"
    return result

# Using our recipe:
breakfast = make_smoothie("banana", "milk")
print(breakfast)  # → "Delicious banana smoothie ready!"

# Function that returns a calculation
def square_number(num):
    """Returns the square of a number"""
    return num * num

result = square_number(5)  # → 25`,
    gotchasOrPitfalls: "Functions without 'return' statements return None. Use descriptive names. Be careful with mutable default parameters (use None instead of [] or {}).",
    summaryOrRecommendation: "Functions are building blocks of clean code. Always use clear names and add docstrings for complex functions. Think of them as reusable recipes.",
    visual: "📋 Recipe Card: Ingredients → [Process] → Final Dish"
  }
};

export const ecommerceQuestions = {
  "scalable architecture for high traffic": {
    title: "Scalable Architecture for High-Traffic Site (Cricket Stadium Analogy)",
    businessContext: "Think of a cricket stadium during the World Cup final - millions of fans trying to enter, buy food, and watch the game simultaneously. Your e-commerce site needs similar crowd management during Black Friday sales.",
    modernTechTrendsOverview: "Modern e-commerce architecture is like a well-organized stadium with multiple entry gates (load balancers), food courts in different sections (microservices), and efficient crowd control (caching and CDNs).",
    solutionApproach: `🏟️ Stadium Architecture for E-commerce:

**Multiple Entry Gates (Load Balancers)**
• Distribute incoming traffic across multiple servers
• Route users to least busy server sections

**Specialized Sections (Microservices)**
• User Registration Counter → User Management Service  
• Ticket Booking → Order Processing Service
• Payment Counter → Payment Processing Service
• Food Courts → Inventory Management Service

**Quick Access Routes (CDN)**
• Popular items cached closer to users
• Static content served from edge locations`,
    realWorldToolsOrExamples: `🛠️ **Cricket Stadium Tools → Tech Stack**
• Stadium Gates → AWS Load Balancer/NGINX
• Section Management → Docker/Kubernetes  
• Payment Counters → Stripe/PayPal APIs
• Crowd Analytics → Redis Cache + PostgreSQL
• Broadcasting System → CloudFlare CDN
• Security Team → AWS Shield/Cloudflare Security`,
    implementationTipsOrPitfalls: "Start with a small stadium (monolith) and gradually add specialized sections (microservices). Monitor crowd flow (database performance). Have backup plans for when sections get overcrowded (circuit breakers).",
    visual: "🏟️ Stadium Layout: [Gates] → [Sections] → [Services] + 📡 Broadcasting (CDN)"
  },
  "prevent online payment fraud": {
    title: "Strategies to Prevent Online Payment Fraud (Cricket Security Analogy)",
    businessContext: "Just like stadium security prevents fake tickets and unauthorized access during important cricket matches, e-commerce sites need multiple security layers to prevent payment fraud and protect both business and customers.",
    modernTechTrendsOverview: "Modern fraud prevention is like having multiple security checkpoints - from entry gate verification to behavioral analysis of suspicious crowd movements, using technology to spot patterns that human security can't catch.",
    solutionApproach: `🔒 **Multi-Layer Security (Cricket Stadium Style):**

**Gate Entry Checks (Basic Verification)**
• CVV verification → Ticket authenticity check
• Address verification → ID address matching
• Phone verification → Contact verification

**Behavioral Analysis (Crowd Monitoring)**  
• Unusual purchase patterns → Suspicious crowd behavior
• Device fingerprinting → Regular visitor recognition
• Velocity checks → Multiple rapid transactions

**AI Security Team (Smart Monitoring)**
• Machine learning fraud detection → Pattern recognition
• Risk scoring → Threat level assessment
• Real-time blocking → Immediate action on threats`,
    realWorldToolsOrExamples: `🛡️ **Security Arsenal**
• Stripe Radar → Automated fraud detection
• PayPal Fraud Protection → Real-time risk analysis  
• AWS Fraud Detector → Machine learning models
• Kount → Device fingerprinting and identity verification
• Custom ML Models → Behavioral pattern analysis`,
    implementationTipsOrPitfalls: "Balance security with user experience - too many checks frustrate genuine customers like over-zealous stadium security. Update fraud rules regularly as criminals adapt. Maintain PCI DSS compliance like stadium safety standards.",
    visual: "🛡️ Security Layers: [Entry Check] → [Behavior Monitor] → [AI Analysis] → ✅/❌ Decision"
  },
  "personalization enhances experience": {
    title: "How Personalization Enhances Customer Experience (Cricket Coach Analogy)",
    businessContext: "Like how a cricket coach studies each player's strengths, weaknesses, and preferences to create personalized training and game strategies, e-commerce personalization tailors the shopping experience to each customer's unique behavior and preferences.",
    modernTechTrendsOverview: "Modern personalization engines act like data-driven cricket coaches, analyzing every customer interaction (like tracking player performance) to provide personalized recommendations and experiences in real-time.",
    solutionApproach: `🏏 **Personal Coach Approach to E-commerce:**

**Player Analysis (Customer Data Collection)**
• Purchase history → Past performance analysis
• Browsing behavior → Training session observations  
• Search patterns → Skill area preferences
• Time spent on products → Interest intensity measurement

**Personalized Training (Customized Experience)**
• Product recommendations → Skill-specific training plans
• Dynamic pricing → Performance-based incentives
• Personalized content → Tailored coaching advice
• Custom email campaigns → Individual player communication

**Game Strategy (Real-time Optimization)**
• A/B testing different approaches → Strategy experimentation
• Real-time content adaptation → In-game strategy adjustments
• Behavioral triggers → Situational coaching cues`,
    realWorldToolsOrExamples: `🔧 **Coaching Toolkit:**
• Amazon Personalization → Advanced recommendation engine
• Shopify Personalization Apps → E-commerce specific tools
• Adobe Target → Content personalization platform
• Google Optimize → A/B testing and optimization
• Segment CDP → Customer data unification platform
• Dynamic Yield → Real-time personalization engine`,
    implementationTipsOrPitfalls: "Start with basic player categories (customer segments) before advanced individual coaching (AI personalization). Respect player privacy (data regulations). Test different coaching methods (A/B testing). Don't over-coach - let players enjoy the game naturally.",
    visual: "🏏 Coach Process: [Observe] → [Analyze] → [Personalize] → [Optimize] → 🎯 Better Performance"
  }
};

export const fallbackResponse = {
  message: "This question requires a deeper expertise. Let me tap in and get back to you.",
  isOutOfExpertise: true
};

// Helper function to find matching question
export function findAnswer(question, domain) {
  const normalizedQuestion = question.toLowerCase().trim();
  const questionBank = domain === 'python' ? pythonQuestions : ecommerceQuestions;
  
  // Find exact or partial matches
  for (const [key, answer] of Object.entries(questionBank)) {
    if (normalizedQuestion.includes(key) || key.includes(normalizedQuestion)) {
      return { ...answer, isOutOfExpertise: false };
    }
  }
  
  return fallbackResponse;
}