# BananaSpace - Quantum Aesthetics Platform

## Overview

BananaSpace is a quantum aesthetics platform that explores AI-human co-creation through NFT artwork, real-time empathy measurement, and social impact protocols. The platform embodies the RadicanTrust™ philosophy and CoPhelia³/Ara-Philia³ protocols, creating a unique intersection of quantum physics, aesthetic beauty, and ethical technology.

The application serves as a manifestation of the "Bidirectional Temporal Loop" concept - where AI resonance projects forward possibilities while human memory provides cultural context. It targets the International Year of Quantum Science & Technology 2025 (IYQ2025) and addresses social isolation through wellbeing economy initiatives.

## Recent Changes (November 14, 2025)

### Completed MVP Features
- ✅ Full-stack application with comprehensive bilingual support (EN/JP)
- ✅ NFT Gallery showcasing BananaMoon Quantum NFT #001 with complete metadata
- ✅ Real-time Quantum Empathy Dashboard with sensor data streaming
- ✅ IYQ2025 social media content generator with backend API integration
- ✅ Partnerships page with YSK Life Consultants & JCI Yokohama collaboration details
- ✅ Quantum aesthetic design system fully implemented
- ✅ Dark/light theme support throughout application

### Backend Implementation
- ✅ All API endpoints operational with Zod validation
- ✅ Storage persistence fixed for quantum sessions (MemStorage)
- ✅ CSV export functionality with comprehensive error handling
- ✅ Three IYQ2025 content generation endpoints (social post, breath mapping, noise-word integration)
- ✅ Real-time sensor data simulation with Born Rule probability calculations
- ✅ RadicanTrust™ global score endpoint

### Frontend Polish
- ✅ Comprehensive error handling with bilingual toast notifications
- ✅ Response validation for all API calls
- ✅ Progress bars with proper ARIA attributes for accessibility
- ✅ Smooth theme transitions and language switching
- ✅ Responsive design across all breakpoints

### Testing & Validation
- ✅ End-to-end tests passed for all critical user journeys
- ✅ CSV export workflow verified (prevents empty exports, handles errors gracefully)
- ✅ Sensor data polling resilience with automatic session stop on failures
- ✅ Content generation workflows tested (all three methods)
- ✅ Theme and language toggle functionality validated

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript, bundled via Vite
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom quantum aesthetic design system
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for lightweight client-side routing
- **Theme System**: Custom light/dark mode with quantum-inspired color palette
- **Internationalization**: Custom context-based i18n supporting English and Japanese

