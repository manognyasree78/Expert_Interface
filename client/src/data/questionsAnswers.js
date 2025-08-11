// Static questions and answers for Expert App
import ecommerce1Img from '../assets/ecommerce1.png';
import ecommerce2Img from '../assets/ecommerce2.jpg';
import ecommerce3Img from '../assets/ecommerce3.jpg';

export const pythonQuestions = {
  "static method vs class method": {
    title: "Static Method vs. Class Method in Python (With Cooking Analogy)",
    problemOverview: "When you write functions inside a Python class, you get three types: instance methods, static methods, and class methods. Let's ignore instance methods for now and focus on static vs. class methods. A static method is just a helper function inside the class—it has no access to the class or any of its data. A class method knows about the class itself (not about an individual object), so it can read/change things like the recipe's category for all recipes.",
    coreConceptExplanation: "Static method: Like a kitchen timer. No matter what you're cooking, you can use it the same way—it doesn't care if you're baking bread or making soup. Class method: Like a chef's hat that shows your kitchen's \"theme\" (Italian, Indian, etc.). The hat is special because it knows the cuisine type of all your recipes and can update the kitchen's category if you change it.",
    stepByStepSolution: `class Recipe:
    cuisine = "Italian"   # class-level attribute

    @staticmethod
    def kitchen_timer(minutes):
        return f"Set the timer for {minutes} minutes."

    @classmethod
    def show_cuisine(cls):
        return f"This kitchen is for {cls.cuisine} cooking!"

# Use the timer for any dish:
Recipe.kitchen_timer(10)     # "Set the timer for 10 minutes."

# Show the current cuisine:
Recipe.show_cuisine()        # "This kitchen is for Italian cooking!"

# Diagram (Kitchen Edition)
      Recipe Class
      /         \\
 [Static]     [Class]
   |             |
 Timer     Shows/changes cuisine
(Any dish)   (All recipes)`,
    gotchasOrPitfalls: "Use static methods for general tools. Use class methods when you want to access or change class-wide info.",
    summaryOrRecommendation: "Static methods are utility functions that don't need class data. Class methods can access and modify class-level attributes. Choose based on whether you need class context.",
    visual: "🍳👨‍🍳"
  },
  "python slicing": {
    title: "Slicing in Python (Explained Like a Chef)",
    problemOverview: "Python's slicing lets you take just a part of a list, just like slicing a loaf of bread, a cake, or veggies. You can slice a list of ingredients using [start:stop:step]: start = where to begin (included), stop = where to end (excluded), step = how many to skip (optional).",
    coreConceptExplanation: "Slicing a loaf: Want just the middle slices? Use slicing! Slicing an ingredient list: Only need ingredients 2 to 4? Just slice that section. Want every second slice? Use [::2].",
    stepByStepSolution: `ingredients = ["flour", "eggs", "milk", "sugar", "butter", "vanilla"]

# Get ingredients from eggs to sugar (index 1 to 3)
print(ingredients[1:4])  # ['eggs', 'milk', 'sugar']

# Get first three
print(ingredients[:3])   # ['flour', 'eggs', 'milk']

# Get every other ingredient
print(ingredients[::2])  # ['flour', 'milk', 'butter']

# Diagram (Cutting Cake Slices)
Indexes:     0      1     2      3      4        5
Items:   [flour, eggs, milk, sugar, butter, vanilla]
Slice:         ^---^---^
             ['eggs', 'milk', 'sugar']`,
    gotchasOrPitfalls: "Use slicing to quickly grab just the ingredients or steps you need, no matter how long the list is.",
    summaryOrRecommendation: "Slicing extracts portions of lists using [start:stop:step] syntax. Perfect for getting specific ranges of data efficiently.",
    visual: "🍞✂️"
  },
  "what is a function": {
    title: "What is a Function in Python? (With Cooking Example)",
    problemOverview: "A function is like a reusable recipe in your cookbook. You give it an ingredient, it does the work, and you get a finished dish. Give it a number (e.g., 5), it \"squares\" it (5 × 5 = 25).",
    coreConceptExplanation: "Imagine a \"Double Portions\" recipe: You tell it 3 servings, it magically gives you a dish for 9 people. It's a way to use the same logic over and over, no matter what input you give.",
    stepByStepSolution: `def square(servings):
    """Returns the square of the number of servings."""
    return servings * servings

print(square(5))   # Output: 25

# Diagram (Recipe Flow)
[Number of servings] --> [square() function] --> [Servings squared]

Example:  4 --> square() --> 16

# Side Table (Just for Clarity)
Input   Output
2       4
3       9
7       49`,
    gotchasOrPitfalls: "Functions help you avoid repeating code and make programs more organized. Always include a docstring to explain what the function does.",
    summaryOrRecommendation: "Functions are reusable blocks of code that take inputs, process them, and return outputs. They're essential for organizing and structuring your programs.",
    visual: "🔧⚙️"
  }
};

