// Expert Knowledge Base for Python and E-commerce domains

export const pythonExpertKnowledge = {
  "recursive function performance": {
    question: "How can I improve the performance of a recursive function in Python?",
    answer: {
      problemOverview: "Recursive functions can suffer from exponential time complexity and stack overflow errors due to repeated calculations and deep call stacks, especially in algorithms like naive Fibonacci or tree traversals.",
      
      coreConceptExplanation: "Python's recursion has a default limit of ~1000 calls. Recursive functions create new stack frames for each call, consuming memory. The main performance issues are: redundant calculations (like computing fib(5) multiple times), stack overflow for deep recursion, and lack of tail call optimization in Python.",
      
      stepByStepSolution: `**1. Memoization with functools.lru_cache:**
\`\`\`python
from functools import lru_cache

@lru_cache(maxsize=None)
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
\`\`\`

**2. Convert to iterative approach:**
\`\`\`python
def fibonacci_iterative(n):
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b
\`\`\`

**3. Use sys.setrecursionlimit() for deeper recursion:**
\`\`\`python
import sys
sys.setrecursionlimit(5000)  # Increase from default 1000
\`\`\``,

      gotchasAndPitfalls: "• lru_cache only works with hashable arguments • Increasing recursion limit doesn't solve algorithmic inefficiency • Memoization uses memory to store results • Some recursive problems are naturally better solved iteratively • Be careful with mutable default arguments in recursive functions",
      
      summaryRecommendation: "For performance-critical recursive functions: use memoization for overlapping subproblems, consider iterative alternatives for simple recursions, and profile your code to identify actual bottlenecks. Recursion is elegant but not always the most efficient solution."
    }
  },

  "deepcopy vs copy": {
    question: "What's the difference between deepcopy() and copy() in Python?",
    answer: {
      problemOverview: "When working with nested objects (lists containing lists, objects with object attributes), understanding shallow vs deep copying is crucial to avoid unintended side effects and reference sharing.",
      
      coreConceptExplanation: "copy() creates a shallow copy - copying the object but not the nested objects within it. deepcopy() creates a completely independent copy, recursively copying all nested objects. This affects how changes to nested elements propagate.",
      
      stepByStepSolution: `**Shallow Copy Example:**
\`\`\`python
import copy

original = [[1, 2, 3], [4, 5, 6]]
shallow = copy.copy(original)  # or original.copy()

shallow[0].append(4)  # Modifies original too!
print(original)  # [[1, 2, 3, 4], [4, 5, 6]]
\`\`\`

**Deep Copy Example:**
\`\`\`python
import copy

original = [[1, 2, 3], [4, 5, 6]]
deep = copy.deepcopy(original)

deep[0].append(4)  # Only modifies the copy
print(original)  # [[1, 2, 3], [4, 5, 6]]
\`\`\`

**Performance Comparison:**
\`\`\`python
import copy
import time

data = [[i] * 1000 for i in range(1000)]

# Shallow copy - fast
start = time.time()
shallow = copy.copy(data)
print(f"Shallow: {time.time() - start:.4f}s")

# Deep copy - slower
start = time.time()
deep = copy.deepcopy(data)
print(f"Deep: {time.time() - start:.4f}s")
\`\`\``,

      gotchasAndPitfalls: "• copy.copy() vs obj.copy() may behave differently for custom objects • deepcopy() is significantly slower and uses more memory • Some objects (like file handles, database connections) cannot be deep copied • Be aware of circular references in nested structures • Assignment (=) creates a reference, not a copy",
      
      summaryRecommendation: "Use shallow copy for simple objects or when you want to share nested references. Use deep copy when you need complete independence between objects. For performance-critical code, consider whether copying is necessary at all."
    }
  },

  "memory leaks python": {
    question: "How do I handle memory leaks in long-running Python scripts?",
    answer: {
      problemOverview: "Memory leaks in Python occur when objects remain referenced and cannot be garbage collected, causing memory usage to grow over time. Common in long-running applications, web servers, and data processing scripts.",
      
      coreConceptExplanation: "Python uses reference counting and cyclic garbage collection. Memory leaks happen due to: circular references, global variables accumulating data, unclosed resources (files, connections), large objects in function scopes, and C extensions with memory issues.",
      
      stepByStepSolution: `**1. Monitor Memory Usage:**
\`\`\`python
import psutil
import os

def get_memory_usage():
    process = psutil.Process(os.getpid())
    return process.memory_info().rss / 1024 / 1024  # MB

print(f"Memory: {get_memory_usage():.2f} MB")
\`\`\`

**2. Use Context Managers:**
\`\`\`python
# Bad
file = open('large_file.txt')
data = file.read()
# file never closed, keeping data in memory

# Good
with open('large_file.txt') as file:
    data = file.read()
# Automatically closed, resources freed
\`\`\`

**3. Clear Large Objects:**
\`\`\`python
import gc

large_data = process_huge_dataset()
# Use the data
result = analyze(large_data)

# Explicitly delete and collect garbage
del large_data
gc.collect()
\`\`\`

**4. Use Memory Profiling:**
\`\`\`python
from memory_profiler import profile

@profile
def memory_intensive_function():
    data = [i**2 for i in range(1000000)]
    return sum(data)
\`\`\``,

      gotchasAndPitfalls: "• Global variables that keep growing • Circular references between objects • Not closing database connections or file handles • Keeping references in exception tracebacks • Large objects in function locals that don't get cleaned up • Memory fragmentation in long-running processes",
      
      summaryRecommendation: "Use memory profiling tools, implement proper resource management with context managers, periodically clear unnecessary data, and monitor memory usage in production. Consider using weak references for observer patterns to break circular references."
    }
  },

  "python gil multithreading": {
    question: "Can you explain Python's GIL and how it affects multithreading?",
    answer: {
      problemOverview: "Python's Global Interpreter Lock (GIL) prevents true parallelism in CPU-bound multithreaded programs, making threads execute one at a time rather than simultaneously, which can be confusing for developers expecting parallel execution.",
      
      coreConceptExplanation: "The GIL is a mutex that protects access to Python objects, preventing multiple threads from executing Python bytecode simultaneously. It exists because Python's memory management isn't thread-safe. Only one thread can hold the GIL at a time, making multithreading in Python cooperative rather than parallel.",
      
      stepByStepSolution: `**1. GIL Impact on Different Workloads:**
\`\`\`python
import threading
import time

# CPU-bound task - GIL hurts performance
def cpu_bound_task():
    count = 0
    for i in range(10000000):
        count += i
    return count

# I/O-bound task - GIL doesn't matter much
def io_bound_task():
    time.sleep(1)  # Simulates I/O wait
    return "completed"
\`\`\`

**2. Use multiprocessing for CPU-bound tasks:**
\`\`\`python
from multiprocessing import Pool
import concurrent.futures

# Instead of threading for CPU work
def parallel_cpu_work(data_chunks):
    with Pool() as pool:
        results = pool.map(cpu_intensive_function, data_chunks)
    return results

# Or use ProcessPoolExecutor
with concurrent.futures.ProcessPoolExecutor() as executor:
    futures = [executor.submit(cpu_task, chunk) for chunk in data]
    results = [f.result() for f in futures]
\`\`\`

**3. Threading still useful for I/O:**
\`\`\`python
import concurrent.futures
import requests

def fetch_url(url):
    response = requests.get(url)
    return response.status_code

urls = ['http://example.com'] * 10

# Threading works well for I/O-bound tasks
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
    results = list(executor.map(fetch_url, urls))
\`\`\``,

      gotchasAndPitfalls: "• Assuming threading will speed up CPU-bound tasks • Not releasing the GIL in C extensions • Using threading for the wrong type of task • Forgetting that I/O operations can release the GIL • Race conditions still exist despite the GIL • Thread creation overhead can outweigh benefits for small tasks",
      
      summaryRecommendation: "Use threading for I/O-bound tasks, multiprocessing for CPU-bound tasks, and async/await for high-concurrency I/O. The GIL isn't going away soon, so design your architecture around it rather than fighting it."
    }
  },

  "python clean architecture": {
    question: "How do I structure a large-scale Python application using clean architecture?",
    answer: {
      problemOverview: "Large Python applications often become monolithic and hard to maintain without proper architectural patterns. Clean Architecture provides a framework for organizing code into layers with clear dependencies and separation of concerns.",
      
      coreConceptExplanation: "Clean Architecture organizes code into concentric circles: Entities (business logic), Use Cases (application logic), Interface Adapters (controllers, presenters), and Frameworks (external tools). Dependencies point inward, making the core business logic independent of external concerns.",
      
      stepByStepSolution: `**1. Project Structure:**
\`\`\`
my_app/
├── domain/
│   ├── entities/
│   │   └── user.py
│   └── repositories/
│       └── user_repository.py
├── use_cases/
│   └── user_service.py
├── infrastructure/
│   ├── database/
│   │   └── user_repository_impl.py
│   └── web/
│       └── fastapi_app.py
└── interfaces/
    └── controllers/
        └── user_controller.py
\`\`\`

**2. Domain Layer - Entities:**
\`\`\`python
# domain/entities/user.py
from dataclasses import dataclass
from typing import Optional

@dataclass
class User:
    id: Optional[int]
    email: str
    name: str
    
    def is_valid_email(self) -> bool:
        return "@" in self.email and "." in self.email
\`\`\`

**3. Use Cases Layer:**
\`\`\`python
# use_cases/user_service.py
from domain.entities.user import User
from domain.repositories.user_repository import UserRepository

class UserService:
    def __init__(self, user_repo: UserRepository):
        self._user_repo = user_repo
    
    def create_user(self, email: str, name: str) -> User:
        user = User(id=None, email=email, name=name)
        if not user.is_valid_email():
            raise ValueError("Invalid email format")
        return self._user_repo.save(user)
\`\`\`

**4. Infrastructure Layer:**
\`\`\`python
# infrastructure/database/user_repository_impl.py
from domain.entities.user import User
from domain.repositories.user_repository import UserRepository
import sqlite3

class SQLiteUserRepository(UserRepository):
    def save(self, user: User) -> User:
        # Database implementation
        conn = sqlite3.connect('app.db')
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO users (email, name) VALUES (?, ?)",
            (user.email, user.name)
        )
        user.id = cursor.lastrowid
        conn.commit()
        conn.close()
        return user
\`\`\``,

      gotchasAndPitfalls: "• Over-engineering small applications • Creating too many abstraction layers • Circular dependencies between layers • Not using dependency injection properly • Making entities anemic (no business logic) • Tight coupling between use cases and infrastructure • Ignoring SOLID principles",
      
      summaryRecommendation: "Start with a simple layered architecture and evolve to Clean Architecture as complexity grows. Use dependency injection, keep business logic in the domain layer, and make external dependencies easily replaceable through interfaces."
    }
  }
};

