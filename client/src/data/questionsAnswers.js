// Static questions and answers for Expert App

export const pythonQuestions = {
  "what is the difference between static method and class method": {
    problemOverview: "Static methods and class methods are both bound to the class rather than the instance, but they serve different purposes and have different access patterns.",
    coreConceptExplanation: "Static methods (@staticmethod) don't receive any reference to the class or instance, while class methods (@classmethod) receive the class as the first parameter (cls). This makes class methods useful for alternative constructors and class-level operations.",
    stepByStepSolution: "Use @staticmethod for utility functions that belong logically to the class but don't need class/instance data. Use @classmethod for alternative constructors or when you need access to the class itself.",
    gotchasOrPitfalls: "Static methods can't access class or instance variables. Class methods can't access instance variables but can access class variables and create new instances.",
    summaryOrRecommendation: "Choose @classmethod when you need class-level access, @staticmethod for pure utility functions that belong conceptually to the class."
  },
  "what is slicing in python and how do you slice a list": {
    problemOverview: "List slicing is a powerful feature that allows you to extract portions of a list using bracket notation with start, stop, and step parameters.",
    coreConceptExplanation: "Slicing uses the syntax [start:stop:step] where start is inclusive, stop is exclusive, and step determines the increment. Negative indices count from the end.",
    stepByStepSolution: "Basic syntax: my_list[start:stop]. Advanced: my_list[start:stop:step]. Examples: my_list[1:4] gets elements 1-3, my_list[::2] gets every 2nd element, my_list[::-1] reverses the list.",
    gotchasOrPitfalls: "Remember stop is exclusive. Negative indices can be confusing - practice with examples. Slicing creates a new list object, not a view.",
    summaryOrRecommendation: "Master slicing for efficient list manipulation. It's more Pythonic than loops for many operations and very readable once you understand the syntax."
  },
  "what is a function in python write a function that returns the square of a number": {
    problemOverview: "Functions are reusable blocks of code that perform specific tasks. They can accept parameters and return values, promoting code reusability and organization.",
    coreConceptExplanation: "Functions are defined with 'def' keyword, followed by function name, parameters in parentheses, and a colon. The function body is indented and can include a return statement.",
    stepByStepSolution: "def square_number(num):\n    return num * num\n\n# Usage: result = square_number(5)  # Returns 25",
    gotchasOrPitfalls: "Functions without return statements return None. Parameter names should be descriptive. Be careful with mutable default arguments.",
    summaryOrRecommendation: "Functions are fundamental to clean, maintainable code. Always use descriptive names and consider adding docstrings for complex functions."
  },
  "how do you handle exceptions in python": {
    problemOverview: "Exception handling in Python allows programs to gracefully manage errors and unexpected situations without crashing.",
    coreConceptExplanation: "Python uses try-except blocks to catch and handle exceptions. You can catch specific exceptions, handle multiple exception types, and ensure cleanup with finally blocks.",
    stepByStepSolution: "try:\n    # risky code here\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print('Cannot divide by zero!')\nexcept Exception as e:\n    print(f'Unexpected error: {e}')\nfinally:\n    print('Cleanup code here')",
    gotchasOrPitfalls: "Avoid catching Exception without good reason - it can hide bugs. Always handle specific exceptions when possible. Don't ignore exceptions silently.",
    summaryOrRecommendation: "Use specific exception types, provide meaningful error messages, and always consider what should happen when things go wrong."
  },
  "what are list comprehensions in python": {
    problemOverview: "List comprehensions provide a concise way to create lists based on existing iterables, combining filtering and transformation in a single expression.",
    coreConceptExplanation: "List comprehensions use the syntax [expression for item in iterable if condition]. They're more readable and often faster than equivalent for loops.",
    stepByStepSolution: "squares = [x**2 for x in range(10)]\nevens = [x for x in range(20) if x % 2 == 0]\nprocessed = [process(item) for item in data if item.is_valid()]",
    gotchasOrPitfalls: "Don't make them too complex - readability matters. Large list comprehensions can use more memory. Consider generator expressions for memory efficiency.",
    summaryOrRecommendation: "Use list comprehensions for simple transformations and filtering. They're Pythonic and efficient, but keep them readable."
  }
};