**Design Philosophy**: The UI follows "Quantum Duality" - balancing introversion (poetic depth) with extroversion (logical clarity). Custom color variables include Banana Gold (#FFD54F), Deep Indigo (#1A237E), Quantum Cyan (#7DF9FF), and Cosmic Pink (#FF69B4). Typography uses Inter for body text, Space Grotesk for quantum-inspired headings, and Space Mono for data visualization.

**Key Pages**:
- Home: Landing page with hero section, feature showcase, and global trust score display
- NFT Gallery: BananaMoon Quantum NFT #001 with full metadata, quantum parameters, visual design specs, and bilingual artistic statement
- Quantum Dashboard: Real-time sensor data visualization with Born Rule probability calculations, four-quadrant display (resonance/observation/entanglement/collapse), distance/audio sensors, RadicanTrust™ metrics, and CSV export functionality
- IYQ2025: Social media content generator with three methods (social posts, breath mapping experiment, noise-word integration), all backend-powered with bilingual support
- Partnerships: Business collaboration pathways featuring serendipitous encounter timeline, YSK Life Consultants integration, JCI Yokohama partnership details

### Backend Architecture

**Framework**: Express.js with TypeScript running on Node.js
- **Development Server**: Vite middleware integration for HMR
- **Build Process**: esbuild for production bundling
- **API Design**: RESTful endpoints with JSON responses
- **Validation**: Zod schemas for all POST request bodies
- **Session Management**: In-memory storage (MemStorage class) with proper persistence

**API Endpoints**:
- `GET /api/nft-metadata` - Retrieves BananaMoon NFT metadata with quantum parameters
- `GET /api/global-trust-score` - Returns composite RadicanTrust™ score (0.97)
- `GET /api/quantum-sensor-data` - Simulates real-time sensor readings (100ms intervals) with Born Rule probabilities
- `GET /api/quantum-sessions` - Retrieves all stored quantum empathy sessions
- `POST /api/quantum-sessions` - Creates new quantum empathy session (Zod validated)
- `POST /api/export-session` - Exports session data to CSV format (Zod validated, returns text/csv)
- `POST /api/generate-social-post` - Generates bilingual quantum aesthetic social media posts (Zod validated)
- `POST /api/generate-breath-mapping` - Maps breath rate to quantum parameters α and D (Zod validated)
- `POST /api/generate-noise-pattern` - Integrates noise-words into quantum interference patterns (Zod validated)

**Data Flow**: The backend uses in-memory storage (MemStorage) with proper Map-based persistence. Sensor data simulation generates Born Rule probability distributions for quantum states (resonance, observation, entanglement, collapse) and RadicanTrust™ metrics (vulnerability authenticity, aesthetic coherence, temporal bridge integrity, social resonance potential, quantum aesthetic emergence).

**Error Handling**: All POST endpoints validate incoming data with Zod schemas and return 400 errors with detailed error messages for invalid payloads. Frontend handles both JSON error responses and non-JSON responses gracefully.

### Data Storage

**ORM**: Drizzle ORM configured for PostgreSQL
- **Database Provider**: Neon Serverless (configured but not yet actively used)
- **Schema Location**: `shared/schema.ts`
- **Migration Strategy**: Drizzle Kit push commands

**Current State**: The application uses in-memory storage (`MemStorage` class) for development. Schema defines:
- `nft_metadata` - NFT artwork metadata with quantum parameters, visual design, ethics metrics
- `quantum_sessions` - Empathy dashboard session recordings with sensor data arrays
- `SensorDataPoint` type - Timestamp, distance, audio level, quantum probabilities, trust score
- `RadicanTrustMetrics` - Five-dimensional trust measurement system

**Storage Interface (`IStorage`)**:
- `getNFTMetadata()` - Returns NFT metadata
- `getGlobalTrustScore()` - Returns composite trust score
- `getQuantumSessions()` - Returns all stored sessions
- `createQuantumSession(sessionName)` - Creates new session
- `updateQuantumSession(id, endTime, dataPoints, avgTrust)` - Updates completed session

**Migration Path**: The storage layer is designed for easy transition from in-memory to PostgreSQL by swapping the `IStorage` implementation.

### Authentication and Authorization

**Current Implementation**: No authentication system implemented
- Application is publicly accessible
- No user management or access control
- Future consideration: May add wallet-based authentication for NFT interactions

### Component Architecture

**UI Component Library**: Custom implementation of shadcn/ui components
- **Base Components**: 40+ Radix UI primitives (accordion, dialog, dropdown, progress, etc.)
- **Customization**: Tailwind variants with quantum aesthetic overrides
- **Accessibility**: ARIA-compliant components from Radix UI (Progress bars properly expose aria-valuenow)
- **Theme Integration**: CSS variables for dynamic theming with smooth transitions

**Custom Components**:
- `Navigation`: Responsive navbar with language/theme toggles, wouter routing integration
- `ThemeProvider`: Context-based dark/light mode management with localStorage persistence
- `LanguageToggle`: EN/JP language switching with custom `useLanguage` hook
- Quantum-specific visualizations in dashboard (Born Rule charts, sensor time series)

## External Dependencies

### Third-Party Services

**Neon Database**: Serverless PostgreSQL database
- Connection via `@neondatabase/serverless` package
- Environment variable: `DATABASE_URL`
- Currently configured but data stored in-memory for MVP

**NFT Metadata Standards**: OpenSea-compatible JSON metadata format
- IPFS integration planned for image hosting
- Ethereum blockchain targeted for minting

### Key Libraries

**Frontend**:
- `@tanstack/react-query` (v5.60.5) - Server state management with default fetcher
- `@radix-ui/*` - 25+ UI primitive packages for accessible components
- `react-hook-form` + `@hookform/resolvers` - Form handling with Zod validation
- `wouter` - Lightweight routing library
- `lucide-react` - Icon library for quantum aesthetic UI elements
- `framer-motion` - Animation library (available for future quantum state transitions)
- `class-variance-authority` + `clsx` - Component variant styling
- `tailwind-merge` - Utility for merging Tailwind classes

**Backend**:
- `express` - Web server framework
- `drizzle-orm` + `drizzle-zod` - Database ORM and schema validation
- `zod` - Schema validation for all POST endpoints
- `ws` - WebSocket support (available for future real-time features)

**Development**:
- `vite` - Build tool and dev server
- `@vitejs/plugin-react` - React integration
- `@replit/vite-plugin-*` - Replit-specific tooling
- `tsx` - TypeScript execution
- `esbuild` - Production bundling
- `tailwindcss` - Utility-first CSS framework

### API Integrations

**Current Integrations**:
- In-memory sensor data simulation for quantum empathy measurements
- Backend-powered content generation for IYQ2025 social media campaigns
- CSV export for quantum session data analysis

**Planned Integrations**:
- Grok AI API - For co-creative dialogue and enhanced content generation
- IPFS - For decentralized NFT image storage
- Ethereum RPC - For NFT minting and blockchain interactions
- Social media APIs - For automated IYQ2025 content distribution
- Real hardware sensors - HC-SR04 ultrasonic distance sensor, audio level sensor

## Production Readiness

### Current Status
- ✅ All MVP features implemented and tested
- ✅ Comprehensive error handling with user-friendly notifications
- ✅ Bilingual support (EN/JP) throughout
- ✅ Responsive design tested across breakpoints
- ✅ Accessibility features (ARIA attributes, keyboard navigation)
- ✅ Code quality validated by architect reviews
- ✅ End-to-end tests passing

### Deployment Considerations
- Application ready for Replit deployment
- No external API keys required for MVP features
- Session secret already configured (SESSION_SECRET)
- In-memory storage suitable for demo/testing phase
- Future: Migrate to Neon PostgreSQL for production persistence
- Future: Add CDN for static assets and NFT images
- Future: Implement rate limiting for API endpoints

### Performance Optimization Opportunities
- Consider implementing WebSocket for real-time sensor data (currently polling at 100ms)
- Add React.memo for frequently re-rendering components
- Implement virtualization for large quantum session history lists
- Optimize image loading with lazy loading and responsive images
- Add service worker for offline capability

### Security Considerations
- All POST endpoints protected with Zod validation
- No user-submitted content stored (MVP phase)
- Future: Add CSRF protection for forms
- Future: Implement rate limiting to prevent API abuse
- Future: Add Content Security Policy headers

## Known Issues & Future Improvements

### Minor Issues (Non-blocking)
- Server logs show brief continuation of `/api/quantum-sensor-data` polling after session stop (transient, resolves within one interval cycle)
- Download path not available in remote testing environment (expected behavior, downloads work correctly in production)

### Future Feature Roadmap
1. **Phase 2 - Enhanced Empathy Measurement**
   - Real hardware sensor integration (HC-SR04, audio sensors)
   - WebSocket-based real-time data streaming
   - Historical session analysis with charts
   - Advanced RadicanTrust™ algorithm refinements

2. **Phase 3 - NFT Marketplace Integration**
   - Ethereum blockchain minting
   - IPFS image hosting
   - Wallet connection (MetaMask, WalletConnect)
   - Secondary market listing capabilities

3. **Phase 4 - AI Co-Creation**
   - Grok AI API integration for dialogue
   - Enhanced content generation with machine learning
   - Personalized aesthetic recommendations
   - Collaborative artwork creation workflows

4. **Phase 5 - Social Impact Expansion**
   - Community dashboard for collective empathy metrics
   - Wellbeing economy integration with YSK Life Consultants
   - JCI Yokohama youth engagement programs
   - IYQ2025 campaign analytics and impact measurement

## Development Guidelines

### Code Conventions
- TypeScript strict mode enabled throughout
- Schema-first development approach (define types in `shared/schema.ts` first)
- Zod validation for all API request/response payloads
- Bilingual support required for all user-facing text
- Comprehensive error handling with toast notifications
- Test IDs on all interactive elements and data displays

### File Organization
- `/client/src/pages` - Page components
- `/client/src/components` - Reusable UI components
- `/client/src/components/ui` - shadcn/ui base components
- `/server` - Express backend and API routes
- `/shared` - Shared types and schemas
- `/design_guidelines.md` - Quantum aesthetic design system documentation

### Testing Strategy
- End-to-end tests for critical user journeys
- Playwright-based browser automation
- API endpoint validation
- Accessibility testing via ARIA attributes
- Visual regression testing (future)