export const ecommerceQuestions = {
  "scalable architecture": {
    title: "How would you design a scalable architecture for a high-traffic e-commerce site?",
    businessContext: "A scalable e-commerce architecture means your site can handle a LOT of users at once – think 'IPL Finals ticket rush!' You want fast, reliable, and secure shopping, no matter the crowd size.",
    technologyOverview: "Use a cloud platform (like AWS, Azure, or Google Cloud) for flexibility and scaling. Think of this as setting up a strong cricket pitch—if the base is weak, the whole game struggles.",
    solutionApproach: `1. Start with a Solid Foundation
Use a cloud platform (like AWS, Azure, or Google Cloud) for flexibility and scaling.

2. Use Load Balancers  
Place load balancers at the front to direct user traffic evenly, like umpires distributing overs across bowlers.

3. Break Up Functions (Microservices)
Divide the app into parts: Product Service, Order Service, User Service, Payment Service. Each "player" (service) has a role—like a batsman, bowler, and fielder.

4. Scale Databases
Use a mix of SQL (for critical data: orders, users) and NoSQL (for fast-changing data: product catalog, reviews).

5. Use CDN for Static Content
Host images, CSS, and scripts on a Content Delivery Network—like setting fielders all around the boundary for faster pickups.

6. Monitor and Auto-Scale
Set up auto-scaling to add more "players" (servers) when traffic spikes (think: super overs!).`,
    realWorldToolsOrExamples: `Building this architecture is like assembling an IPL team: you want specialists (microservices), backup players (auto-scale), a good ground (cloud infra), and sharp field placement (CDN/load balancers) to handle any crowd size.

Simple Visual Flow:
User → Load Balancer → [Microservices] → Databases/Cache/CDN`,
    implementationTipsOrPitfalls: "Read replicas and caching (Redis/Memcached) speed things up—like having extra fielders at boundary for fast coverage. Use monitoring tools (CloudWatch, Datadog) to track site health—just like team stats and live match analysis.",
    visual: "🏏🏟️",
    image: ecommerce1Img
  },
  "payment fraud prevention": {
    title: "What are some strategies to prevent online payment fraud?",
    businessContext: "Payment fraud prevention is like keeping a sharp wicketkeeper and alert fielders—every transaction is watched, and the stumps are protected from sneaky runs.",
    technologyOverview: "Use secure payment gateways, multi-factor authentication, machine learning monitoring, address verification, data encryption, and velocity checks to create multiple layers of protection.",
    solutionApproach: `1. Use Secure Payment Gateways
Integrate trusted payment gateways (Razorpay, Stripe, PayPal)—like choosing the best umpires for a fair match.

2. Enable Multi-Factor Authentication
Ask users for OTPs or biometrics during checkout, just as an umpire double-checks a run-out.

3. Monitor Transactions Automatically
Use machine learning to spot unusual activity (big orders, mismatched locations)—like a third umpire reviewing suspicious plays.

4. Address Verification & CVV
Always verify billing address and CVV code, like checking if batsman is within the crease.

5. Tokenize & Encrypt Data
Never store raw card data; always use encrypted "tokens"—as secure as a batsman's helmet and pads.

6. Set Velocity Checks
Limit the number of transactions per user/card in a time window, just like an over limit per bowler.`,
    realWorldToolsOrExamples: `Simple Visual:
User → Payment Form → [Gateway: 2FA, Checks, ML Rules] → Payment Complete/Flagged

Tools: Stripe Radar, PayPal Fraud Protection, AWS Fraud Detector`,
    implementationTipsOrPitfalls: "Always use HTTPS for all payment pages. Never store sensitive payment data locally. Regularly update fraud detection rules based on new patterns. Monitor false positives to avoid blocking legitimate customers.",
    visual: "🛡️🔒",
    image: ecommerce2Img
  },
  "personalization customer experience": {
    title: "How does personalization improve customer experience in e-commerce?",
    businessContext: "Personalization is the coach who knows your game inside out—always giving you the right tips, gear, and encouragement for your best performance.",
    technologyOverview: "Track user behavior, analyze preferences, use machine learning for recommendations, create dynamic content, and automate personalized communications to enhance user experience.",
    solutionApproach: `1. Track User Preferences
Record what each user browses or buys—like keeping each player's batting stats.

2. Recommend Relevant Products  
Show "You may also like…" or "Recommended for you" based on their activity. Just like a coach suggesting a batsman work on specific shots after seeing him play.

3. Personalized Emails and Offers
Send custom deals on user's birthday, or reminders about their wish list—like sending a personalized practice schedule to each cricketer.

4. Dynamic Homepage and Navigation
Display products and banners relevant to user's interests—like setting fielders based on the batsman's favorite shots.

5. Simplify Checkout
Pre-fill shipping info, suggest repeat orders—like a coach prepping gear for the next match automatically.`,
    realWorldToolsOrExamples: `Simple Visual Flow:
User Activity → Data Collection → Personalized Recommendations/Emails/Offers

Examples:
- Amazon's "Customers who bought this also bought"
- Netflix's "Recommended for you"
- Spotify's personalized playlists

Tools: Adobe Target, Optimizely, Dynamic Yield`,
    implementationTipsOrPitfalls: "Start simple with basic recommendations, then advance to AI-driven personalization. Always respect user privacy and provide opt-out options. Test different personalization strategies to see what works best for your audience.",
    visual: "🎯🤝",
    image: ecommerce3Img
  }
};

