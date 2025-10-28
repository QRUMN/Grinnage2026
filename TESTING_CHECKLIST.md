# Pre-Launch Testing Checklist

## ✅ Testing Status Overview

### Critical User Flows to Test

## 1. 🔐 Authentication Flow

### Admin Login (Demo Mode)
- [ ] Navigate to `/admin-login`
- [ ] Enter credentials:
  - Email: `admin@grinnage.com`
  - Password: `admin123`
- [ ] Verify successful login redirects to `/admin`
- [ ] Check admin name "Keith Grinnage" appears in header
- [ ] Test logout functionality
- [ ] Verify session persists on page refresh
- [ ] Test invalid credentials show error

**Expected Behavior:**
- ✅ Demo authentication works (no real Supabase auth for admin)
- ✅ Session stored in localStorage
- ✅ 24-hour session expiry

### Client Registration (Supabase Auth)
- [ ] Navigate to registration/onboarding
- [ ] Fill out complete form with valid data
- [ ] Submit and verify email verification sent
- [ ] Check Supabase auth user created
- [ ] Verify profile, address, and marketing_preferences tables populated

**Expected Behavior:**
- ✅ Uses Supabase authentication
- ✅ Creates records in: profiles, addresses, marketing_preferences, user_roles, clients
- ✅ Requires email verification

---

## 2. 📊 Admin CRM Dashboard

### Access & Navigation
- [ ] Login as admin
- [ ] Verify dashboard loads at `/admin`
- [ ] Check all navigation items visible:
  - [ ] Dashboard
  - [ ] Leads
  - [ ] Clients
  - [ ] Appointments
  - [ ] Website Content
  - [ ] Analytics
  - [ ] Settings
- [ ] Test mobile menu works (< 768px width)

### Leads Management (`/admin/leads`)
- [ ] View leads list
- [ ] Check lead details
- [ ] Convert lead to client
- [ ] Add notes to lead
- [ ] Filter/search leads

### Client Management (`/admin/clients`)
- [ ] View clients list
- [ ] Search/filter clients
- [ ] View client details
- [ ] Edit client information
- [ ] View client service history
- [ ] Add notes to client record

### Content Management (`/admin/content`)
- [ ] Edit About page content
- [ ] Edit Services page content
- [ ] Edit Homepage content
- [ ] Save changes
- [ ] Verify changes appear on public pages

---

## 3. 📅 Appointments System

### Appointment Booking (Client Side)
- [ ] Navigate to contact/consultation page
- [ ] Select service type
- [ ] Choose preferred date
- [ ] Select available time slot
- [ ] Submit appointment request
- [ ] Verify confirmation message

### Appointment Management (Admin)
- [ ] Navigate to `/admin/appointments`
- [ ] View appointment list
- [ ] Check appointment details:
  - Client info
  - Service type
  - Date & time
  - Status (scheduled/completed/cancelled)
- [ ] Update appointment status
- [ ] Reschedule appointment
- [ ] Cancel appointment
- [ ] Assign technician (if applicable)

**Database Tables:**
- `appointments` table stores all appointments
- Status values: scheduled, completed, cancelled, rescheduled

---

## 4. 💳 Payment Processing

### ⚠️ **CRITICAL: Stripe Not Configured**
- Payment processing is **NOT FUNCTIONAL** without Stripe key
- `VITE_STRIPE_PUBLISHABLE_KEY` is missing from `.env`

### To Test Payments (After Configuration):
- [ ] Add Stripe test key to `.env`
- [ ] Navigate to payment flow
- [ ] Use Stripe test card: 4242 4242 4242 4242
- [ ] Complete payment
- [ ] Verify success/failure handling

**Current Status:** 🔴 **Not testable** (missing Stripe configuration)

---

## 5. 🌐 Public Pages

### Landing Page (`/`)
- [ ] Verify page loads
- [ ] Test hero section
- [ ] Check all sections render:
  - Services overview
  - Testimonials (if applicable)
  - Contact info
- [ ] Test navigation to other pages
- [ ] Mobile responsiveness

### Services Page (`/services`)
- [ ] View services list
- [ ] Check service descriptions
- [ ] Verify pricing displays (if applicable)
- [ ] Test "Get Quote" buttons

