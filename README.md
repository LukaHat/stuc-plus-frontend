# Stuc Plus frontend

A **Vite + React** application that helps you manage your stutend jobs and career progress in one place. You can create, edit, view, and delete jobs, export your CV, and track everything in a dashboard.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/)

### Installation

Clone the repository and install dependencies:

```bash
git clone [https://github.com/your-username/job-tracker-app.git](https://github.com/your-username/job-tracker-app.git)
cd job-tracker-app
npm install
Development
Run the app locally:


npm run dev
Then open your browser at http://localhost:5173.

Build for Production


npm run build
npm run preview
```

🔑 Authentication
Users need to sign up or log in before accessing the app.

Authentication ensures your job data and CV exports are private.

📌 Features

1. Dashboard
   Get a quick overview of all your job entries.

View stats and insights at a glance.

2. Jobs Management
   Add Job – Create a new job entry with details like title, company, location, and description.

Edit Job – Update job details whenever needed.

View Job – Check details of a specific job.

Delete Job – Remove a job entry if no longer relevant.

View Job Details – Expand a job entry to see full information.

3. CV Export
   Export your job history into a CV format (PDF/Docx depending on setup).

Perfect for keeping your CV up to date automatically.

4. Job Entries
   Add multiple entries to track job history, interviews, and progress.

Keep everything organized in one place.

📂 Project Structure

```bash

src/
  components/    # Reusable UI components
  pages/         # App pages (Dashboard, Jobs, Auth, etc.)
  hooks/         # Custom React hooks
  utils/         # Helpers and utilities
```

⚙️ Tech Stack
Vite – Fast build tool

React – Frontend framework

React Router – Routing

React Query – Data fetching

🛡️ Notes
All job data is tied to your account.

Deleting a job is permanent.

Exported CVs are generated from your stored job data.

✅ Roadmap
Add filtering & search for jobs

Support for multiple CV templates

Calendar integration for interviews

Mobile-first optimizations

📄 License
MIT License – feel free to use and modify.
