# Vitals - Clinical Real-Time Health & Patient Dashboard

A production-grade healthcare analytics and vitals monitoring dashboard built with **React 18**, **TypeScript**, and **Tailwind CSS**.

![Dashboard Preview](https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80)

---

## 🌟 Features & Highlights

- **Top Navigation Bar**:
  - Distinct navigation tabs (`Dashboard`, `Appointment`, `Patient`, `Reports`, `Chats`, `Billing`).
  - Search trigger with global modal, system notifications popover with unread counter, and physician profile details.
- **Page Sub-Header**:
  - Live device connectivity indicator with pulsing signal.
  - Device telemetry timestamp sync with interactive refresh trigger.
  - "+ Add Reading" action button opening a validated modal to record new clinical vitals.
- **Today's Summary & 3D Holographic Anatomy**:
  - Interactive timeframe switcher (`Day`, `Week`, `Month`) updating all 8 telemetry cards.
  - Centerpiece **3D Holographic Human Anatomical Avatar** on an energetic cyber pedestal with radar sweep rings, vertical laser scanning beam, and interactive pulsating telemetry nodes (Heart, Blood Pressure, Oximeter, Core Temp, Glucose, Mobility/Steps) that link to the respective metric cards.
  - 8 High-Fidelity Medical Metric Cards flanking the body:
    1. **Heart Rate**: 72 BPM with 3D anatomical heart muscle visual & coronary pulses.
    2. **Blood Pressure**: 132/86 mmHg with digital monitor visual & cuff.
    3. **Blood Oxygen**: 98% with clip-on fingertip pulse oximeter visual.
    4. **Temperature**: 98.6°F with non-contact infrared temporal thermometer visual.
    5. **Blood Weight**: 185 mg/dL with glass smart body composition scale.
    6. **Blood Glucose**: 110 mg/dL with smart glucometer, test strip, and blood drop.
    7. **Activity**: 8,420 steps with 84% goal progress bar & dynamic runner visual.
    8. **Sleep**: 7.15 hrs with 3D crescent moon, cloud, and sleep cycle indicators.
- **Connected Devices Panel**:
  - Real-time device status (Health BP Monitor, Apple Watch, Pulse Oximeter).
  - One-click device sync and deep-dive diagnostic dialog (battery, signal status, telemetry status).
- **Daily AI Checklist**:
  - Interactive task checklist with completion state, cross-out animations, and live progress counter (`1/3 Done`).
- **AI Synthesis Card**:
  - 3D Holographic Glowing Brain visualization with dynamic neural folds, firing synaptic sparks, EEG brainwaves, and cyber base rings.
  - Clinical Key Insights with verification badges.
  - Split Observations & Actionable Recommendations cards.

---

## 🛠️ Tech Stack & Architecture

- **React 18** (Functional components, custom state hooks)
- **TypeScript 5** (Strict mode, comprehensive domain interfaces for vitals, devices, checklist, and synthesis)
- **Tailwind CSS 3** (Custom design tokens, bespoke glowing gradients, cyber animations, responsive breakpoints)
- **Lucide React** (Clean, high-performance vector icons)
- **Vite 5** (Fast HMR development and optimized production bundling)

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start development server
```bash
npm run dev
```

### 3. Build for production
```bash
npm run build
```

### 4. Preview production build
```bash
npm run preview
```

---

## 📁 Directory Structure

```
vitals/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── index.css
    ├── types/
    │   └── index.ts
    ├── utils/
    │   └── cn.ts
    ├── data/
    │   └── mockData.ts
    └── components/
        ├── Common/
        │   └── Badge.tsx
        ├── Navigation/
        │   ├── Navbar.tsx
        │   └── SearchModal.tsx
        ├── Header/
        │   ├── DashboardHeader.tsx
        │   └── AddReadingModal.tsx
        ├── Vitals/
        │   ├── TodaySummary.tsx
        │   ├── VitalMetricCard.tsx
        │   ├── DeviceVisuals.tsx
        │   └── HolographicBody.tsx
        ├── Devices/
        │   └── ConnectedDevices.tsx
        ├── Checklist/
        │   └── AIChecklist.tsx
        └── AI/
            ├── AISynthesis.tsx
            └── GlowingBrain.tsx
```
