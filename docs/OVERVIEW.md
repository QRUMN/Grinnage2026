# Grinnage Extermination - Application Overview

## Architecture Overview

The application is built using React with TypeScript and follows a modular, component-based architecture with clear separation of concerns.

### Core Technologies

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS for utility-first styling
- **State Management**: Jotai for atomic state management
- **Routing**: React Router v6
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **HTTP Client**: Axios

### Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── auth/            # Authentication related components
│   ├── common/          # Shared UI components
│   ├── dashboard/       # Dashboard specific components
│   │   ├── admin/       # Admin dashboard components
│   │   ├── commercial/  # Commercial dashboard components
│   │   └── residential/ # Residential dashboard components
│   ├── layout/          # Layout components
│   └── sections/        # Landing page sections
├── hooks/               # Custom React hooks
├── lib/                 # Core functionality
│   ├── api/            # API integration
│   └── validation/     # Schema validation
├── pages/              # Page components
├── store/              # State management
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

### Key Features

1. **Multi-tenant Dashboard System**
   - Admin Dashboard
   - Commercial Client Dashboard
   - Residential Client Dashboard

2. **Authentication & Authorization**
   - Role-based access control
   - Protected routes
   - Session management

3. **User Management**
   - User registration
   - Profile management
   - Role-based permissions

4. **Service Management**
   - Appointment scheduling
   - Service history tracking
   - Document management

5. **Billing & Payments**
   - Invoice management
   - Payment processing
   - Subscription handling

### User Roles

1. **Admin**
   - Full system access
   - User management
   - Analytics dashboard
   - System settings
   - Audit logs

2. **Commercial Client**
   - Multi-location management
   - Business-specific features
   - Commercial service scheduling
   - Document management

3. **Residential Client**
   - Single property management
   - Residential service scheduling
   - Basic document access

### State Management

The application uses Jotai for state management with the following key atoms:

- `authStateAtom`: Manages authentication state
- `themeAtom`: Handles theme switching (light/dark)

### API Integration

- RESTful API integration using Axios
- Centralized API client configuration
- Request/response interceptors
- Error handling

### Form Handling

- Form validation using Zod schemas
- Custom form hooks for reusability
- Standardized error handling
- Multi-step form support

### Styling System

The application uses a consistent design system implemented with Tailwind CSS:

```css
Theme Colors:
- Primary: #56e39f (Mint)
- Dark: #131112
- Light: #f7f7ff

Components:
- Buttons
- Cards
- Forms
- Navigation
- Tables
```

### Security Features

1. **Authentication**
   - JWT-based authentication
   - Secure password handling
   - Session management

2. **Authorization**
   - Role-based access control
   - Protected routes
   - Component-level permissions

3. **Data Security**
   - Input validation
   - XSS protection
   - CSRF protection

### Performance Optimizations

1. **Code Splitting**
   - Route-based code splitting
   - Lazy loading of components
   - Dynamic imports

2. **State Management**
   - Atomic updates with Jotai
   - Minimized re-renders
   - Efficient state updates

3. **Asset Optimization**
   - Lazy loading of images
   - Icon optimization
   - CSS optimization

### Testing Strategy

1. **Unit Tests**
   - Component testing
   - Hook testing
   - Utility function testing

2. **Integration Tests**
   - API integration testing
   - Form submission testing
   - Authentication flow testing

### Deployment

The application is configured for deployment with:
- Vite for building
- Environment-based configuration
- Production optimizations

### Future Enhancements

1. **Features**
   - Real-time notifications
   - Advanced analytics
   - Mobile application
   - Offline support

2. **Technical**
   - PWA support
   - Performance monitoring
   - Automated testing
   - CI/CD pipeline

### Best Practices

1. **Code Organization**
   - Consistent file structure
   - Clear naming conventions
   - Modular components
   - Single responsibility principle

2. **Performance**
   - Code splitting
   - Lazy loading
   - Memoization
   - Bundle optimization

3. **Security**
   - Input validation
   - Authentication
   - Authorization
   - Data encryption

4. **Accessibility**
   - ARIA labels
   - Keyboard navigation
   - Screen reader support
   - Color contrast

### Development Guidelines

1. **Component Creation**
   - Functional components
   - Custom hooks for logic
   - Prop type validation
   - Error boundaries

2. **State Management**
   - Atomic state with Jotai
   - Local state when appropriate
   - Minimized prop drilling
   - Efficient updates

3. **Styling**
   - Tailwind CSS utilities
   - Consistent theming
   - Responsive design
   - Dark mode support

4. **Documentation**
   - Component documentation
   - Type definitions
   - Code comments
   - API documentation