export const ecommerceExpertKnowledge = {
  "headless ecommerce migration": {
    question: "How can I migrate my legacy e-commerce system to a headless architecture?",
    answer: {
      businessContext: "Legacy e-commerce platforms often have tightly coupled frontend and backend systems, making it difficult to provide consistent experiences across multiple channels (web, mobile, IoT). Headless architecture separates the frontend presentation layer from the backend commerce functionality.",
      
      modernTechTrendsOverview: "Headless commerce uses APIs to deliver content and commerce functionality to any frontend. Modern trends include JAMstack architectures, microservices, API-first design, and omnichannel experiences. Popular headless platforms include Shopify Plus, commercetools, and Elastic Path.",
      
      solutionApproach: `**Phase 1: Assessment and Planning**
- Audit current system dependencies and integrations
- Identify which components can be decoupled first
- Plan API strategy and data migration approach
- Choose headless platform (SaaS vs custom-built)

**Phase 2: Backend Migration**
- Set up headless commerce platform
- Migrate product catalog and customer data
- Implement API layer for order management
- Set up payment and shipping integrations

**Phase 3: Frontend Development**
- Build new frontend using modern frameworks (React, Vue, Next.js)
- Implement responsive design for multi-device support
- Connect frontend to headless APIs
- Implement search, cart, and checkout functionality`,
      
      realWorldToolsExamples: `**Headless Platforms:**
- **Shopify Plus**: Storefront API, extensive app ecosystem
- **commercetools**: Microservices-based, highly scalable
- **Saleor**: Open-source, GraphQL-based
- **BigCommerce**: Stencil framework, API-first approach

**Frontend Technologies:**
- **Next.js**: React-based, excellent for e-commerce SEO
- **Gatsby**: Static site generation, fast performance
- **Nuxt.js**: Vue.js framework with SSR capabilities
- **Angular**: Enterprise-grade for complex applications

**Integration Tools:**
- **Zapier/n8n**: Workflow automation
- **Segment**: Customer data platform
- **Algolia**: Search and discovery
- **Stripe/PayPal**: Payment processing`,
      
      implementationTipsAndPitfalls: "**Avoid:** Big bang migrations, neglecting SEO during transition, underestimating integration complexity, ignoring performance monitoring. **Prioritize:** Gradual migration approach, API versioning strategy, comprehensive testing, staff training on new architecture, maintaining data consistency during migration."
    }
  },

  "personalized recommendations": {
    question: "What are the best practices for implementing personalized recommendations in e-commerce?",
    answer: {
      businessContext: "Personalized recommendations can increase conversion rates by 10-30% and average order value by 5-25%. They help customers discover relevant products, reduce decision fatigue, and improve overall shopping experience while increasing revenue per visitor.",
      
      modernTechTrendsOverview: "Modern recommendation systems use machine learning algorithms including collaborative filtering, content-based filtering, and hybrid approaches. Real-time personalization, AI-driven product matching, and behavioral tracking are becoming standard. Integration with customer data platforms enables omnichannel personalization.",
      
      solutionApproach: `**1. Data Collection Strategy:**
- Track user behavior: page views, clicks, time spent, purchases
- Collect explicit feedback: ratings, reviews, wishlists
- Gather demographic and contextual data
- Implement proper consent and privacy compliance

**2. Recommendation Algorithm Selection:**
- **Collaborative Filtering**: "Users who bought X also bought Y"
- **Content-Based**: Product similarity based on attributes
- **Hybrid Models**: Combine multiple approaches
- **Deep Learning**: Neural networks for complex patterns

**3. Implementation Phases:**
- Start with simple rule-based recommendations
- Implement basic collaborative filtering
- Add content-based recommendations
- Evolve to machine learning models
- Include real-time personalization`,
      
      realWorldToolsExamples: `**SaaS Recommendation Engines:**
- **Amazon Personalize**: Fully managed ML service
- **Google Recommendations AI**: Retail-specific ML models
- **Dynamic Yield**: Real-time personalization platform
- **Yotpo**: Product reviews and recommendations

**Open Source Solutions:**
- **Apache Mahout**: Scalable machine learning library
- **Surprise**: Python library for recommender systems
- **LightFM**: Hybrid recommendation algorithms
- **TensorFlow Recommenders**: Google's ML framework

**Analytics and Testing:**
- **Google Analytics 4**: Enhanced e-commerce tracking
- **Optimizely**: A/B testing for recommendations
- **Segment**: Customer data platform
- **Mixpanel**: Product analytics and user behavior`,
      
      implementationTipsAndPitfalls: "**Avoid:** Cold start problems without fallback strategies, over-recommending popular items, ignoring seasonal trends, privacy violations, poor mobile experience. **Prioritize:** A/B testing different algorithms, balancing relevance with diversity, real-time updates, clear privacy policies, measuring business impact not just accuracy metrics."
    }
  },

  "ai driven search filtering": {
    question: "How do I integrate AI-driven search and filtering into my e-commerce site?",
    answer: {
      businessContext: "Poor search experience causes 43% of visitors to leave e-commerce sites immediately. AI-driven search improves product discovery, handles natural language queries, provides intelligent filtering, and increases conversion rates by helping customers find exactly what they need.",
      
      modernTechTrendsOverview: "Modern e-commerce search uses natural language processing (NLP), vector search, semantic understanding, and visual search capabilities. AI can handle typos, synonyms, intent recognition, and provide personalized search results. Integration with product catalogs enables dynamic filtering and faceted search.",
      
      solutionApproach: `**1. Search Infrastructure Setup:**
- Choose between hosted solutions (Algolia, Elasticsearch Service) or self-hosted
- Index product catalog with rich metadata
- Implement real-time inventory updates
- Set up analytics and search tracking

**2. AI Enhancement Implementation:**
- Natural language query processing
- Semantic search capabilities
- Auto-complete and query suggestions
- Visual search integration
- Personalized ranking based on user behavior

**3. Advanced Filtering System:**
- Dynamic faceted search
- Smart filters based on user intent
- Price range optimization
- Brand and category intelligence
- Availability and shipping filters`,
      
      realWorldToolsExamples: `**Search-as-a-Service Platforms:**
- **Algolia**: AI-powered search with NLP capabilities
- **Elasticsearch**: Open-source with machine learning features
- **Amazon CloudSearch**: Managed search service
- **Swiftype**: Enterprise search solution

**AI/ML Enhancement Tools:**
- **Google Cloud Vision API**: Image-based product search
- **AWS Comprehend**: Natural language processing
- **OpenAI Embeddings**: Semantic search capabilities
- **Hugging Face**: Pre-trained NLP models

**Implementation Frameworks:**
- **SearchKit**: React components for search UIs
- **InstantSearch.js**: Frontend search widgets
- **Vue InstantSearch**: Vue.js search components
- **Angular InstantSearch**: Angular search library`,
      
      implementationTipsAndPitfalls: "**Avoid:** Over-complex search interfaces, slow search response times, poor mobile search experience, ignoring search analytics, inadequate fallback for no results. **Prioritize:** Search performance optimization, mobile-first design, clear filter options, search result relevance tuning, comprehensive product data quality, user behavior analysis."
    }
  },

  "microservices migration": {
    question: "Can you guide me on modernizing my monolithic e-commerce backend to microservices?",
    answer: {
      businessContext: "Monolithic e-commerce systems become difficult to scale, deploy, and maintain as they grow. Microservices architecture enables independent scaling, faster deployment cycles, technology diversity, and better fault isolation, crucial for high-traffic e-commerce operations.",
      
      modernTechTrendsOverview: "Microservices use containerization (Docker/Kubernetes), API gateways, service mesh for communication, event-driven architectures, and cloud-native patterns. Modern e-commerce typically splits into services like catalog, cart, checkout, user management, inventory, and order fulfillment.",
      
      solutionApproach: `**1. Service Decomposition Strategy:**
- Identify business capabilities and bounded contexts
- Start with least risky services (catalog, reviews)
- Extract services that scale differently
- Maintain data consistency patterns

**2. Microservices Architecture:**
- **Catalog Service**: Product information and search
- **User Service**: Authentication and profile management  
- **Cart Service**: Shopping cart functionality
- **Order Service**: Order processing and fulfillment
- **Payment Service**: Payment processing and wallet
- **Inventory Service**: Stock management
- **Notification Service**: Email/SMS communications

**3. Implementation Approach:**
- Strangler Fig Pattern: Gradually replace monolith
- Database per service principle
- Event-driven communication between services
- Implement distributed tracing and monitoring`,
      
      realWorldToolsExamples: `**Container Orchestration:**
- **Kubernetes**: Container orchestration platform
- **Docker Swarm**: Docker's native clustering
- **Amazon ECS**: Managed container service
- **Google GKE**: Managed Kubernetes service

**API Management:**
- **Kong**: Open-source API gateway
- **AWS API Gateway**: Managed API service
- **Zuul**: Netflix's API gateway
- **Istio**: Service mesh with traffic management

**Messaging and Events:**
- **Apache Kafka**: Distributed streaming platform
- **RabbitMQ**: Message broker
- **Amazon SQS/SNS**: Managed messaging
- **Redis Pub/Sub**: Lightweight messaging

**Monitoring and Observability:**
- **Jaeger**: Distributed tracing
- **Prometheus + Grafana**: Metrics and monitoring
- **ELK Stack**: Logging and analytics
- **DataDog**: Comprehensive monitoring platform`,
      
      implementationTipsAndPitfalls: "**Avoid:** Big bang migration, shared databases between services, synchronous communication overuse, neglecting monitoring, ignoring data consistency challenges. **Prioritize:** Gradual migration strategy, service independence, eventual consistency patterns, comprehensive testing, team autonomy, clear service boundaries, robust monitoring from day one."
    }
  },

  "ecommerce site speed ux": {
    question: "What tools or platforms should I use to improve my e-commerce site speed and UX?",
    answer: {
      businessContext: "Page load speed directly impacts conversion rates - a 1-second delay can reduce conversions by 7%. E-commerce sites need to balance rich product displays, personalization, and functionality while maintaining fast performance across all devices and network conditions.",
      
      modernTechTrendsOverview: "Modern e-commerce performance focuses on Core Web Vitals, progressive web apps (PWA), edge computing, image optimization, and lazy loading. Technologies like CDNs, service workers, and modern JavaScript frameworks enable faster, more responsive user experiences.",
      
      solutionApproach: `**1. Performance Audit and Baseline:**
- Use Google PageSpeed Insights and Lighthouse
- Measure Core Web Vitals (LCP, FID, CLS)
- Analyze user journey and conversion funnels
- Identify performance bottlenecks

**2. Frontend Optimization:**
- Implement image optimization and lazy loading
- Use modern image formats (WebP, AVIF)
- Minimize and compress JavaScript/CSS
- Implement critical CSS inlining
- Use Progressive Web App features

**3. Backend and Infrastructure:**
- Implement CDN for global content delivery
- Optimize database queries and caching
- Use Redis/Memcached for session storage
- Implement proper HTTP caching headers
- Consider edge computing for dynamic content`,
      
      realWorldToolsExamples: `**Performance Monitoring:**
- **Google Lighthouse**: Comprehensive performance audit
- **GTmetrix**: Performance testing and monitoring
- **Pingdom**: Website speed monitoring
- **New Relic**: Application performance monitoring

**CDN and Optimization:**
- **Cloudflare**: CDN with performance optimization
- **Amazon CloudFront**: AWS content delivery network
- **Fastly**: Edge cloud platform
- **KeyCDN**: Performance-focused CDN

**Image Optimization:**
- **Cloudinary**: Comprehensive image management
- **ImageKit**: Real-time image optimization
- **TinyPNG**: Image compression service
- **Optimole**: WordPress image optimization

**Caching Solutions:**
- **Redis**: In-memory data structure store
- **Varnish**: HTTP accelerator and caching
- **Memcached**: Distributed memory caching
- **AWS ElastiCache**: Managed caching service`,
      
      implementationTipsAndPitfalls: "**Avoid:** Over-optimization that hurts functionality, ignoring mobile performance, complex third-party integrations, large unoptimized images, render-blocking resources. **Prioritize:** Core Web Vitals optimization, mobile-first performance, progressive enhancement, performance budgets, regular performance monitoring, user experience testing."
    }
  }
};

