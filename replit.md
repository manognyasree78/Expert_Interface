# Expert App - Solution Platform

## Overview

Expert App is a modern full-stack web application built as a solution platform connecting users with various experts across different domains. The application features a responsive React frontend with a Node.js/Express backend, designed to facilitate expert consultations with Python and E-commerce Modernization experts. The app includes intelligent search functionality, interactive expert cards, and n8n webhook integration for workflow automation.

## Recent Changes

### July 28, 2025 - Ottobon Dark Theme Implementation
- Applied Ottobon dark theme colors and components based on user-provided images
- Maintained exact original content and descriptions without any additions
- Used dark blue-gray backgrounds, orange primary accents, and blue secondary accents
- Applied theme to homepage, Python expert page, and E-commerce expert page
- Kept original expert descriptions:
  - Python Expert: "Python development, automation, data analysis, web frameworks, and AI/ML solutions"
  - E-commerce Expert: "Online store setup, digital marketing, payment systems, and sales optimization"
- No functional changes - only visual styling updates

### July 28, 2025 - Complete Removal of n8n Integration
- Completely removed all n8n webhook integration due to URL connection issues
- Eliminated all unhandled promise rejection errors and console warnings
- Simplified expert pages to show static expert information in preview panels
- Optimized navigation speed with immediate page transitions
- Clean chat interface with simple message responses without external dependencies
- Homepage search still detects domain (Python/E-commerce) and navigates to appropriate expert page

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack React Query for server state
- **Build Tool**: Vite for development and production builds
- **UI Components**: Radix UI primitives with custom styling

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless)
- **Session Management**: PostgreSQL-based sessions with connect-pg-simple
- **Development**: Hot reload with tsx

## Key Components

### Database Layer
- **ORM**: Drizzle with PostgreSQL dialect
- **Schema**: Defined in `shared/schema.ts` for code sharing between frontend and backend
- **Migrations**: Managed through drizzle-kit in `./migrations` directory
- **Connection**: Uses DATABASE_URL environment variable for connection string

### Authentication & Sessions
- Session-based authentication using PostgreSQL store
- User schema includes username and password fields
- Shared types between frontend and backend for type safety

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