// Helper function to find the best matching answer
export const findAnswer = (userQuestion, domain) => {
  const questions = domain === 'python' ? pythonQuestions : ecommerceQuestions;
  const normalizedQuestion = userQuestion.toLowerCase().trim();
  
  // Specific matching for each domain - more precise matching
  if (domain === 'python') {
    // Static method vs class method matching
    if ((normalizedQuestion.includes('static') && normalizedQuestion.includes('method')) ||
        (normalizedQuestion.includes('class') && normalizedQuestion.includes('method')) ||
        normalizedQuestion.includes('@staticmethod') || 
        normalizedQuestion.includes('@classmethod') ||
        normalizedQuestion.includes('difference between static method and class method')) {
      return {
        answer: questions["static method vs class method"],
        refinedQuery: "What is the difference between static method and class method in Python?"
      };
    }
    
    // Slicing matching
    if (normalizedQuestion.includes('slice') || normalizedQuestion.includes('slicing') ||
        normalizedQuestion.match(/\[.*:.*\]/) || normalizedQuestion.includes('list slicing') ||
        normalizedQuestion.includes('how do you slice')) {
      return {
        answer: questions["python slicing"],
        refinedQuery: "What is slicing in Python, and how do you slice a list?"
      };
    }
    
    // Function matching - be more specific
    if ((normalizedQuestion.includes('function') && 
         (normalizedQuestion.includes('what is') || normalizedQuestion.includes('create') || 
          normalizedQuestion.includes('write') || normalizedQuestion.includes('define'))) ||
        normalizedQuestion.includes('def ') || 
        normalizedQuestion.includes('square of a number') ||
        normalizedQuestion.includes('return')) {
      return {
        answer: questions["what is a function"],
        refinedQuery: "What is a function in Python? Write a function that returns the square of a number."
      };
    }
  } 
  
  else if (domain === 'ecommerce') {
    // Scalable architecture matching
    if ((normalizedQuestion.includes('scalable') && normalizedQuestion.includes('architecture')) ||
        (normalizedQuestion.includes('high-traffic') && normalizedQuestion.includes('ecommerce')) ||
        normalizedQuestion.includes('design') && normalizedQuestion.includes('architecture') ||
        normalizedQuestion.includes('load balancing') || 
        normalizedQuestion.includes('microservices')) {
      return {
        answer: questions["scalable architecture"],
        refinedQuery: "How would you design a scalable architecture for a high-traffic e-commerce site?"
      };
    }
    
    // Payment fraud matching  
    if ((normalizedQuestion.includes('payment') && normalizedQuestion.includes('fraud')) ||
        normalizedQuestion.includes('prevent fraud') ||
        normalizedQuestion.includes('payment security') ||
        normalizedQuestion.includes('fraud prevention') ||
        normalizedQuestion.includes('secure payment')) {
      return {
        answer: questions["payment fraud prevention"],
        refinedQuery: "What are some strategies to prevent online payment fraud?"
      };
    }
    
    // Personalization matching
    if (normalizedQuestion.includes('personalization') ||
        (normalizedQuestion.includes('customer') && normalizedQuestion.includes('experience')) ||
        normalizedQuestion.includes('personalized') ||
        normalizedQuestion.includes('recommendation') ||
        normalizedQuestion.includes('improve customer experience')) {
      return {
        answer: questions["personalization customer experience"],
        refinedQuery: "How does personalization improve customer experience in e-commerce?"
      };
    }
  }
  
  // If no match found, return out of expertise
  return {
    answer: {
      isOutOfExpertise: true,
      message: `This question requires deeper expertise that's outside my current ${domain} knowledge base. I specialize in ${domain === 'python' ? 'core Python programming concepts like functions, data structures, static/class methods, and list operations' : 'foundational e-commerce topics like scalable architecture, payment security, and customer personalization strategies'}.`
    },
    refinedQuery: null
  };
};