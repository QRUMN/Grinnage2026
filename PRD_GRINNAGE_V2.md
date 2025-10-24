# Product Requirements Document (PRD)
## Grinnage Pest Control - Progressive Web Application

**Version:** 2.0
**Date:** October 24, 2025
**Project:** Complete rebuild for client-managed business platform

---

## 1. Executive Summary

### 1.1 Product Vision
Build a comprehensive pest control business platform that enables:
- Client self-service (booking, payments, account management)
- Admin business management (CRM, scheduling, content control)
- Zero-code maintenance for business owner

### 1.2 Success Metrics
- Client can update all website content without coding
- 100% payment processing through Stripe
- Automated appointment scheduling via Google Calendar
- Complete customer journey from inquiry to service delivery

---

## 2. User Personas

### 2.1 Primary Users

**Business Owner (Admin)**
- Needs: Manage clients, track payments, schedule services, update website
- Technical Level: Non-technical
- Goals: Run business efficiently without developer dependency

**Customers (Clients)**
- Needs: Book services, make payments, track service history
- Technical Level: Basic web users
- Goals: Easy service booking and account management

**Prospects (Visitors)**
- Needs: Learn about services, get quotes, contact company
- Technical Level: Basic web users
- Goals: Find pest control solutions and pricing

---

## 3. Core Features & Requirements

### 3.1 Public Website (No Auth Required)
- **Landing Page**: Hero, services overview, testimonials, contact
- **Services Page**: Detailed service descriptions with Stripe pricing
- **About Page**: Company information (admin-editable)
- **Contact Page**: Inquiry form that creates leads in CRM
- **Progressive Web App**: Installable, offline-capable

### 3.2 Client Portal (Customer Auth)
- **Account Creation**: Registration with email verification
- **Service Booking**: Browse services, select, pay via Stripe
- **Appointment Scheduling**: Book consultations via Google Calendar
- **Account Dashboard**: Service history, upcoming appointments, payments
- **Profile Management**: Update contact info, payment methods

### 3.3 Admin CRM (Business Owner Auth)
- **Lead Management**: View/convert website inquiries
- **Client Database**: Complete customer profiles with service history
- **Payment Tracking**: Stripe integration for revenue overview
- **Calendar Management**: Google Calendar for appointment scheduling
- **Content Management**: Edit all website content (WYSIWYG)
- **Service Management**: Add/edit/price services

---

## 4. Technical Architecture

### 4.1 Technology Stack
- **Frontend**: React 18 + TypeScript (simplified)
- **Backend**: Supabase (auth, database, real-time)
- **Payments**: Stripe (checkout, subscriptions, invoicing)
- **Scheduling**: Google Calendar API
- **Styling**: Tailwind CSS
- **Build**: Vite
- **Deployment**: Netlify
- **PWA**: Service worker, manifest, offline support

### 4.2 Simplified Dependencies
```json
{
  "core": ["react", "typescript", "vite"],
  "ui": ["tailwindcss", "lucide-react"],
  "backend": ["@supabase/supabase-js"],
  "payments": ["@stripe/stripe-js", "@stripe/react-stripe-js"],
  "calendar": ["googleapis"],
  "forms": ["react-hook-form", "zod"],
  "routing": ["react-router-dom"]
}
```

---

## 5. Implementation Roadmap

### 5.1 Phase 1: Foundation (Hour 1)
**Tasks:**
- [ ] Remove complex dependencies (AI, Mapbox, Jotai, complex routing)
- [ ] Fix critical build error in Settings.tsx
- [ ] Set up simplified project structure
- [ ] Configure Stripe and Google Calendar APIs
- [ ] Update Supabase schema for simplified data model

**Checkpoint:** Clean build with essential dependencies only

### 5.2 Phase 2: Public Website (Hour 2)
**Tasks:**
- [ ] Build responsive landing page with hero section
- [ ] Create services page with Stripe pricing integration
- [ ] Implement contact form that creates CRM leads
- [ ] Add admin content management interface
- [ ] Set up PWA manifest and service worker