export const ecommerceQuestions = {
  "how would you design a scalable architecture for a high traffic ecommerce site": {
    businessContext: "High-traffic e-commerce sites require robust architecture to handle millions of users, concurrent transactions, and maintain performance during peak periods like Black Friday.",
    modernTechTrendsOverview: "Modern e-commerce architecture uses microservices, containerization, CDNs, database sharding, caching strategies, and cloud-native solutions for scalability.",
    solutionApproach: "Implement a microservices architecture with separate services for user management, inventory, payments, and order processing. Use load balancers, Redis for caching, and database read replicas.",
    realWorldToolsOrExamples: "AWS/GCP for cloud infrastructure, Docker/Kubernetes for containerization, Redis for caching, PostgreSQL with read replicas, CDN like CloudFlare, and monitoring with New Relic.",
    implementationTipsOrPitfalls: "Start with a monolith and gradually break into microservices. Monitor database performance closely. Implement proper error handling and circuit breakers between services."
  },
  "what are some strategies to prevent online payment fraud": {
    businessContext: "Payment fraud costs e-commerce businesses billions annually and damages customer trust. Prevention requires multi-layered security approaches and real-time monitoring.",
    modernTechTrendsOverview: "Modern fraud prevention uses machine learning, behavioral analysis, device fingerprinting, and real-time risk scoring to identify suspicious transactions.",
    solutionApproach: "Implement multi-factor authentication, CVV verification, address verification system (AVS), velocity checks, and machine learning-based fraud detection algorithms.",
    realWorldToolsOrExamples: "Stripe Radar, PayPal's fraud protection, AWS Fraud Detector, Kount, and custom ML models for transaction scoring and pattern recognition.",
    implementationTipsOrPitfalls: "Balance security with user experience. False positives hurt sales. Regularly update fraud rules based on new patterns. Maintain PCI DSS compliance throughout."
  },
  "how does personalization improve customer experience in ecommerce": {
    businessContext: "Personalization increases conversion rates, customer lifetime value, and satisfaction by delivering relevant content, products, and experiences tailored to individual preferences.",
    modernTechTrendsOverview: "AI-driven personalization engines analyze user behavior, purchase history, and preferences to deliver real-time recommendations and customized shopping experiences.",
    solutionApproach: "Implement recommendation engines, dynamic content personalization, personalized email campaigns, and customized product catalogs based on user segments and behavior patterns.",
    realWorldToolsOrExamples: "Amazon's recommendation engine, Shopify's personalization apps, Adobe Target, Google Optimize for A/B testing, and customer data platforms like Segment.",
    implementationTipsOrPitfalls: "Start with basic segmentation before advanced AI. Respect privacy regulations. Test personalization impact with A/B testing. Avoid over-personalization that feels intrusive."
  },
  "what is conversion rate optimization for ecommerce": {
    businessContext: "Conversion rate optimization (CRO) focuses on increasing the percentage of website visitors who complete desired actions, directly impacting revenue without increasing traffic costs.",
    modernTechTrendsOverview: "Modern CRO uses A/B testing platforms, heat mapping tools, user session recordings, and AI-powered optimization to identify and fix conversion bottlenecks.",
    solutionApproach: "Analyze user behavior data, test different page layouts, optimize checkout processes, improve product descriptions, and personalize user experiences based on behavior patterns.",
    realWorldToolsOrExamples: "Google Optimize, Optimizely, Hotjar for heat maps, Crazy Egg, and platforms like Unbounce for landing page optimization and multivariate testing.",
    implementationTipsOrPitfalls: "Test one element at a time for clear results. Ensure statistical significance before implementing changes. Consider mobile experience in all optimization efforts."
  },
  "how do you implement effective inventory management for ecommerce": {
    businessContext: "Effective inventory management prevents stockouts, reduces carrying costs, and ensures optimal cash flow while maintaining customer satisfaction through product availability.",
    modernTechTrendsOverview: "Modern systems use AI for demand forecasting, automated reordering, real-time inventory tracking, and integration with multiple sales channels for unified stock management.",
    solutionApproach: "Implement automated inventory tracking, set up low-stock alerts, use demand forecasting algorithms, and integrate inventory systems with sales channels for real-time updates.",
    realWorldToolsOrExamples: "TradeGecko, Fishbowl Inventory, NetSuite, and custom solutions using APIs for multi-channel inventory synchronization and demand prediction algorithms.",
    implementationTipsOrPitfalls: "Account for lead times in reordering. Plan for seasonal demand variations. Implement safety stock levels. Regularly audit physical vs system inventory counts."
  }
};

export const fallbackResponse = {
  message: "Sorry, that's out of my expertise. Let me connect to my human expert and get back to you.",
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