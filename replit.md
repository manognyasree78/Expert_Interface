# Expert App - Comprehensive Learning Platform

## Overview

Expert App is a completely rebuilt React-based learning platform that provides comprehensive expert consultations through structured Q&A systems. The application features user authentication, learnability profiles, persistent chat history, file attachments, and a static question/answer system for Python and E-commerce domains.

## Recent Changes

### August 8, 2025 - Complete Application Rebuild
- **Major Architecture Change**: Complete rebuild following new comprehensive specifications
- **New Features Added**:
  - User authentication (login/signup) with session management
  - Learnability profile system with 5-step questionnaire
  - Persistent chat history per user and domain (localStorage)
  - File attachment functionality (documents and images)
  - Bell inbox for conversation history viewing
  - Static Q&A system with structured expert responses
- **New Components Structure**:
  - Welcome page (/): Landing page with login/signup
  - Dashboard (/dashboard): Main hub with search and expert cards
  - Expert pages (/expert/python, /expert/ecommerce): Split-panel chat interface
  - Modals: Login, Profile setup, Bell inbox
- **User Flow**: Welcome → Login/Signup → Profile Setup → Dashboard → Expert Chat
- **Data Persistence**: User-specific chat history and answers stored locally
- **Static Content**: 5 predefined questions per expert domain with structured answers

### Latest Updates - UI Improvements & Content Enhancement
- **Updated Static Q&A Content**: Complete rewrite with detailed content using cooking analogies (Python) and cricket analogies (E-commerce)
- **UI Enhancements**:
  - Side-by-side layout for New Chat and Search History cards
  - Renamed "Escalation Log" to "Expert Notifications" for better UX  
  - Updated chat prompt description for better user guidance
  - Removed question repetition from preview panels for cleaner design
  - Improved fallback styling with soft, smooth gradients
  - Added Search History Modal with thread management and delete functionality
- **Enhanced Answer Format**: Comprehensive 5-section responses with rich formatting, code examples, and practical analogies
- **"You meant..." Feature**: Refined query suggestions displayed below answers for better user guidance

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with JSX (no TypeScript per user requirements)
- **Styling**: Tailwind CSS with dark theme (#0d1117 background, orange #F97316 primary, blue #3B82F6 secondary)
- **Routing**: Wouter for client-side routing with new structure:
  - `/` - Welcome/landing page
  - `/dashboard` - Main dashboard after login
  - `/expert/python` - Python expert chat interface
  - `/expert/ecommerce` - E-commerce expert chat interface
- **Data Storage**: localStorage for user sessions and chat history
- **UI Components**: Custom components with dark theme styling

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless)
- **Session Management**: PostgreSQL-based sessions with connect-pg-simple
- **Development**: Hot reload with tsx

## Key Components

### Authentication & User Management
- **Login System**: Email/password authentication with localStorage sessions
- **User Profiles**: Comprehensive learnability profiles with 5 questionnaires:
  1. Explanation style preference
  2. Personal interests
  3. Detail level preference  
  4. Learning style preference
  5. Feedback style preference
- **Session Management**: User sessions stored in localStorage with email and login time

### Static Q&A System
- **Question Database**: Predefined questions and structured answers per domain
- **Answer Format**: 5-section structured responses:
  - Python: Problem Overview → Core Concept → Step-by-Step → Gotchas → Summary
  - E-commerce: Business Context → Tech Trends → Solution → Tools → Implementation
- **Fallback Handling**: "Out of expertise" responses for unmatched questions

### Frontend Components
- **shadcn/ui**: Complete UI component library with customizable themes
- **Form Handling**: React Hook Form with Zod validation resolvers
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Expert Cards**: Interactive cards for different expert categories
- **Search Interface**: Integrated search with n8n webhook integration

### API Layer
- RESTful API structure with `/api` prefix
- Centralized error handling middleware
- Request/response logging for development
- CRUD operations abstracted through storage interface

## Data Flow

### User Interaction Flow
1. User accesses homepage with expert categories
2. Search functionality sends queries to n8n webhook endpoints
3. Expert card selection triggers expert-specific API calls
4. Backend processes requests and returns expert data
5. Frontend updates UI with received data

### Storage Interface
- Abstract storage interface allows for flexible data layer implementation
- Current implementation uses in-memory storage (MemStorage)
- Designed to easily switch to database-backed storage
- CRUD operations for user management

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **drizzle-orm**: TypeScript ORM for database operations
- **@tanstack/react-query**: Server state management
- **react-hook-form**: Form handling and validation
- **zod**: Schema validation

### UI Dependencies
- **@radix-ui/***: Headless UI components
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library
- **class-variance-authority**: Component variant management

### Development Dependencies
- **vite**: Build tool and development server
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Fast bundler for production builds

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds React app to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Database**: Drizzle migrations applied via `db:push` command

### Environment Configuration
- **Development**: Uses NODE_ENV=development with hot reload
- **Production**: NODE_ENV=production with optimized builds
- **Database**: Requires DATABASE_URL environment variable

### File Structure
```
├── client/          # Frontend React application
├── server/          # Backend Express application  
├── shared/          # Shared types and schemas
├── migrations/      # Database migration files
└── dist/           # Built application files
```

### Integration Points
- **n8n Webhooks**: External automation platform integration
- **Database Migrations**: Automated via drizzle-kit
- **Session Storage**: PostgreSQL-backed sessions for scalability
- **Static Assets**: Served through Express in production

The application follows a monorepo structure with clear separation of concerns, enabling independent development of frontend and backend while maintaining shared type definitions and schemas.