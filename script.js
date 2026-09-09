const app = document.getElementById('app');

const state = {
  role: 'patient',
  doctor: 'Dr. Priya Sharma',
  hospital: 'Janta Hospital',
  selectedSlot: '10:30 AM',
  selectedDate: '12 September 2026',
  currentStep: 'doctor',
};

const screenTemplates = {
  login: renderLogin,
  'patient-dashboard': renderPatientDashboard,
  'find-doctor': renderFindDoctor,
  'doctor-profile': renderDoctorProfile,
  'book-appointment': renderBookAppointment,
  'appointment-confirmed': renderAppointmentConfirmed,
  'live-queue': renderLiveQueue,
  'hospital-details': renderHospitalDetails,
  'medical-records': renderMedicalRecords,
  'ai-report-summary': renderAiReportSummary,
  'digital-prescription': renderDigitalPrescription,
  'emergency': renderEmergency,
  'doctor-dashboard': renderDoctorDashboard,
  'doctor-patient-detail': renderDoctorPatientDetail,
  'hospital-dashboard': renderHospitalDashboard,
  'admin-dashboard': renderAdminDashboard,
  'admin-hospital-management': renderAdminHospitalManagement,
  notifications: renderNotifications,
  profile: renderProfile,
};

function render() {
  const route = window.location.hash.replace('#', '') || 'login';
  const template = screenTemplates[route] || renderLogin;
  app.innerHTML = template();
}

function navigate(route) {
  window.location.hash = route;
  render();
}

function getCurrentRoleLabel() {
  const map = {
    patient: 'Patient',
    doctor: 'Doctor',
    hospital: 'Hospital',
    admin: 'Admin',
  };
  return map[state.role] || 'Patient';
}

function roleRouteFor(role) {
  const routes = {
    patient: 'patient-dashboard',
    doctor: 'doctor-dashboard',
    hospital: 'hospital-dashboard',
    admin: 'admin-dashboard',
  };
  return routes[role] || 'patient-dashboard';
}

function getSidebarItems(role) {
  if (role === 'patient') {
    return [
      ['Dashboard', 'patient-dashboard'],
      ['Find Doctor', 'find-doctor'],
      ['Hospitals', 'hospital-details'],
      ['Appointments', 'patient-dashboard'],
      ['Live Queue', 'live-queue'],
      ['Medical Records', 'medical-records'],
      ['Prescriptions', 'digital-prescription'],
      ['Emergency', 'emergency'],
      ['Profile', 'profile'],
    ];
  }
  if (role === 'doctor') {
    return [
      ['Dashboard', 'doctor-dashboard'],
      ['Appointments', 'doctor-dashboard'],
      ['Patients', 'doctor-patient-detail'],
      ['Queue', 'doctor-dashboard'],
      ['Medical Records', 'medical-records'],
      ['Prescriptions', 'digital-prescription'],
      ['Reports', 'ai-report-summary'],
      ['Profile', 'profile'],
    ];
  }
  if (role === 'hospital') {
    return [
      ['Overview', 'hospital-dashboard'],
      ['Appointments', 'hospital-dashboard'],
      ['Doctors', 'hospital-dashboard'],
      ['Departments', 'hospital-dashboard'],
      ['Live Queue', 'live-queue'],
      ['Patients', 'hospital-dashboard'],
      ['Beds', 'hospital-dashboard'],
      ['Reports', 'admin-dashboard'],
      ['Settings', 'profile'],
    ];
  }
  return [
    ['Overview', 'admin-dashboard'],
    ['Hospitals', 'admin-hospital-management'],
    ['Doctors', 'admin-dashboard'],
    ['Patients', 'admin-dashboard'],
    ['Reports', 'admin-dashboard'],
    ['Settings', 'profile'],
  ];
}

function topbarContent(role = 'patient') {
  const navItems = getSidebarItems(role);
  const active = window.location.hash.replace('#', '') || 'patient-dashboard';

  const navButtons = navItems.map(([label, route]) => `
    <button class="nav-item ${active === route ? 'active' : ''}" data-route="${route}">${label}</button>
  `).join('');

  const userName = role === 'doctor' ? 'Dr. Priya Sharma' : role === 'admin' ? 'Admin Team' : 'Anurag';

  return `
    <div class="app-shell">
      <aside class="sidebar">
        <div class="logo">
          <div class="logo-mark">✚</div>
          <span>CareConnect</span>
        </div>
        <nav class="side-nav">
          ${navButtons}
        </nav>
        <div class="sidebar-card">
          <strong>Smart Queue</strong><br />
          Digital token tracking reduced waiting time by 42% this week.
        </div>
      </aside>
      <main class="main-panel">
        <div class="topbar">
          <div class="header-search">
            <span>⌕</span>
            <input type="text" value="" placeholder="Search doctors, hospitals, departments..." />
          </div>
          <div class="topbar-actions">
            <button class="icon-button" data-route="notifications">
              🔔
              <span class="badge">3</span>
            </button>
            <div class="user-pill" data-route="profile">
              <div class="avatar">${userName.charAt(0)}</div>
              <div>
                <div style="font-weight:700; font-size:0.9rem;">${userName}</div>
                <div style="font-size:0.75rem; color: var(--muted);">${getCurrentRoleLabel()}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="content-block">
  `;
}

function closeShell() {
  return `</div></main></div><div class="mobile-nav">${mobileNav()}</div>`;
}

function mobileNav() {
  const items = [
    ['Home', 'patient-dashboard'],
    ['Doctors', 'find-doctor'],
    ['Appointments', 'patient-dashboard'],
    ['Queue', 'live-queue'],
    ['Profile', 'profile'],
  ];
  const active = window.location.hash.replace('#', '') || 'patient-dashboard';
  return items.map(([label, route]) => `
    <button class="${active === route ? 'active' : ''}" data-route="${route}">
      <span>${label === 'Home' ? '⌂' : label === 'Doctors' ? '👩‍⚕️' : label === 'Appointments' ? '📅' : label === 'Queue' ? '⏱️' : '👤'}</span>
      <span>${label}</span>
    </button>
  `).join('');
}