### About Page (`/about`)
- [ ] Verify new modern design loads
- [ ] Check team members display
  - Keith Grinnage (CEO & Operator)
  - Dawson Grinnage (Social Media Manager)
- [ ] Check values section
- [ ] Check certifications display
- [ ] Test CTA buttons

### Contact Page (`/contact`)
- [ ] Fill out contact form
- [ ] Submit form
- [ ] Verify submission creates lead in CRM
- [ ] Check email sent (if configured)
- [ ] Test form validation

---

## 6. 🗄️ Database Integrity

### Tables to Verify
- [ ] `profiles` - User profile data
- [ ] `addresses` - User addresses
- [ ] `marketing_preferences` - User preferences
- [ ] `user_roles` - Role assignments
- [ ] `clients` - Client records
- [ ] `appointments` - Appointment records
- [ ] `services` - Service types
- [ ] `leads` (if exists) - Lead records

### Row Level Security
- [ ] Clients can only see their own data
- [ ] Admins can see all data
- [ ] Unauthenticated users can't access protected tables

---

## 7. 🎨 UI/UX Testing

### Theme Support
- [ ] Toggle dark/light theme
- [ ] Verify theme persists on refresh
- [ ] Check all pages respect theme

### Responsive Design
- [ ] Test on mobile (< 768px)
- [ ] Test on tablet (768px - 1024px)
- [ ] Test on desktop (> 1024px)
- [ ] Check navigation menu adapts
- [ ] Verify forms are usable on mobile

### Notifications
- [ ] Admin notification bell works
- [ ] Notifications appear for new leads
- [ ] Notifications appear for new appointments
- [ ] Toast messages display correctly

---

## 8. 🚀 Deployment Verification

### Pre-Deploy Checklist
- [x] Build completes successfully
- [x] No critical TypeScript errors
- [x] Supabase credentials configured
- [ ] Stripe credentials configured (if payments needed)
- [ ] Environment variables set in Netlify

### Post-Deploy Checks
- [ ] Production URL loads
- [ ] SSL certificate active (HTTPS)
- [ ] All pages accessible
- [ ] Assets load correctly (images, CSS, JS)
- [ ] Service worker registers (PWA)
- [ ] Supabase connection works
- [ ] Admin login works
- [ ] Contact form submissions work

---

## 9. ⚠️ Known Issues & Limitations

### Currently Not Functional
1. **Payment Processing** - Requires Stripe configuration
2. **Google Calendar Integration** - Not implemented
3. **Email Notifications** - May need SMTP configuration

### Demo/Test Mode
1. **Admin Login** - Uses hardcoded demo credentials (not Supabase auth)
2. **Sample Data** - May need seed data for testing

---

## 10. 🎯 Priority Testing Order

### Phase 1: Core Functionality (Day 1)
1. ✅ Build verification
2. ✅ Environment configuration check
3. Admin login flow
4. Public pages load
5. Database connection

### Phase 2: User Flows (Day 1-2)
1. Client registration
2. Appointment booking
3. Admin CRM access
4. Contact form submission
5. Content management

### Phase 3: Polish (Day 2-3)
1. Mobile responsiveness
2. Theme switching
3. Notifications
4. Error handling
5. Loading states

---

## Testing Tools Recommended

1. **Browser DevTools** - Check console for errors
2. **Supabase Dashboard** - Verify database records
3. **Lighthouse** - Performance/accessibility audit
4. **BrowserStack** - Cross-browser testing
5. **Postman/Insomnia** - API endpoint testing (if applicable)

---

## Success Criteria

### Minimum Viable Product (MVP)
- ✅ Public pages load and display correctly
- ✅ Admin can login and access CRM
- ✅ Contact form creates leads
- ✅ Appointments can be created
- ✅ Mobile responsive
- ⚠️ Payments (optional for initial launch)

### Production Ready
- All MVP criteria met
- Zero console errors on production
- All forms validated and secure
- Database RLS policies working
- SSL certificate active
- PWA installable
- Performance score > 80 (Lighthouse)

---

**Last Updated:** October 28, 2025
**App Version:** 2.0.0
**Ready for Testing:** ✅ Yes (except payments)
