# College Connect

> A comprehensive web-based platform for college management and communication — bridging students and administrators with an intuitive interface for academic management.

**Live Demo (GitHub Pages):** [https://priyankagnanam.github.io/college_connect_web_portal/](https://priyankagnanam.github.io/college_connect_web_portal/)

**Live Demo (Netlify):** [https://college-connect-web-portal.netlify.app/](https://college-connect-web-portal.netlify.app/)

**Repository:** [github.com/Priyankagnanam/college_connect_web_portal](https://github.com/Priyankagnanam/college_connect_web_portal)

---

## 📋 Table of Contents

- [Features](#-features)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [User Roles](#-user-roles)
- [Technologies Used](#-technologies-used)
- [File Descriptions](#-file-descriptions)
- [Security Notes](#-security-notes)
- [Responsive Design](#-responsive-design)
- [Future Enhancements](#-future-enhancements)

## ✨ Features

### For Students
- **View Academic Records** – Access marks and course information
- **Attendance Tracking** – Check attendance records and statistics
- **Notes & Materials** – Download course materials and lecture notes
- **Leave Management** – Submit leave requests and track status in real time
- **Announcements** – Receive and view important college announcements
- **Responsive Dashboard** – Modern, easy-to-navigate interface

### For Administrators
- **Announcements** – Post college-wide announcements
- **Attendance Management** – Bulk upload student attendance records
- **Marks Management** – Bulk upload and maintain grade records
- **Course Materials** – Publish lecture notes and study links
- **Leave Approval** – Review, approve, or reject leave requests
- **Admin Dashboard** – Central management console

### Leave Workflow (Admin Tools)
- **Manage Leave** – Review all pending requests and update statuses
- **Advisor Leave Tracking** – Dedicated view for monitoring leave requests

## 📁 Project Structure

```
college_connect_web_portal/
├── index.html                 # Homepage
├── login.html                 # Authentication page
├── register.html              # User registration
├── css/
│   └── modern-ui.css          # Main stylesheet (glass-morphism, responsive)
├── js/
│   ├── auth.js                # Authentication and authorization logic
│   ├── firebase-config.js     # Firebase configuration and initialization
│   └── ui.js                  # UI interactions and DOM manipulation
├── admin/                     # Administrator dashboard
│   ├── index.html             # Admin home dashboard
│   ├── manage-leave.html      # Leave management interface
│   ├── advisor-leave.html     # Advisor leave tracking
│   ├── post-announcement.html # Announcement posting
│   ├── upload-attendance.html # Attendance upload
│   ├── upload-marks.html      # Marks upload
│   └── upload-notes.html      # Course notes upload
└── student/                   # Student portal
    ├── index.html             # Student dashboard
    ├── view-marks.html        # View grades
    ├── attendance.html        # Attendance records
    ├── view-notes.html        # Download materials
    ├── leave-request.html     # Submit leave request
    ├── leave-status.html      # Check leave status
    ├── announcements.html     # View announcements
    └── firebase-messaging-sw.js # Push notification support
```

## 🔧 Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for Firebase services and CDN assets)
- No backend server required — the app runs on Firebase Realtime Database

## 📥 Installation

Clone the repository:

```bash
git clone https://github.com/Priyankagnanam/college_connect_web_portal.git
cd college_connect_web_portal
```

Open the application:

- Open `index.html` directly in your browser, **or**
- Serve it locally:

```bash
python -m http.server 8000
# Then visit http://localhost:8000
```

No build step or package installation is required. Assets are loaded from CDNs (Font Awesome, Google Fonts, Firebase SDK).

## ⚙️ Configuration

### Firebase Setup

The application uses one shared Firebase app from `js/firebase-config.js`. The web configuration is public application configuration; access control is enforced by Firebase Authentication and Realtime Database rules.

| Setting | Value |
| --- | --- |
| Project ID | `college-connect-ece97` |
| Realtime Database | `college-connect-ece97-default-rtdb` |
| Notes storage | Google Drive links (no storage bucket required) |
| Messaging | Firebase Cloud Messaging (push notifications) |

### Required Firebase Setup

1. Enable **Authentication > Sign-in method > Email/Password** in the Firebase console.
2. Deploy `database.rules.json` using the Firebase CLI or the Firebase console.
3. Create the first administrator in Firebase Authentication, then add its UID under `admins/<uid>` with value `true`. Also create the matching administrator profile under `profiles/<uid>` with `role: "admin"`, plus matching `users` and `loginDirectory` records. Use the normalized database key in `id` and the display roll number in `rollNumber`.
4. Add the GitHub Pages domain to **Firebase Authentication > Authorized domains** (for the live deployment).

Password recovery uses Firebase Authentication's email reset. The application does not generate client-side OTPs or store passwords in the Realtime Database.

## 🚀 Usage

### For Students
1. **Login/Register** – Create an account or log in with your ID and password
2. **Dashboard** – Quick access to all features
3. **View Marks** – Check grades and academic progress
4. **Track Attendance** – Monitor your attendance percentage
5. **Download Notes** – Access course materials
6. **Submit Leave** – Request leave through the approval workflow
7. **View Announcements** – Stay updated on college news
8. **Reset Password** – Use *Forgot Password?* with your student ID or email

### For Administrators
1. Log in with admin credentials
2. **Dashboard** – Access all management features
3. **Post Announcements** – Share important updates
4. **Upload Attendance** – Bulk upload attendance records
5. **Upload Marks** – Bulk upload grade records
6. **Upload Notes** – Publish course materials
7. **Manage Leave** – Review and process leave requests

## 👥 User Roles

| Role | Access Level | Key Functions |
| --- | --- | --- |
| Student | Limited | View marks, attendance, notes; submit leave; view announcements |
| Administrator | Full | Upload marks/attendance/notes; post announcements; manage leave; manage users |

## 🛠️ Technologies Used

| Layer | Technology |
| --- | --- |
| Frontend | HTML5, CSS3, JavaScript (ES6+) |
| Backend | Firebase Realtime Database |
| Authentication | Firebase Authentication |
| Notifications | Firebase Cloud Messaging |
| UI | Custom modern CSS with glass-morphism design |
| Icons | Font Awesome |
| Fonts | Google Fonts (Inter family) |
| Deployment | GitHub Pages (GitHub Actions) |

## 📄 File Descriptions

### HTML Files

| File | Purpose |
| --- | --- |
| `index.html` | Landing page with navigation and welcome screen |
| `login.html` | User authentication interface |
| `register.html` | User registration form |
| `admin/index.html` | Admin dashboard hub |
| `student/index.html` | Student dashboard hub |

### JavaScript Files

| File | Purpose |
| --- | --- |
| `js/auth.js` | Login, registration, session management, and password reset |
| `js/firebase-config.js` | Firebase initialization and configuration |
| `js/ui.js` | DOM manipulation and UI interactions |

### CSS Files

| File | Purpose |
| --- | --- |
| `css/modern-ui.css` | Global styles, glass-morphism effects, responsive design |

## 🔐 Security Notes

- Access control is enforced by **Firebase Realtime Database security rules** (role-based read/write per node)
- Passwords are never stored in the database — only managed by Firebase Authentication
- Firestore/Database rules must be deployed with any structural change
- Keep the web configuration public (it is safe) and never commit service-account or admin credentials

## 📱 Responsive Design

The application is fully responsive and works on:

- Desktop browsers (1920px and above)
- Tablets (768px – 1024px)
- Mobile devices (320px – 767px)

## 🚀 Future Enhancements

- Real-time notifications for leave approvals
- Advanced analytics dashboard
- Mobile app (React Native / Flutter)
- Multi-language support
- Offline functionality (PWA)

## 📞 Support

For issues, questions, or feature requests, please create an issue in the [repository](https://github.com/Priyankagnanam/college_connect_web_portal/issues).

---

**Last Updated:** August 2026  
**Version:** 1.1.0