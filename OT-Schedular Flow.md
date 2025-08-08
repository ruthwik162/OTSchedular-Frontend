ot-scheduler-app/
├── client/
│   ├── 🛂 [AUTH FLOW]
│   │    └── Login.jsx / Register.jsx
│   │         ↓
│   │    Firebase Authentication (Email/Password)
│   │         ↓
│   │    Fetch user data from `users` collection in Firestore
│   │         ↓
│   │    Redirect based on role → Admin / Doctor / Patient Dashboard
│
│   ├── 🧑‍💼 [ADMIN FLOW]
│   │    └── AdminDashboard.jsx
│   │         ↓
│   │    Manage Doctors & Patients (CRUD)
│   │         ↓
│   │    Create Operation Schedule → ScheduleForm.jsx
│   │         ↓
│   │    Fill: OT ID, doctor, patient, datetime, anesthesia, remarks
│   │         ↓
│   │    Save to Firestore → `operationSchedules` collection
│   │         ↓
│   │    Optional: Upload surgical plan (PDF/Image) to Firebase Storage
│   │         ↓
│   │    Log event → `logs` collection
│
│   ├── 🧑‍⚕️ [DOCTOR FLOW]
│   │    └── DoctorDashboard.jsx
│   │         ↓
│   │    Fetch assigned surgeries from Firestore
│   │         ↓
│   │    View OT time, patient, anesthesia
│   │         ↓
│   │    Upload surgical reports → Save to Firebase Storage
│   │         ↓
│   │    Add post-op remarks → Update Firestore doc
│
│   ├── 🧑‍🦽 [PATIENT FLOW]
│   │    └── PatientDashboard.jsx
│   │         ↓
│   │    View upcoming surgery schedule
│   │         ↓
│   │    View doctor assigned, OT room, date & time
│   │         ↓
│   │    Download reports (if uploaded)
│
│   ├── 🔁 [COMMON COMPONENTS]
│   │    ├── Navbar, Sidebar, Cards
│   │    └── Role-based navigation loaded from `AppContext.jsx`
│
│   ├── 🧠 [CONTEXT & STATE]
│   │    └── AppContext.jsx
│   │         ↓
│   │    Handles user session, login, register, logout, role-based routing
│
│   ├── 📡 [FIREBASE SERVICES]
│   │    └── firebase.js
│   │         ↓
│   │    Initializes Firebase Auth, Firestore, Storage
│
│
├── server/ (Optional for API routing/logging)
│   ├── 📥 [API: User Routes]
│   │    └── POST /api/users → register user (optional backend)
│   │    └── POST /api/login → authenticate user
│
│   ├── 📄 [API: Logs / Reports]
│   │    └── POST /api/log → save operation event logs
│   │    └── GET /api/reports/:id → fetch report links
│
│   └── 🌐 [MIDDLEWARES]
│        └── Auth middleware (optional for token-based access control)
│
│
├── 🔐 [FIREBASE FIRESTORE]
│   ├── users/
│   │    └── uid → { email, username, role, ... }
│   ├── operationSchedules/
│   │    └── id → { patientId, doctorId, datetime, OT room, ... }
│   ├── notifications/
│   │    └── userId → [ message, status ]
│   └── logs/
│        └── logId → { action, actor, timestamp }
│
├── 📁 [PROJECT ROOT]
│   ├── .env
│   ├── firebase.json → for hosting config
│   ├── firestore.rules → security (role-based)
│   ├── README.md → Setup + Documentation

├────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────