// Helper function to find relevant knowledge based on query
export function findRelevantKnowledge(query, domain) {
  const knowledge = domain === 'python' ? pythonExpertKnowledge : ecommerceExpertKnowledge;
  const lowerQuery = query.toLowerCase();
  
  // Define comprehensive keywords for each knowledge area
  const keywordMapping = {
    python: {
      "recursive function performance": ["recursive", "recursion", "performance", "improve", "optimize", "function", "slow", "speed"],
      "deepcopy vs copy": ["deepcopy", "copy", "shallow", "deep", "difference", "clone", "duplicate"],
      "memory leaks python": ["memory", "leak", "leaks", "long-running", "memory usage", "garbage", "collection"],
      "python gil multithreading": ["gil", "global interpreter lock", "multithreading", "threading", "parallel", "concurrency"],
      "python clean architecture": ["architecture", "structure", "large-scale", "clean", "organize", "project structure", "design pattern"]
    },
    ecommerce: {
      "headless ecommerce migration": ["headless", "migrate", "migration", "legacy", "decouple", "api-first"],
      "personalized recommendations": ["recommendation", "personalization", "personalized", "suggest", "machine learning", "ai"],
      "ai driven search filtering": ["search", "filter", "ai", "intelligent", "nlp", "semantic", "visual search"],
      "microservices migration": ["microservices", "monolith", "monolithic", "service", "architecture", "decompose"],
      "ecommerce site speed ux": ["speed", "performance", "ux", "user experience", "optimization", "fast", "slow", "loading"]
    }
  };
  
  const domainKeywords = keywordMapping[domain] || {};
  
  // Check for keyword matches
  for (const [key, data] of Object.entries(knowledge)) {
    const keywords = domainKeywords[key] || [];
    if (keywords.some(keyword => lowerQuery.includes(keyword))) {
      return data;
    }
  }
  
  // Return null if no specific match found
  return null;
}