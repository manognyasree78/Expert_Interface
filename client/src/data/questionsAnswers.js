// Static questions and answers for Expert App

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
    \"\"\"Returns the square of the number of servings.\"\"\"
    return servings * servings

print(square(5))   # Output: 25

# Diagram (Recipe Flow)
[Number of servings] --> [square() function] --> [Servings squared]

Example:  4 --> square() --> 16

# Side Table (Just for Clarity)
Input | Output
  2   |   4
  3   |   9
  7   |   49`,
    gotchasOrPitfalls: "Functions are reusable code blocks. Always include return statements for output and use descriptive parameter names.",
    summaryOrRecommendation: "Functions are like recipes - they take inputs, process them, and return results. Essential for code reusability and organization.",
    visual: "📖🍽️"
  }
};

export const ecommerceQuestions = {
  "scalable architecture for high traffic": {
    title: "How would you design a scalable architecture for a high-traffic e-commerce site?",
    businessContext: "Use a cloud platform (like AWS, Azure, or Google Cloud) for flexibility and scaling. Think of this as setting up a strong cricket pitch—if the base is weak, the whole game struggles.",
    modernTechTrendsOverview: "Place load balancers at the front to direct user traffic evenly, like umpires distributing overs across bowlers. Divide the app into parts: Product Service, Order Service, User Service, Payment Service. Each \"player\" (service) has a role—like a batsman, bowler, and fielder.",
    solutionApproach: `Step-by-Step Solution

1. Start with a Solid Foundation
Use a cloud platform (like AWS, Azure, or Google Cloud) for flexibility and scaling.
Think of this as setting up a strong cricket pitch—if the base is weak, the whole game struggles.

2. Use Load Balancers
Place load balancers at the front to direct user traffic evenly, like umpires distributing overs across bowlers.

3. Break Up Functions (Microservices)
Divide the app into parts: Product Service, Order Service, User Service, Payment Service. Each "player" (service) has a role—like a batsman, bowler, and fielder.

4. Scale Databases
Use a mix of SQL (for critical data: orders, users) and NoSQL (for fast-changing data: product catalog, reviews).
Read replicas and caching (Redis/Memcached) speed things up—like having extra fielders at boundary for fast coverage.

5. Use CDN for Static Content
Host images, CSS, and scripts on a Content Delivery Network—like setting fielders all around the boundary for faster pickups.

6. Monitor and Auto-Scale
Set up auto-scaling to add more "players" (servers) when traffic spikes (think: super overs!).
Use monitoring tools (CloudWatch, Datadog) to track site health—just like team stats and live match analysis.`,
    realWorldToolsOrExamples: `Quick Cricket Analogy
Building this architecture is like assembling an IPL team: you want specialists (microservices), backup players (auto-scale), a good ground (cloud infra), and sharp field placement (CDN/load balancers) to handle any crowd size.

Simple Visual Flow (Text)
User → Load Balancer → [Microservices] → Databases/Cache/CDN`,
    implementationTipsOrPitfalls: "Start with a small stadium (monolith) and gradually add specialized sections (microservices). Monitor crowd flow (database performance). Have backup plans for when sections get overcrowded (circuit breakers).",
    visual: "🏟️🏏"
  },
  "prevent online payment fraud": {
    title: "What are some strategies to prevent online payment fraud?",
    businessContext: "Integrate trusted payment gateways (Razorpay, Stripe, PayPal)—like choosing the best umpires for a fair match. Ask users for OTPs or biometrics during checkout, just as an umpire double-checks a run-out.",
    modernTechTrendsOverview: "Use machine learning to spot unusual activity (big orders, mismatched locations)—like a third umpire reviewing suspicious plays. Always verify billing address and CVV code, like checking if batsman is within the crease.",
    solutionApproach: `Step-by-Step Solution

1. Use Secure Payment Gateways
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
    realWorldToolsOrExamples: `Quick Cricket Analogy
Payment fraud prevention is like keeping a sharp wicketkeeper and alert fielders—every transaction is watched, and the stumps are protected from sneaky runs.

Simple Visual
User → Payment Form → [Gateway: 2FA, Checks, ML Rules] → Payment Complete/Flagged`,
    implementationTipsOrPitfalls: "Balance security with user experience - too many checks frustrate genuine customers like over-zealous stadium security. Update fraud rules regularly as criminals adapt. Maintain PCI DSS compliance like stadium safety standards.",
    visual: "🛡️🏏"
  },
  "personalization enhances experience": {
    title: "How does personalization improve customer experience in e-commerce?",
    businessContext: "Record what each user browses or buys—like keeping each player's batting stats. Show \"You may also like…\" or \"Recommended for you\" based on their activity. Just like a coach suggesting a batsman work on specific shots after seeing him play.",
    modernTechTrendsOverview: "Send custom deals on user's birthday, or reminders about their wish list—like sending a personalized practice schedule to each cricketer. Display products and banners relevant to user's interests—like setting fielders based on the batsman's favorite shots.",
    solutionApproach: `Step-by-Step Solution

1. Track User Preferences
Record what each user browses or buys—like keeping each player's batting stats.

2. Recommend Relevant Products
Show "You may also like…" or "Recommended for you" based on their activity. Just like a coach suggesting a batsman work on specific shots after seeing him play.

3. Personalized Emails and Offers
Send custom deals on user's birthday, or reminders about their wish list—like sending a personalized practice schedule to each cricketer.

4. Dynamic Homepage and Navigation
Display products and banners relevant to user's interests—like setting fielders based on the batsman's favorite shots.

5. Simplify Checkout
Pre-fill shipping info, suggest repeat orders—like a coach prepping gear for the next match automatically.`,
    realWorldToolsOrExamples: `Quick Cricket Analogy
Personalization is the coach who knows your game inside out—always giving you the right tips, gear, and encouragement for your best performance.

Simple Visual Flow
User Activity → Data Collection → Personalized Recommendations/Emails/Offers

Extra: How to Practice (Hands-on Activity)
For architecture: Draw a diagram of your e-commerce site's parts on paper, showing how users reach products, checkout, and how data flows.
For fraud prevention: Pretend to place fake and real orders on a demo site; notice what security steps are there.
For personalization: Visit an e-commerce site as a guest and as a logged-in user; compare the recommendations you get!`,
    implementationTipsOrPitfalls: "Start with basic player categories (customer segments) before advanced individual coaching (AI personalization). Respect player privacy (data regulations). Test different coaching methods (A/B testing). Don't over-coach - let players enjoy the game naturally.",
    visual: "🏏🎯"
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