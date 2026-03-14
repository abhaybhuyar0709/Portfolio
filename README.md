# Portfolio + ResumeAI – Intelligent Resume Analysis System

A static front-end project built with **HTML, Vanilla CSS, JavaScript, and Chart.js**.

🔗 **Live site:** https://abhaybhuyar0709.github.io/Portfolio/

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

## How to check / verify the project

### 1 – Prerequisites

```bash
node -v   # v18 or later recommended
npm -v    # v9 or later recommended
```

### 2 – Install dev tools

```bash
npm install
```

This installs two dev-only tools (nothing is bundled into the site):

| Package | Purpose |
|---------|---------|
| `html-validate` | Validates every HTML file for errors |
| `serve` | Serves the site locally so you can preview it |

### 3 – Validate HTML (check the project is correct)

```bash
npm test
# or explicitly:
npm run validate
```

Expected output when everything is correct:

```
(no output)   ← exit code 0 means all pages passed
```

If there are HTML errors you will see them listed with file name, line number, and a description.

### 4 – Preview the site locally

```bash
npm start
```

Then open **http://localhost:3000** in your browser.
Navigate to any page (e.g. `http://localhost:3000/resumeai.html`) to preview it.

### 5 – Live production site

The site is automatically deployed via **GitHub Pages** whenever commits are pushed to the `main` branch.
Visit https://abhaybhuyar0709.github.io/Portfolio/ to see the production version.

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
├── chart.min.js        # Chart.js (bundled, no CDN needed)
├── package.json        # npm scripts for validate & serve
└── .htmlvalidate.json  # HTML validation config
```
