  # Chhatrapati Sambhajinagar Municipal Corporation (CSMC) — Redesigned Citizen Services Portal

A next-generation, mobile-first, and accessible e-governance platform for Chhatrapati Sambhajinagar Municipal Corporation (formerly Aurangabad Municipal Corporation). This portal is optimized for Marathi-speaking, low-to-semi-technical, and low-bandwidth citizens, removing login barriers for public information and essential interactions.

---

##  Key Features

###  Guest & Public Portal (Unauthenticated)
To improve usability and eliminate friction, the portal features a dedicated unauthenticated route group `(public)` supporting:
- **Hero & Landing Section** - Important municipal announcements, official contacts, and quick links.
- **Services Hub** - A comprehensive dashboard of all available services categorized by department.
- **Guest Complaint Filing & Tracking** - Register complaints with location coordinates and attachments, and track real-time resolution status without needing an account.
- **Tenders Portal** - View and filter active municipal tenders with date-sorting.
- **Document & RTS Directory** - Download key forms, Right to Services (RTS) documents, and Right to Information (RTI) sheets.

### Authenticated Dashboards (Citizen, Officer & Admin)
For personalized and secure municipal tasks:
- **Citizen Account** - Manage properties, view and pay property tax receipts, track historical water bills, and request digital certificates.
- **Officer Console** - Review applications, update complaint statuses, and assign tasks.
- **Admin Dashboard** - Role-based access control (RBAC), audit logging, and service configurations.

###  Custom i18n & Accessibility
- **Marathi-First Design** - Marathi is initialized as the primary default language, with a persistent client-side locale switcher to English.
- **AAA Typography Controls** - Native font-size adjustments (A- / A / A+) on all headers and pages to improve legibility.
- **High Contrast & Accessible Layout** - Full WCAG 2.2 AA compliance, large touch targets (min 44x44px), and keyboard-navigable components.

---

##  Technical Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Framer Motion (micro-interactions)
- **State Management**: Zustand & React Query (TanStack Query)
- **Backend-as-a-Service**: Firebase
  - **Cloud Firestore**: Configured with strict rules, rate limits, and collection mappings
  - **Firebase Authentication**: Integrated Email/Password, Google OAuth, and Phone/OTP sign-in
  - **Cloud Storage**: Handles document uploads with MIME-type and file size constraints
  - **Cloud Functions**: Handles secure serverless tasks and rate limiting
- **Testing**: Jest & React Testing Library (for unit and integration tests)

---

##  Project Structure

```
csnmahanagarpalika/
├── src/
│   ├── app/                      # Next.js 14 App Router
│   │   ├── (auth)/               # User authentication routes
│   │   ├── (citizen)/            # Authenticated Citizen portal
│   │   ├── (officer)/            # Authenticated Officer console
│   │   ├── (admin)/              # Authenticated Admin dashboard
│   │   ├── (public)/             # Unauthenticated public pages (Home, About, Tenders, etc.)
│   │   └── api/                  # Next.js API Routes (rate limiters, handlers)
│   ├── components/               # Reusable UI components
│   │   ├── common/               # AAA Controls, badges, layout helpers
│   │   └── home/                 # Homepage sections (Hero, Services, Officials)
│   ├── contexts/                 # App-wide React Contexts (i18n, Auth)
│   ├── lib/                      # Helper libraries, constants, i18n dictionaries
│   └── types/                    # TypeScript interfaces & types
├── firebase/                     # Firebase backend setup & configurations
├── docs/                         # Specifications, guidelines, and setup docs
├── public/                       # Static images, icons, and localized vectors
└── scripts/                      # Utility scripts
```

---

## 🚦 Getting Started

### Prerequisites
- Node.js 20+
- Firebase CLI installed globally (`npm install -g firebase-tools`)
- A Firebase Project (for local development or deployment)

### Local Installation & Running

1. **Clone the repository**
   ```bash
   git clone https://github.com/BhaveshKhaple/csnmahanagarpalika.git
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env.local` file in the root directory and add your Firebase configurations:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   ```

4. **Start Firebase Emulators (Optional but recommended)**
   If you have the Firebase Emulator Suite configured for local firestore/auth testing:
   ```bash
   npm run firebase:emulators
   ```

5. **Start the Next.js Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing

The codebase includes test suites built using Jest and React Testing Library:

```bash
# Run all unit and integration tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate test coverage report
npm run test:coverage
```

---

## 🔒 Security & Performance

- **Sandboxed Guest Writes**: Public actions (like guest complaints) are written directly to a sandboxed Firestore space with validation schemas and strict write-only rules.
- **API Rate Limiting**: Next.js API endpoints use serverless rate limits to prevent brute-force abuse and API spamming.
- **Adaptive Components**: Component layouts leverage `@tailwindcss/container-queries` to shift gracefully on container size adjustments, preventing visual overlap or excessive layout shifts.
- **Optimized Media Assets**: Serves responsive images and defers loading of heavy video components to save mobile bandwidth.

---

## 📅 Future Scope & Out of Scope Features (To-Do List)

The following advanced capabilities and workflows from the original specification are currently out of scope for the public citizen experience redesign, but are preserved here as part of the future development backlog:

### 💳 Financial & Core Integrations
- [ ] **Live Payment Gateway Integration**: Connect client-side mock routes with a production Razorpay/bill-settlement API.
- [ ] **Full Digital Certificate Issuance**: Auto-verify and generate secure, downloadable Birth, Death, and Marriage certificates.
- [ ] **License Management**: Complete trade license application processing and building permission approval routing.
- [ ] **Digital Locker Integration**: Secure third-party storage APIs for citizen document verification.

### 📊 Administrative Controls
- [ ] **GIS Mapping & Heatmaps**: Interactive maps for administrators showing real-time complaint heatmaps and regional resource allocation.
- [ ] **Department Performance Dashboards**: Advanced KPI graphs and task latency metrics for department heads.
- [ ] **Super Admin Panel**: Direct tenant configuration and comprehensive system audit logging.

### 🤖 AI-Powered Automation
- [ ] **Voice Assistant Integration**: Full speech-to-text navigation and service triggering on the landing page.
- [ ] **Automated Complaint Classification**: Deep learning models (e.g., TensorFlow) to categorize incoming complaints from images/videos.
- [ ] **Image-Based Issue Verification**: Auto-detecting potholes, waste piles, or public property damage to prevent invalid/spam complaints.
- [ ] **Predictive Maintenance Alerts**: Early anomaly detection for municipal utility assets (e.g., water grid lines).
- [ ] **Sentiment Analysis**: Citizen feedback and trend detection dashboard for municipal communications.
- [ ] **OCR Document Verification**: Extracting details from uploaded bills or ID cards to auto-fill application fields.

---

## 📄 License

This project is licensed under the MIT License.