**Checkpoint:** Functional public website with payment integration

### 5.3 Phase 3: Authentication & Client Portal (Hour 3)
**Tasks:**
- [ ] Implement Supabase authentication (register/login)
- [ ] Build client dashboard with service history
- [ ] Create service booking flow with Stripe checkout
- [ ] Integrate Google Calendar appointment scheduling
- [ ] Add client profile management

**Checkpoint:** Complete client self-service portal

### 5.4 Phase 4: Admin CRM System (Hour 4)
**Tasks:**
- [ ] Build admin dashboard with business metrics
- [ ] Create lead management interface
- [ ] Implement client database with search/filter
- [ ] Add payment tracking with Stripe webhooks
- [ ] Build calendar management interface

**Checkpoint:** Complete business management system

### 5.5 Phase 5: Integration & Testing (Hour 5)
**Tasks:**
- [ ] Connect full customer journey workflow
- [ ] Test all payment flows and edge cases
- [ ] Verify Google Calendar sync functionality
- [ ] Implement error handling and loading states
- [ ] Add offline PWA capabilities

**Checkpoint:** Fully integrated and tested platform

### 5.6 Phase 6: Deployment & Documentation (Hour 6)
**Tasks:**
- [ ] Deploy to Netlify with environment variables
- [ ] Set up Stripe webhooks and Google OAuth
- [ ] Create admin user guide with screenshots
- [ ] Test production deployment thoroughly
- [ ] Handoff to client with training session

**Checkpoint:** Production-ready platform with complete documentation

---

## 6. Data Model (Simplified)

### 6.1 Core Tables
```sql
-- Users (Supabase Auth + Profiles)
profiles (id, email, full_name, role, created_at)

-- Services
services (id, name, description, price, active, created_at)

-- Clients
clients (id, user_id, phone, address, service_history, notes)

-- Appointments
appointments (id, client_id, service_id, date_time, status, calendar_event_id)

-- Payments
payments (id, client_id, stripe_payment_id, amount, status, created_at)

-- Leads
leads (id, name, email, phone, message, status, created_at)

-- Content (Admin-editable)
content (id, section, key, value, updated_at)
```

---

## 7. API Integrations

### 7.1 Stripe Integration
- **Checkout Sessions**: Service payments and consultations
- **Customer Portal**: Client payment method management
- **Webhooks**: Payment status updates
- **Dashboard**: Revenue and payment tracking

### 7.2 Google Calendar Integration
- **OAuth Setup**: Business calendar access
- **Event Creation**: Automatic appointment booking
- **Availability**: Real-time slot checking
- **Notifications**: Email confirmations

---

## 8. Security & Performance

### 8.1 Security Requirements
- Supabase Row Level Security (RLS) policies
- Stripe secure payment processing
- Google OAuth for calendar access
- Input validation with Zod schemas
- HTTPS-only in production

### 8.2 Performance Requirements
- PWA with offline capabilities
- Lazy loading for non-critical components
- Optimized images and assets
- Fast initial page load (<3 seconds)
- Responsive design for all devices

---

## 9. Success Criteria

### 9.1 Technical Completion
- [ ] Zero build errors or TypeScript issues
- [ ] All payment flows working with Stripe
- [ ] Google Calendar sync functioning
- [ ] PWA installable on mobile devices
- [ ] Admin can edit all content without code

### 9.2 Business Completion
- [ ] Client can book and pay for services
- [ ] Admin has complete CRM functionality
- [ ] Automated appointment scheduling works
- [ ] Business owner can maintain independently
- [ ] Documentation provided for ongoing management

---

## 10. Post-Launch Maintenance

### 10.1 Client Responsibilities
- Content updates through admin interface
- Customer service and appointment management
- Basic troubleshooting with provided guide

### 10.2 Developer Handoff
- Complete source code with documentation
- Environment setup instructions
- API key management guide
- Basic troubleshooting procedures

---

**This PRD serves as the complete specification for rebuilding the Grinnage Pest Control platform. Each phase has clear tasks and checkpoints to ensure systematic progress toward a client-managed business platform.**