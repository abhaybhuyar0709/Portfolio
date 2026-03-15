# Portfolio + ResumeAI – Intelligent Resume Analysis System

A static front-end project built with **HTML, Vanilla CSS, JavaScript, and Chart.js**.

🔗 **Live site:** https://abhaybhuyar0709.github.io/Portfolio/

[![Deploy to GitHub Pages](https://github.com/abhaybhuyar0709/Portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/abhaybhuyar0709/Portfolio/actions/workflows/deploy.yml)

---

## ⚡ Quickest way to see the preview

> **No install needed** — just open the live deployment:
>
> 👉 **https://abhaybhuyar0709.github.io/Portfolio/**

Every time code is pushed to `main`, GitHub Actions automatically rebuilds and publishes the site at that URL.

---

## 🖥️ Run on a server (get a live preview URL)

### Method A — Docker (recommended for any server)

Works on any Linux/Mac/Windows server that has [Docker](https://docs.docker.com/get-docker/) installed. No Node.js required.

```bash
# 1. Clone the repo
git clone https://github.com/abhaybhuyar0709/Portfolio.git
cd Portfolio

# 2. Build and start (one command)
docker compose up -d

# 3. Open in your browser
#    - Local machine : http://localhost:3000
#    - Remote server : http://<your-server-ip>:3000
```

To stop: `docker compose down`

---

### Method B — Node.js on a server (VPS / cloud VM)

Requires [Node.js 18+](https://nodejs.org/).

```bash
# 1. Clone the repo
git clone https://github.com/abhaybhuyar0709/Portfolio.git
cd Portfolio

# 2. Install tools (once)
npm install

# 3. Start server — binds to ALL network interfaces (0.0.0.0:3000)
npm run serve:remote
```

The site is now accessible at:
- **http://localhost:3000** (from the same machine)
- **http://\<your-server-ip\>:3000** (from any device on the internet)

> **Firewall tip:** Make sure port 3000 is open in your server's firewall / security-group rules.

---

## 💻 Run locally (on your own computer)

### Option 1 — Open directly in a browser (zero setup)

Just double-click `index.html` to open it in your browser.  
No server or installation needed for basic browsing.

### Option 2 — Hot-reload dev server (recommended for development)

```bash
npm install      # once
npm run dev      # opens http://localhost:3000 — auto-refreshes on save
```

### Option 3 — Static server (production-like preview)

```bash
npm install      # once
npm start        # http://localhost:3000
```

---

## 📸 Page previews

### Portfolio Home (`index.html`)
![Portfolio Home](screenshots/index.png)

### ResumeAI Landing (`resumeai.html`)
![ResumeAI Landing](screenshots/resumeai.png)

### Dashboard (`dashboard.html`)
![Dashboard](screenshots/dashboard.png)

### Resume Upload (`upload.html`)
![Resume Upload](screenshots/upload.png)

### Job Market Insights (`insights.html`)
![Job Market Insights](screenshots/insights.png)

### Learning Recommendations (`learning.html`)
![Learning Paths](screenshots/learning.png)

### Recruiter Portal (`recruiter.html`)
![Recruiter Portal](screenshots/recruiter.png)

---

## Pages

| Page | File | Description |
|------|------|-------------|
| Portfolio Home | `index.html` | Personal portfolio landing page |
| ResumeAI Home | `resumeai.html` | AI resume analysis landing page |
| Dashboard | `dashboard.html` | User career-progress dashboard |
| Resume Upload | `upload.html` | Drag-and-drop resume upload + analysis |
| Learning Recommendations | `learning.html` | Courses, certifications & learning paths |
| Job Market Insights | `insights.html` | Trending skills & industry data |
| Recruiter Portal | `recruiter.html` | Search & evaluate candidate profiles |

---

## Validate HTML

```bash
npm install      # only needed once
npm test         # validates all HTML pages — exit code 0 means all passed
```

---

## Project structure

```
Portfolio/
├── index.html          # Portfolio landing page
├── resumeai.html       # ResumeAI landing page
├── dashboard.html      # User dashboard
├── upload.html         # Resume upload page
├── learning.html       # Learning recommendations
├── insights.html       # Job market insights
├── recruiter.html      # Recruiter portal
├── style.css           # Portfolio styles
├── resumeai.css        # ResumeAI shared styles
├── script.js           # Portfolio scripts
├── resumeai.js         # ResumeAI shared scripts
├── chart.min.js        # Chart.js (bundled locally)
├── Dockerfile          # nginx container — docker compose up
├── docker-compose.yml  # One-command server deployment
├── screenshots/        # Page preview screenshots
├── package.json        # npm scripts (start / serve:remote / dev / test)
├── .htmlvalidate.json  # HTML validation config
└── .github/
    └── workflows/
        └── deploy.yml  # GitHub Actions → GitHub Pages auto-deploy
```