function renderLogin() {
  const role = state.role;
  const cards = [
    ['PATIENT', '👤', 'Find doctors, hospitals and manage your healthcare'],
    ['DOCTOR', '🩺', 'Manage appointments, patients and prescriptions'],
    ['HOSPITAL', '🏥', 'Manage departments, doctors and patient queues'],
    ['ADMIN', '🛡️', 'Monitor and manage the healthcare network'],
  ];

  return `
    <div class="auth-page">
      <div class="auth-shell">
        <div class="auth-left">
          <div class="logo">
            <div class="logo-mark">✚</div>
            <span>CareConnect</span>
          </div>
          <h1>Healthcare, connected.</h1>
          <p class="tagline">Find the right doctor, hospital and care — all in one place.</p>
          <div class="role-grid">
            ${cards.map(([name, icon, desc]) => {
              const active = role === name.toLowerCase();
              return `
                <button class="role-card ${active ? 'active' : ''}" data-role="${name.toLowerCase()}">
                  <div class="role-header">
                    <div class="role-icon">${icon}</div>
                    <div class="role-name">${name}</div>
                  </div>
                  <p>${desc}</p>
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <div class="auth-card">
          <h2>Welcome to CareConnect</h2>
          <div class="subtle">Choose how you want to continue</div>
          <div class="form-row">
            <label>Email / Phone</label>
            <input type="text" value="${role === 'patient' ? 'anurag@example.com' : role === 'doctor' ? 'dr.priya@careconnect.com' : role === 'hospital' ? 'admin@janta.hospital' : 'platform@careconnect.com'}" />
          </div>
          <div class="form-row">
            <label>Password</label>
            <input type="password" value="password123" />
          </div>
          <div class="form-inline">
            <div class="check">
              <input type="checkbox" checked />
              <span>Remember me</span>
            </div>
            <a class="link" href="#">Forgot password?</a>
          </div>
          <div class="auth-actions">
            <button class="primary-btn" data-route="${roleRouteFor(role)}">Sign In</button>
            <button class="secondary-btn" data-route="login">Create Account</button>
          </div>
          <div class="demo-link">
            <a href="#" class="link" data-route="patient-dashboard">Continue as Demo</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderPatientDashboard() {
  const doctors = [
    ['Dr. Priya Sharma', 'Gynecologist', 'Janta Hospital', '10+ years experience', '4.8', 'Available Today', '10:30 AM'],
    ['Dr. Amit Verma', 'Cardiologist', 'CarePlus Clinic', '12+ years experience', '4.7', 'Available in 20 min', '11:15 AM'],
    ['Dr. Riya Saini', 'Dermatologist', 'Aarogya Center', '8+ years experience', '4.9', 'Available Today', '09:45 AM'],
    ['Dr. Vikram Singh', 'Orthopedic', 'MediCare Hospital', '15+ years experience', '4.6', 'Available Tomorrow', '09:00 AM'],
  ];

  const hospitals = [
    ['Janta Hospital', 'Sikar, Rajasthan', 'Emergency • Gynecology • General Medicine', '4.5', '2.4 km', 'Open Now'],
    ['CarePlus Clinic', 'Sikar, Rajasthan', 'Cardiology • Pediatrics • Diagnostics', '4.6', '1.9 km', 'Open Now'],
    ['Aarogya Center', 'Sikar, Rajasthan', 'Dermatology • Pharmacy • Lab', '4.4', '3.2 km', 'Open Now'],
  ];

  return `
    ${topbarContent('patient')}
      <div class="hero">
        <h1 class="greeting">Good morning, Anurag</h1>
        <p class="subtitle">How can we help you today?</p>
        <div class="hero-search">
          <span>⌕</span>
          <input type="text" placeholder="Search doctors, hospitals, departments..." />
        </div>
      </div>

      <div class="quick-actions">
        <div class="action-card" data-route="find-doctor">
          <div class="action-icon">👩‍⚕️</div>
          <div class="action-text">Find a Doctor</div>
        </div>
        <div class="action-card" data-route="hospital-details">
          <div class="action-icon">🏥</div>
          <div class="action-text">Find a Hospital</div>
        </div>
        <div class="action-card" data-route="book-appointment">
          <div class="action-icon">📅</div>
          <div class="action-text">Book Appointment</div>
        </div>
        <div class="action-card" data-route="live-queue">
          <div class="action-icon">⏱️</div>
          <div class="action-text">Check Live Queue</div>
        </div>
      </div>

      <div class="section-header">
        <h2 class="section-title">Available Doctors</h2>
        <button class="link-button" data-route="find-doctor">View all</button>
      </div>
      <div class="grid-3">
        ${doctors.map((doc) => `
          <div class="doctor-card">
            <div class="doctor-header">
              <div class="doc-avatar">${doc[0].split(' ').map((s) => s[0]).slice(0, 2).join('')}</div>
              <div>
                <div class="doc-name">${doc[0]}</div>
                <div style="color: var(--muted); font-size: 0.88rem;">${doc[1]}</div>
              </div>
            </div>
            <div class="meta-list">
              <div class="meta-line"><span>🏥 ${doc[2]}</span></div>
              <div class="meta-line"><span>⏳ ${doc[3]}</span></div>
              <div class="meta-line"><span>★ ${doc[4]}</span><span class="status available">${doc[5]}</span></div>
              <div class="meta-line"><span>🕒 Next available</span><strong>${doc[6]}</strong></div>
            </div>
            <div class="card-actions">
              <button class="secondary-btn" data-route="doctor-profile">View Profile</button>
              <button class="primary-btn" data-route="book-appointment">Book Appointment</button>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="section-header">
        <h2 class="section-title">Recommended Hospitals</h2>
        <button class="link-button" data-route="hospital-details">View all</button>
      </div>
      <div class="grid-3">
        ${hospitals.map((hospital) => `
          <div class="hospital-card">
            <div class="hospital-header">
              <div class="doc-avatar">🏥</div>
              <div>
                <div class="hospital-name">${hospital[0]}</div>
                <div style="color: var(--muted); font-size:0.88rem;">${hospital[1]}</div>
              </div>
            </div>
            <div class="meta-list">
              <div class="meta-line"><span>${hospital[2]}</span></div>
              <div class="meta-line"><span>★ ${hospital[3]}</span><span>${hospital[4]}</span></div>
              <div class="meta-line"><span>Open/Closed</span><span class="status open">${hospital[5]}</span></div>
            </div>
            <div class="card-actions">
              <button class="secondary-btn" data-route="hospital-details">View Hospital</button>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="section-header">
        <h2 class="section-title">Upcoming Appointment</h2>
      </div>
      <div class="appointment-card">
        <div>
          <div class="appointment-title">Upcoming Appointment</div>
          <div class="detail-grid">
            <div>Doctor: <strong>Dr. Priya Sharma</strong></div>
            <div>Department: <strong>Gynecology</strong></div>
            <div>Hospital: <strong>Janta Hospital</strong></div>
            <div>Date: <strong>12 September 2026</strong></div>
            <div>Time: <strong>10:30 AM</strong></div>
            <div>Token: <strong>A-24</strong></div>
            <div>Status: <strong><span class="status confirmed">Confirmed</span></strong></div>
          </div>
        </div>
        <div class="card-actions" style="flex-direction:column; align-items:stretch; min-width:180px;">
          <button class="secondary-btn" data-route="book-appointment">View Appointment</button>
          <button class="primary-btn" data-route="live-queue">Track Queue</button>
        </div>
      </div>
    ${closeShell()}
  `;
}

function renderFindDoctor() {
  const doctors = [
    ['Dr. Priya Sharma', 'Gynecologist', 'Janta Hospital', '10+ years', '4.8', 'Today • 10:30 AM'],
    ['Dr. Amit Verma', 'Cardiologist', 'CarePlus Clinic', '12+ years', '4.7', 'Today • 11:15 AM'],
    ['Dr. Riya Saini', 'Dermatologist', 'Aarogya Center', '8+ years', '4.9', 'Today • 09:45 AM'],
    ['Dr. Rahul Mehta', 'General Physician', 'Janta Hospital', '9+ years', '4.6', 'Today • 08:30 AM'],
  ];

  return `
    ${topbarContent('patient')}
      <div class="page">
        <div class="page-header">
          <h1 class="page-title">Find the right doctor</h1>
        </div>
        <div class="header-search" style="max-width:100%; margin-bottom:18px;">
          <span>⌕</span>
          <input type="text" placeholder="Search doctor or specialization" />
        </div>
        <div class="filter-row">
          <button class="filter-chip active">Specialization</button>
          <button class="filter-chip">Hospital</button>
          <button class="filter-chip">Availability</button>
          <button class="filter-chip">Experience</button>
          <button class="filter-chip">Rating</button>
        </div>
        <div class="filter-row">
          <button class="filter-chip active">General Physician</button>
          <button class="filter-chip">Cardiologist</button>
          <button class="filter-chip">Gynecologist</button>
          <button class="filter-chip">Dermatologist</button>
          <button class="filter-chip">Orthopedic</button>
          <button class="filter-chip">Pediatrician</button>
        </div>

        ${doctors.map((doctor) => `
          <div class="list-card">
            <div class="left">
              <div class="profile-avatar">${doctor[0].split(' ').map((s) => s[0]).slice(0, 2).join('')}</div>
              <div>
                <div class="profile-name">${doctor[0]}</div>
                <div class="detail-badges">
                  <span class="badge-pill">${doctor[1]}</span>
                  <span class="badge-pill">${doctor[2]}</span>
                  <span class="badge-pill">${doctor[3]}</span>
                  <span class="badge-pill">★ ${doctor[4]}</span>
                  <span class="badge-pill">${doctor[5]}</span>
                </div>
              </div>
            </div>
            <div class="card-actions">
              <button class="secondary-btn" data-route="doctor-profile">View Profile</button>
              <button class="primary-btn" data-route="book-appointment">Book Appointment</button>
            </div>
          </div>
        `).join('')}
      </div>
    ${closeShell()}
  `;
}

function renderDoctorProfile() {
  return `
    ${topbarContent('patient')}
      <div class="page">
        <div class="doctor-profile-layout">
          <div class="profile-card">
            <div class="doctor-photo">👩‍⚕️</div>
            <div class="profile-name">Dr. Priya Sharma</div>
            <div style="color: var(--muted); font-weight:600; margin:8px 0 14px;">Gynecologist</div>
            <div class="info-stack">
              <div class="info-line"><span>Hospital</span><strong>Janta Hospital</strong></div>
              <div class="info-line"><span>Rating</span><strong>★ 4.8</strong></div>
              <div class="info-line"><span>Experience</span><strong>10+ years</strong></div>
            </div>
            <div class="card-actions" style="margin-top:18px;">
              <button class="primary-btn" data-route="book-appointment">Book Appointment</button>
            </div>
          </div>
          <div class="profile-card">
            <h3 style="margin-top:0;">About Doctor</h3>
            <p style="color:var(--muted); line-height:1.8;">Dr. Priya Sharma is a well-regarded gynecologist specializing in preventive maternal care, fertility guidance, and minimally invasive reproductive health services. She is known for empathetic consultation and evidence-based treatment plans.</p>
            <div class="two-col">
              <div>
                <h4>Education</h4>
                <p style="color: var(--muted);">MBBS, MD (Obstetrics and Gynecology) <br/> AIIMS, New Delhi</p>
              </div>
              <div>
                <h4>Specializations</h4>
                <p style="color: var(--muted);">High-risk Pregnancy Care <br/> Menstrual Disorders <br/> Consultation & Check-ups</p>
              </div>
            </div>
            <div class="two-col" style="margin-top:16px;">
              <div>
                <h4>Languages</h4>
                <p style="color: var(--muted);">Hindi, English, Rajasthani</p>
              </div>
              <div>
                <h4>Consultation Fee</h4>
                <p style="color: var(--muted);">₹900</p>
              </div>
            </div>
            <h4>Available Timings</h4>
            <p style="color: var(--muted);">Mon - Sat | 09:00 AM - 01:00 PM, 04:30 PM - 07:00 PM</p>
            <h4>Available Appointment Slots</h4>
            <div class="slot-list" style="grid-template-columns: repeat(3, minmax(100px, 1fr));">
              <button class="slot selected">09:30 AM</button>
              <button class="slot">10:00 AM</button>
              <button class="slot selected">10:30 AM</button>
              <button class="slot">11:00 AM</button>
              <button class="slot">11:30 AM</button>
              <button class="slot">12:00 PM</button>
            </div>
          </div>
        </div>
      </div>
    ${closeShell()}
  `;
}

function renderBookAppointment() {
  const selected = state.selectedSlot;
  return `
    ${topbarContent('patient')}
      <div class="page">
        <ul class="stepper">
          <li class="step active">1. Doctor</li>
          <li class="step ${state.currentStep === 'date' || state.currentStep === 'confirmation' ? 'active' : ''}">2. Date & Time</li>
          <li class="step ${state.currentStep === 'confirmation' ? 'active' : ''}">3. Confirmation</li>
        </ul>
        <div class="booking-grid">
          <div class="profile-card">
            <h3 style="margin-top:0;">Selected Doctor</h3>
            <div class="doctor-header">
              <div class="doc-avatar">PS</div>
              <div>
                <div class="doc-name">Dr. Priya Sharma</div>
                <div style="color: var(--muted);">Gynecologist • Janta Hospital</div>
              </div>
            </div>
            <div class="calendar" style="margin-top:20px;">
              <div class="day-head">Sun</div>
              <div class="day-head">Mon</div>
              <div class="day-head">Tue</div>
              <div class="day-head">Wed</div>
              <div class="day-head">Thu</div>
              <div class="day-head">Fri</div>
              <div class="day-head">Sat</div>
              <div class="day">8</div>
              <div class="day">9</div>
              <div class="day">10</div>
              <div class="day">11</div>
              <div class="day selected">12</div>
              <div class="day">13</div>
              <div class="day">14</div>
            </div>
            <div style="margin-top:18px;">
              <h4>Available Time Slots</h4>
              <div class="slot-list">
                <button class="slot">09:30 AM</button>
                <button class="slot">10:00 AM</button>
                <button class="slot selected" data-slot="10:30 AM">10:30 AM</button>
                <button class="slot">11:00 AM</button>
                <button class="slot">11:30 AM</button>
                <button class="slot">12:00 PM</button>
              </div>
            </div>
          </div>
          <div class="profile-card">
            <h3 style="margin-top:0;">Appointment Summary</h3>
            <div class="confirm-box">
              <div class="info-line"><span>Appointment type</span><strong>In-person consultation</strong></div>
              <div class="info-line"><span>Hospital</span><strong>Janta Hospital</strong></div>
              <div class="info-line"><span>Doctor</span><strong>Dr. Priya Sharma</strong></div>
              <div class="info-line"><span>Date</span><strong>12 September 2026</strong></div>
              <div class="info-line"><span>Time</span><strong>${selected}</strong></div>
            </div>
            <div class="card-actions" style="margin-top:18px;">
              <button class="primary-btn" data-route="appointment-confirmed">Confirm Appointment</button>
            </div>
          </div>
        </div>
      </div>
    ${closeShell()}
  `;
}

function renderAppointmentConfirmed() {
  return `
    <div class="centered-wrap">
      <div class="confirm-screen">
        <div class="success-icon">✓</div>
        <h2>Appointment Confirmed</h2>
        <div class="detail-grid" style="text-align:left; max-width:420px; margin:0 auto 16px;">
          <div>Doctor: <strong>Dr. Priya Sharma</strong></div>
          <div>Hospital: <strong>Janta Hospital</strong></div>
          <div>Date: <strong>12 September 2026</strong></div>
          <div>Time: <strong>10:30 AM</strong></div>
          <div>Token Number: <strong>A-24</strong></div>
        </div>
        <div class="qr-box">QR</div>
        <div class="card-actions" style="justify-content:center;">
          <button class="secondary-btn" data-route="patient-dashboard">View Appointment</button>
          <button class="primary-btn" data-route="live-queue">Track Live Queue</button>
        </div>
      </div>
    </div>
  `;
}

function renderLiveQueue() {
  return `
    ${topbarContent('patient')}
      <div class="page">
        <div class="page-header">
          <h1 class="page-title">Live Queue</h1>
        </div>
        <div class="queue-layout">
          <div>
            <div class="detail-grid">
              <div>Hospital: <strong>Janta Hospital</strong></div>
              <div>Department: <strong>Gynecology</strong></div>
              <div>Doctor: <strong>Dr. Priya Sharma</strong></div>
            </div>
            <div class="queue-steps">
              <div class="queue-step">A-18</div>
              <div class="queue-step">A-19</div>
              <div class="queue-step">A-20</div>
              <div class="queue-step">A-21</div>
              <div class="queue-step">A-22</div>
              <div class="queue-step">A-23</div>
              <div class="queue-step current">A-18<br/>Current</div>
              <div class="queue-step you">A-24<br/>You</div>
            </div>
            <div class="status available" style="margin: 12px 0; display:inline-flex;">Doctor is currently seeing Token A-18</div>
          </div>
          <div class="queue-summary">
            <div class="metric-card">
              <div style="color: var(--muted);">Current Token</div>
              <div class="metric-number">A-18</div>
            </div>
            <div class="metric-card">
              <div style="color: var(--muted);">Your Token</div>
              <div class="metric-number">A-24</div>
            </div>
            <div class="metric-card">
              <div style="color: var(--muted);">Patients Ahead</div>
              <div class="metric-number">5</div>
            </div>
            <div class="metric-card">
              <div style="color: var(--muted);">Estimated Waiting Time</div>
              <div class="metric-number">25 min</div>
            </div>
            <button class="primary-btn" data-route="patient-dashboard">Notify Me</button>
          </div>
        </div>
      </div>
    ${closeShell()}
  `;
}

function renderHospitalDetails() {
  return `
    ${topbarContent('patient')}
      <div class="page">
        <div class="page-header">
          <div>
            <h1 class="page-title">Janta Hospital</h1>
            <div style="color: var(--muted);">Sikar, Rajasthan</div>
          </div>
          <div class="card-actions">
            <button class="primary-btn" data-route="book-appointment">Book Appointment</button>
            <button class="secondary-btn" data-route="find-doctor">View Doctors</button>
          </div>
        </div>
        <div class="two-col">
          <div class="profile-card">
            <div class="info-stack">
              <div class="info-line"><span>Rating</span><strong>★ 4.5</strong></div>
              <div class="info-line"><span>Emergency availability</span><strong>24/7</strong></div>
              <div class="info-line"><span>Operating hours</span><strong>24 Hours</strong></div>
              <div class="info-line"><span>Contact</span><strong>+91 80000 0001</strong></div>
            </div>
          </div>
          <div class="profile-card">
            <h4>Departments</h4>
            <div class="detail-badges">
              <span class="badge-pill">Emergency</span>
              <span class="badge-pill">Gynecology</span>
              <span class="badge-pill">General Medicine</span>
              <span class="badge-pill">Cardiology</span>
            </div>
            <h4 style="margin-top:20px;">Facilities</h4>
            <div class="detail-badges">
              <span class="badge-pill">ICU</span>
              <span class="badge-pill">Pharmacy</span>
              <span class="badge-pill">Diagnostics</span>
              <span class="badge-pill">Ambulance</span>
            </div>
          </div>
        </div>

        <div class="section-header" style="margin-top:24px;">
          <h2 class="section-title">Available Doctors</h2>
        </div>
        <div class="doctor-grid">
          <div class="profile-card">
            <div class="doctor-header">
              <div class="doc-avatar">PS</div>
              <div>
                <div class="doc-name">Dr. Priya Sharma</div>
                <div style="color: var(--muted);">Gynecologist</div>
              </div>
            </div>
            <div class="card-actions">
              <button class="secondary-btn" data-route="doctor-profile">View</button>
              <button class="primary-btn" data-route="book-appointment">Book</button>
            </div>
          </div>
          <div class="profile-card">
            <div class="doctor-header">
              <div class="doc-avatar">AV</div>
              <div>
                <div class="doc-name">Dr. Amit Verma</div>
                <div style="color: var(--muted);">Cardiologist</div>
              </div>
            </div>
            <div class="card-actions">
              <button class="secondary-btn" data-route="doctor-profile">View</button>
              <button class="primary-btn" data-route="book-appointment">Book</button>
            </div>
          </div>
        </div>

        <div class="section-header" style="margin-top:24px;">
          <h2 class="section-title">Current Queue</h2>
        </div>
        <div class="profile-card">
          <div class="detail-grid">
            <div>Current Token: <strong>A-18</strong></div>
            <div>Average Wait: <strong>25 min</strong></div>
            <div>Emergency Patients: <strong>6</strong></div>
            <div>Department Status: <strong>Active</strong></div>
          </div>
        </div>
      </div>
    ${closeShell()}
  `;
}

function renderMedicalRecords() {
  const records = [
    ['Blood Test', '12 Aug 2026', 'View', 'Download'],
    ['Consultation', '05 Aug 2026', 'View', 'Download'],
    ['Prescription', '05 Aug 2026', 'View', 'Download'],
  ];

  return `
    ${topbarContent('patient')}
      <div class="page">
        <div class="page-header">
          <h1 class="page-title">Medical Records</h1>
        </div>
        <div class="filter-row">
          <button class="filter-chip active">Prescriptions</button>
          <button class="filter-chip">Lab Reports</button>
          <button class="filter-chip">Doctor Notes</button>
          <button class="filter-chip">Previous Visits</button>
        </div>
        <div class="record-list">
          ${records.map((rec) => `
            <div class="record-card">
              <div class="record-left">
                <div class="file-icon">${rec[0].includes('Blood') ? '🧪' : rec[0].includes('Consult') ? '🩺' : '💊'}</div>
                <div>
                  <div class="profile-name" style="font-size:1.05rem;">${rec[0]}</div>
                  <div style="color: var(--muted);">${rec[1]}</div>
                </div>
              </div>
              <div class="card-actions">
                <button class="small-btn" data-route="ai-report-summary">${rec[2]}</button>
                <button class="small-btn" data-route="ai-report-summary">${rec[3]}</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    ${closeShell()}
  `;
}

function renderAiReportSummary() {
  return `
    ${topbarContent('patient')}
      <div class="page">
        <div class="page-header">
          <h1 class="page-title">AI Report Summary</h1>
        </div>
        <div class="report-box">
          <h3>Blood Test Report</h3>
          <div style="color: var(--muted); margin-bottom:18px;">Uploaded on 12 Aug 2026</div>
          <h4>AI Summary</h4>
          <p class="ai-summary">Your hemoglobin level is within the normal range. The report indicates stable overall blood health and no signs of acute anemia. Vitamin D appears slightly below the reference range and may benefit from routine monitoring.</p>
          <h4>Important Findings</h4>
          <div class="detail-grid">
            <div>Normal: <strong>Hemoglobin</strong></div>
            <div>Attention: <strong>Vitamin D</strong></div>
          </div>
          <div style="margin-top:18px; background: var(--panel); border:1px solid var(--line); border-radius:12px; padding:14px; color: var(--muted);">
            <strong>Recommendation:</strong> Discuss the result with your doctor before making any medical decisions.
          </div>
          <div style="margin-top:18px; font-size:0.9rem; color: var(--muted);">AI-generated summary is for informational purposes and does not replace professional medical advice.</div>
        </div>
      </div>
    ${closeShell()}
  `;
}

function renderDigitalPrescription() {
  return `
    ${topbarContent('patient')}
      <div class="page">
        <div class="page-header">
          <h1 class="page-title">Digital Prescription</h1>
        </div>
        <div class="profile-card">
          <div class="detail-grid">
            <div>Doctor: <strong>Dr. Priya Sharma</strong></div>
            <div>Patient: <strong>Anurag</strong></div>
            <div>Date: <strong>12 September 2026</strong></div>
            <div>Diagnosis: <strong>Vitamin D deficiency</strong></div>
          </div>
          <table class="table" style="margin-top:18px;">
            <thead>
              <tr>
                <th>Medicine</th>
                <th>Dosage</th>
                <th>Frequency</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Vitamin D3</td>
                <td>60,000 IU</td>
                <td>Once a week</td>
                <td>8 weeks</td>
              </tr>
              <tr>
                <td>Omega 3</td>
                <td>1 capsule</td>
                <td>Daily</td>
                <td>30 days</td>
              </tr>
            </tbody>
          </table>
          <div class="card-actions" style="margin-top:18px;">
            <button class="primary-btn">Download Prescription</button>
            <button class="secondary-btn">Share with Hospital</button>
          </div>
        </div>
      </div>
    ${closeShell()}
  `;
}

function renderEmergency() {
  return `
    ${topbarContent('patient')}
      <div class="page">
        <div class="page-header">
          <h1 class="page-title">Emergency Assistance</h1>
        </div>
        <button class="emergency-button">GET EMERGENCY HELP</button>
        <div class="two-col" style="margin-top:20px;">
          <div class="emergency-card">
            <h3>Nearest Hospitals</h3>
            <div class="detail-grid">
              <div>Janta Hospital <strong>2.4 km</strong></div>
              <div>CarePlus Clinic <strong>1.9 km</strong></div>
            </div>
          </div>
          <div class="emergency-card">
            <h3>Ambulance</h3>
            <div class="info-line"><span>Ambulance ETA</span><strong>6 min</strong></div>
          </div>
        </div>
        <div class="two-col" style="margin-top:18px;">
          <div class="emergency-card">
            <h3>Emergency Departments</h3>
            <div class="detail-badges">
              <span class="badge-pill">ER</span>
              <span class="badge-pill">Trauma</span>
              <span class="badge-pill">ICU</span>
            </div>
          </div>
          <div class="emergency-card">
            <h3>Emergency Contacts</h3>
            <div class="info-line"><span>National</span><strong>112</strong></div>
            <div class="info-line"><span>Hospital</span><strong>+91 80000 0001</strong></div>
          </div>
        </div>
      </div>
    ${closeShell()}
  `;
}

function renderDoctorDashboard() {
  return `
    ${topbarContent('doctor')}
      <div class="page">
        <div class="page-header">
          <div>
            <h1 class="page-title">CareConnect</h1>
            <div style="color: var(--muted);">Dr. Priya Sharma • Gynecologist</div>
          </div>
        </div>
        <div class="metrics-grid">
          <div class="metric-card"><div style="color: var(--muted);">Today's Appointments</div><div class="metric-number">24</div></div>
          <div class="metric-card"><div style="color: var(--muted);">Waiting Patients</div><div class="metric-number">7</div></div>
          <div class="metric-card"><div style="color: var(--muted);">Completed</div><div class="metric-number">16</div></div>
          <div class="metric-card"><div style="color: var(--muted);">Next Patient</div><div class="metric-number">A-18</div></div>
        </div>

        <div class="section-header" style="margin-top:20px;">
          <h2 class="section-title">Today's Appointments</h2>
        </div>
        <div class="table-wrap">
          <table class="table">
            <thead>
              <tr>
                <th>Token</th>
                <th>Patient</th>
                <th>Time</th>
                <th>Type</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>A-18</td>
                <td>Patient 1</td>
                <td>10:00</td>
                <td>In-person</td>
                <td><span class="status waiting">Waiting</span></td>
                <td><button class="primary-btn" data-route="doctor-patient-detail">Start Consultation</button></td>
              </tr>
              <tr>
                <td>A-19</td>
                <td>Patient 2</td>
                <td>10:15</td>
                <td>In-person</td>
                <td><span class="status waiting">Waiting</span></td>
                <td><button class="secondary-btn" data-route="doctor-patient-detail">View Patient</button></td>
              </tr>
              <tr>
                <td>A-20</td>
                <td>Patient 3</td>
                <td>10:30</td>
                <td>In-person</td>
                <td><span class="status confirmed">Confirmed</span></td>
                <td><button class="secondary-btn" data-route="doctor-patient-detail">View Patient</button></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="section-header" style="margin-top:20px;">
          <h2 class="section-title">Live Queue</h2>
        </div>
        <div class="profile-card">
          <div class="detail-grid">
            <div>Current Patient: <strong>Token A-18</strong></div>
            <div>Next Patient: <strong>Token A-19</strong></div>
          </div>
          <div class="card-actions" style="margin-top:16px;">
            <button class="primary-btn">Call Next Patient</button>
          </div>
        </div>
      </div>
    ${closeShell()}
  `;
}

function renderDoctorPatientDetail() {
  return `
    ${topbarContent('doctor')}
      <div class="page">
        <div class="page-header">
          <h1 class="page-title">Patient Profile</h1>
        </div>
        <div class="two-col">
          <div class="profile-card">
            <div class="doctor-header">
              <div class="profile-avatar">P1</div>
              <div>
                <div class="profile-name">Patient 1</div>
                <div style="color: var(--muted);">Age 30 • Female • O+</div>
              </div>
            </div>
            <div class="info-stack">
              <div class="info-line"><span>Blood group</span><strong>O+</strong></div>
              <div class="info-line"><span>Emergency contact</span><strong>+91 90000 1111</strong></div>
            </div>
          </div>
          <div class="profile-card">
            <h4>Previous visits</h4>
            <p style="color: var(--muted);">08 Apr 2026 • Consultation <br/> 12 Jun 2026 • Follow-up</p>
            <h4>Medical history</h4>
            <p style="color: var(--muted);">Seasonal allergies, mild anemia</p>
            <h4>Lab reports</h4>
            <p style="color: var(--muted);">CBC report reviewed on 10 Aug 2026</p>
            <h4>Prescriptions</h4>
            <p style="color: var(--muted);">Vitamin D3, Omega 3</p>
          </div>
        </div>
        <div class="card-actions" style="margin-top:20px;">
          <button class="primary-btn" data-route="digital-prescription">Create Prescription</button>
          <button class="secondary-btn">Add Consultation Notes</button>
        </div>
      </div>
    ${closeShell()}
  `;
}

function renderHospitalDashboard() {
  return `
    ${topbarContent('hospital')}
      <div class="page">
        <div class="page-header">
          <div>
            <h1 class="page-title">Janta Hospital</h1>
            <div style="color: var(--muted);">Hospital Dashboard</div>
          </div>
        </div>
        <div class="metrics-grid">
          <div class="metric-card"><div style="color: var(--muted);">Today's Patients</div><div class="metric-number">186</div></div>
          <div class="metric-card"><div style="color: var(--muted);">Appointments</div><div class="metric-number">64</div></div>
          <div class="metric-card"><div style="color: var(--muted);">Doctors Available</div><div class="metric-number">28</div></div>
          <div class="metric-card"><div style="color: var(--muted);">Emergency Beds</div><div class="metric-number">6</div></div>
        </div>

        <div class="section-header" style="margin-top:20px;">
          <h2 class="section-title">Live Department Queue</h2>
        </div>
        <div class="two-col">
          <div class="profile-card">
            <div class="info-line"><span>Gynecology</span><strong>18 waiting</strong></div>
            <div class="info-line"><span>Cardiology</span><strong>9 waiting</strong></div>
            <div class="info-line"><span>General Medicine</span><strong>24 waiting</strong></div>
            <div class="info-line"><span>Emergency</span><strong>6 patients</strong></div>
          </div>
          <div class="profile-card">
            <h4>Doctors</h4>
            <div class="info-line"><span>Dr. Priya Sharma</span><strong>Available</strong></div>
            <div class="info-line"><span>Dr. Amit Verma</span><strong>Busy</strong></div>
            <div class="info-line"><span>Dr. Rahul Mehta</span><strong>Available</strong></div>
          </div>
        </div>

        <div class="section-header" style="margin-top:20px;">
          <h2 class="section-title">Hospital Appointments</h2>
        </div>
        <div class="table-wrap">
          <table class="table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Patient 1</td><td>Dr. Priya Sharma</td><td>Gynecology</td><td>10:00</td><td><span class="status waiting">Waiting</span></td></tr>
              <tr><td>Patient 2</td><td>Dr. Amit Verma</td><td>Cardiology</td><td>10:15</td><td><span class="status confirmed">Confirmed</span></td></tr>
              <tr><td>Patient 3</td><td>Dr. Rahul Mehta</td><td>General Medicine</td><td>10:30</td><td><span class="status waiting">Waiting</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    ${closeShell()}
  `;
}

function renderAdminDashboard() {
  return `
    ${topbarContent('admin')}
      <div class="page">
        <div class="page-header">
          <h1 class="page-title">Admin Dashboard</h1>
        </div>
        <div class="metrics-grid">
          <div class="metric-card"><div style="color: var(--muted);">Total Patients</div><div class="metric-number">12,540</div></div>
          <div class="metric-card"><div style="color: var(--muted);">Doctors</div><div class="metric-number">842</div></div>
          <div class="metric-card"><div style="color: var(--muted);">Hospitals</div><div class="metric-number">56</div></div>
          <div class="metric-card"><div style="color: var(--muted);">Appointments Today</div><div class="metric-number">2,430</div></div>
        </div>

        <div class="section-header" style="margin-top:20px;">
          <h2 class="section-title">Hospital Network</h2>
        </div>
        <div class="table-wrap">
          <table class="table">
            <thead>
              <tr>
                <th>Hospital</th>
                <th>City</th>
                <th>Doctors</th>
                <th>Patients</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Janta Hospital</td><td>Sikar</td><td>28</td><td>5240</td><td><span class="status verified">Verified</span></td></tr>
              <tr><td>CarePlus Clinic</td><td>Sikar</td><td>14</td><td>1980</td><td><span class="status verified">Verified</span></td></tr>
              <tr><td>Rajasthan Care</td><td>Jaipur</td><td>20</td><td>2600</td><td><span class="status pending">Pending</span></td></tr>
            </tbody>
          </table>
        </div>

        <div class="section-header" style="margin-top:20px;">
          <h2 class="section-title">Platform Analytics</h2>
        </div>
        <div class="two-col">
          <div class="profile-card">
            <h4>Appointments</h4>
            <div style="height:120px; border-radius:12px; background: linear-gradient(180deg, #eaf1ff 0%, #dfeeff 100%); display:flex; align-items:flex-end; gap:12px; padding:16px 20px;">
              <div style="width:20%; height:45%; background: var(--primary); border-radius:8px 8px 0 0;"></div>
              <div style="width:20%; height:65%; background: var(--primary); border-radius:8px 8px 0 0;"></div>
              <div style="width:20%; height:55%; background: var(--primary); border-radius:8px 8px 0 0;"></div>
              <div style="width:20%; height:80%; background: var(--primary); border-radius:8px 8px 0 0;"></div>
            </div>
          </div>
          <div class="profile-card">
            <h4>Doctor Activity</h4>
            <div class="info-line"><span>Appointments</span><strong>68%</strong></div>
            <div class="info-line"><span>Patient registrations</span><strong>42%</strong></div>
            <div class="info-line"><span>Hospital activity</span><strong>59%</strong></div>
          </div>
        </div>
      </div>
    ${closeShell()}
  `;
}

function renderAdminHospitalManagement() {
  return `
    ${topbarContent('admin')}
      <div class="page">
        <div class="page-header">
          <h1 class="page-title">Hospital Management</h1>
        </div>
        <div class="table-wrap">
          <table class="table">
            <thead>
              <tr>
                <th>Hospital</th>
                <th>Location</th>
                <th>Departments</th>
                <th>Doctors</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Janta Hospital</td>
                <td>Sikar, Rajasthan</td>
                <td>8</td>
                <td>28</td>
                <td><span class="status verified">Verified</span></td>
                <td><button class="small-btn" data-route="hospital-dashboard">View</button></td>
              </tr>
              <tr>
                <td>CarePlus Clinic</td>
                <td>Sikar, Rajasthan</td>
                <td>5</td>
                <td>14</td>
                <td><span class="status pending">Pending</span></td>
                <td><button class="small-btn">Approve</button></td>
              </tr>
              <tr>
                <td>Rajasthan Care</td>
                <td>Jaipur</td>
                <td>6</td>
                <td>11</td>
                <td><span class="status suspended">Suspended</span></td>
                <td><button class="small-btn">Manage</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    ${closeShell()}
  `;
}

function renderNotifications() {
  return `
    ${topbarContent('patient')}
      <div class="page">
        <div class="page-header">
          <h1 class="page-title">Notifications</h1>
        </div>
        <div class="record-list">
          <div class="record-card">
            <div class="record-left"><div class="file-icon">✓</div><div> Your appointment with Dr. Priya Sharma is confirmed.</div></div>
          </div>
          <div class="record-card">
            <div class="record-left"><div class="file-icon">⏱️</div><div> Your queue has moved to Token A-21.</div></div>
          </div>
          <div class="record-card">
            <div class="record-left"><div class="file-icon">🧪</div><div> Your lab report is now available.</div></div>
          </div>
          <div class="record-card">
            <div class="record-left"><div class="file-icon">📅</div><div> Appointment reminder: Tomorrow at 10:30 AM.</div></div>
          </div>
        </div>
      </div>
    ${closeShell()}
  `;
}

function renderProfile() {
  return `
    ${topbarContent('patient')}
      <div class="page">
        <div class="page-header">
          <h1 class="page-title">Profile</h1>
        </div>
        <div class="two-col">
          <div class="profile-card">
            <div class="doctor-header">
              <div class="avatar" style="width:58px; height:58px; border-radius:16px;">A</div>
              <div>
                <div class="profile-name">Anurag</div>
                <div style="color: var(--muted);">Patient profile</div>
              </div>
            </div>
            <div class="info-stack">
              <div class="info-line"><span>Phone</span><strong>+91 98765 43210</strong></div>
              <div class="info-line"><span>Email</span><strong>anurag@example.com</strong></div>
              <div class="info-line"><span>Age</span><strong>28</strong></div>
              <div class="info-line"><span>Gender</span><strong>Male</strong></div>
              <div class="info-line"><span>Blood group</span><strong>O+</strong></div>
              <div class="info-line"><span>Emergency contact</span><strong>+91 80000 0000</strong></div>
            </div>
          </div>
          <div class="profile-card">
            <div class="info-stack">
              <button class="secondary-btn" data-route="patient-dashboard">Edit Profile</button>
              <button class="small-btn">Privacy</button>
              <button class="small-btn" data-route="notifications">Notifications</button>
              <button class="ghost-btn" data-route="login">Logout</button>
            </div>
          </div>
        </div>
      </div>
    ${closeShell()}
  `;
}

document.addEventListener('click', (event) => {
  const routeTarget = event.target.closest('[data-route]');
  if (routeTarget) {
    const route = routeTarget.dataset.route;
    if (route === 'login') {
      state.role = 'patient';
    }
    navigate(route);
    return;
  }

  const roleTarget = event.target.closest('[data-role]');
  if (roleTarget) {
    state.role = roleTarget.dataset.role;
    render();
  }

  const slotTarget = event.target.closest('[data-slot]');
  if (slotTarget) {
    state.selectedSlot = slotTarget.dataset.slot;
    render();
  }
});

window.addEventListener('hashchange', render);
render();
