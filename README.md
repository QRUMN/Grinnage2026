# Grinnage Extermination - Pest Control Management System

A comprehensive pest control management system built with React, TypeScript, and Supabase, featuring separate portals for residential clients, commercial clients, and administrators.

## Features

### Client Portals

#### Residential Portal
- **Dashboard Overview**
  - Upcoming service appointments
  - Recent pest activity reports
  - Service history timeline
  - Quick action buttons for common requests

- **Appointment Management**
  - Schedule new service appointments
  - View upcoming appointments
  - Reschedule or cancel existing appointments
  - Automated reminders and notifications

- **Service History**
  - Complete treatment history
  - Detailed service reports
  - Before/after photos
  - Technician notes and recommendations

- **Document Management**
  - Access invoices and receipts
  - View service agreements
  - Download treatment reports
  - Store important documents

#### Commercial Portal
- **Multi-Location Management**
  - Manage multiple business locations
  - Location-specific service schedules
  - Individual property histories
  - Consolidated billing

- **Compliance Documentation**
  - Pest control certificates
  - Inspection reports
  - Regulatory compliance documents
  - Safety data sheets

- **Advanced Reporting**
  - Customizable reports
  - Trend analysis
  - Cost tracking by location
  - Service effectiveness metrics

### Admin Portal

#### User Management
- User account administration
- Role-based access control
- Client profile management
- Activity monitoring

#### Service Operations
- **Scheduling System**
  - Technician assignment
  - Route optimization
  - Service area management
  - Capacity planning

- **Inventory Management**
  - Product tracking
  - Usage reporting
  - Reorder notifications
  - Supplier management

#### Security Features
- **Authentication & Authorization**
  - Secure login system
  - Two-factor authentication
  - Password policies
  - Session management

- **Audit System**
  - Detailed audit logs
  - User activity tracking
  - System changes monitoring
  - Security alerts

#### Analytics & Reporting
- **Dashboard Analytics**
  - Real-time metrics
  - Performance indicators
  - Revenue tracking
  - Customer satisfaction metrics

- **Business Intelligence**
  - Custom report generation
  - Data visualization
  - Trend analysis
  - Forecasting tools

### General Features

#### User Interface
- **Responsive Design**
  - Mobile-first approach
  - Touch-friendly interface
  - Adaptive layouts
  - Cross-device compatibility

- **Accessibility**
  - WCAG 2.1 compliance
  - Screen reader support
  - Keyboard navigation
  - High contrast mode

#### Communication
- **Notification System**
  - Email notifications
  - SMS alerts
  - In-app messaging
  - Push notifications

- **Customer Support**
  - Live chat integration
  - Support ticket system
  - FAQ section
  - Knowledge base

## Technical Stack

### Frontend
- React 18.3.1
- TypeScript
- Tailwind CSS
- Jotai (State Management)
- React Router v6
- React Hook Form
- Lucide React (Icons)

### Backend
- Supabase
- PostgreSQL
- Row Level Security
- Real-time subscriptions

### Security
- JWT authentication
- Role-based access control
- Data encryption
- Secure password handling

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account

### Installation
1. Clone the repository
```bash
git clone [repository-url]
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

4. Start the development server
```bash
npm run dev
```

### Environment Variables
```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Development

### Project Structure
```
src/
├── components/     # Reusable UI components
├── hooks/         # Custom React hooks
├── lib/           # Utility functions and API clients
├── pages/         # Page components
├── routes/        # Route definitions
├── store/         # State management
├── styles/        # Global styles
├── types/         # TypeScript type definitions
└── utils/         # Helper functions
```

### Database Schema
The application uses a comprehensive database schema with:
- User management tables
- Service tracking
- Document storage
- Audit logging
- Analytics data

### Testing
- Unit tests with Vitest
- Integration tests
- End-to-end testing
- Accessibility testing

## Deployment

The application can be deployed to various platforms:
- Netlify
- Vercel
- AWS
- Google Cloud Platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@grinnagex.com or create an issue in the repository.