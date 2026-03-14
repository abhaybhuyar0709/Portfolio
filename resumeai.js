/* ResumeAI – Shared JavaScript */

// ========================
// PARTICLE BACKGROUND
// ========================
function initParticles(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 1.5 + 0.5
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.fillStyle = 'rgba(99,102,241,0.6)';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[j].x - p.x;
        const dy = particles[j].y - p.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 130) {
          ctx.strokeStyle = `rgba(99,102,241,${(1 - d / 130) * 0.3})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    });
    requestAnimationFrame(draw);
  }
  draw();
}

// ========================
// SIDEBAR TOGGLE
// ========================
function initSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const toggleBtn = document.getElementById('sidebarToggle');

  if (!sidebar) return;

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      overlay && overlay.classList.toggle('active');
    });
  }

  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
    });
  }
}

// ========================
// ANIMATED NUMBERS
// ========================
function animateNumber(el, target, duration = 1500, suffix = '') {
  const start = 0;
  const startTime = performance.now();
  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(start + (target - start) * eased) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

function initAnimatedNumbers() {
  const els = document.querySelectorAll('[data-count]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        const target = parseInt(entry.target.dataset.count, 10);
        const suffix = entry.target.dataset.suffix || '';
        animateNumber(entry.target, target, 1500, suffix);
      }
    });
  }, { threshold: 0.5 });
  els.forEach(el => observer.observe(el));
}

// ========================
// SCORE RING (SVG)
// ========================
function drawScoreRing(canvasId, score, color = '#6366f1', trackColor = 'rgba(255,255,255,0.06)') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const r = Math.min(cx, cy) - 10;
  const start = -Math.PI / 2;
  const end = start + (2 * Math.PI * score / 100);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Track
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, 2 * Math.PI);
  ctx.strokeStyle = trackColor;
  ctx.lineWidth = 10;
  ctx.lineCap = 'round';
  ctx.stroke();
  // Fill
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, '#6366f1');
  gradient.addColorStop(1, '#8b5cf6');
  ctx.beginPath();
  ctx.arc(cx, cy, r, start, end);
  ctx.strokeStyle = gradient;
  ctx.lineWidth = 10;
  ctx.lineCap = 'round';
  ctx.stroke();
}

// ========================
// PROGRESS BARS ANIMATION
// ========================
function initProgressBars() {
  const bars = document.querySelectorAll('.progress-fill[data-width]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width + '%';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(bar => {
    bar.style.width = '0%';
    observer.observe(bar);
  });
}

// ========================
// UPLOAD ZONE
// ========================
function initUploadZone() {
  const zone = document.getElementById('uploadZone');
  const fileInput = document.getElementById('resumeFile');
  if (!zone) return;

  zone.addEventListener('click', () => fileInput && fileInput.click());

  zone.addEventListener('dragover', (e) => {
    e.preventDefault();
    zone.classList.add('drag-over');
  });

  zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));

  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    zone.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  });

  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      if (e.target.files[0]) handleFileUpload(e.target.files[0]);
    });
  }
}

function handleFileUpload(file) {
  const validTypes = ['application/pdf', 'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  if (!validTypes.includes(file.type)) {
    showToast('Please upload a PDF or Word document.', 'error');
    return;
  }
  showUploadProgress(file.name);
}

function showUploadProgress(fileName) {
  const zone = document.getElementById('uploadZone');
  const results = document.getElementById('analysisResults');
  if (!zone) return;

  zone.innerHTML = `
    <div style="text-align:center">
      <div style="font-size:2.5rem;margin-bottom:1rem">📄</div>
      <p style="color:var(--text-primary);font-weight:700;margin-bottom:0.5rem">${fileName}</p>
      <p style="color:var(--text-secondary);font-size:0.85rem;margin-bottom:1.5rem">Analyzing your resume with AI...</p>
      <div class="progress-bar" style="max-width:300px;margin:0 auto;height:8px">
        <div class="progress-fill purple" id="uploadProgress" style="width:0%;transition:width 0.3s ease"></div>
      </div>
      <p style="color:var(--text-muted);font-size:0.8rem;margin-top:0.75rem" id="uploadStatus">Uploading...</p>
    </div>
  `;

  let progress = 0;
  const steps = ['Uploading...', 'Parsing document...', 'Extracting skills...', 'Running AI analysis...', 'Generating insights...'];
  let stepIdx = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15 + 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        if (results) {
          results.style.display = 'block';
          results.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        initProgressBars();
      }, 500);
    }
    const bar = document.getElementById('uploadProgress');
    const status = document.getElementById('uploadStatus');
    if (bar) bar.style.width = progress + '%';
    if (status && steps[stepIdx]) { status.textContent = steps[stepIdx]; stepIdx = Math.min(stepIdx + 1, steps.length - 1); }
  }, 400);
}

// ========================
// TOAST NOTIFICATIONS
// ========================
function showToast(msg, type = 'success') {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position:fixed;bottom:2rem;right:2rem;z-index:9999;
    padding:1rem 1.5rem;border-radius:12px;font-size:0.9rem;font-weight:600;
    background:${type === 'error' ? '#7f1d1d' : '#14532d'};
    color:${type === 'error' ? '#fca5a5' : '#6ee7b7'};
    border:1px solid ${type === 'error' ? 'rgba(239,68,68,0.3)' : 'rgba(16,185,129,0.3)'};
    box-shadow:0 8px 24px rgba(0,0,0,0.4);
    animation:fadeInUp 0.3s ease;
    display:flex;align-items:center;gap:8px;
  `;
  toast.textContent = (type === 'error' ? '⚠️ ' : '✅ ') + msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

// ========================
// TYPING ANIMATION
// ========================
function initTyping(elId, words, speed = 100) {
  const el = document.getElementById(elId);
  if (!el) return;
  let wordIdx = 0, charIdx = 0, deleting = false;

  function type() {
    const word = words[wordIdx];
    el.textContent = deleting ? word.slice(0, charIdx--) : word.slice(0, charIdx++);
    if (!deleting && charIdx > word.length) {
      deleting = true;
      setTimeout(type, 1500);
    } else if (deleting && charIdx < 0) {
      deleting = false;
      wordIdx = (wordIdx + 1) % words.length;
      setTimeout(type, 400);
    } else {
      setTimeout(type, deleting ? speed / 2 : speed);
    }
  }
  type();
}

// ========================
// RECRUITER SEARCH FILTER
// ========================
function initCandidateSearch() {
  const input = document.getElementById('candidateSearch');
  if (!input) return;
  input.addEventListener('input', () => {
    const q = input.value.toLowerCase();
    document.querySelectorAll('.candidate-card').forEach(card => {
      const name = card.querySelector('.candidate-name')?.textContent.toLowerCase() || '';
      const role = card.querySelector('.candidate-role')?.textContent.toLowerCase() || '';
      card.style.display = (name.includes(q) || role.includes(q)) ? '' : 'none';
    });
  });
}

// ========================
// SMOOTH SCROLL
// ========================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ========================
// INTERSECTION OBSERVER ANIMATIONS
// ========================
function initScrollAnimations() {
  const els = document.querySelectorAll('.animate-on-scroll');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-up');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => observer.observe(el));
}

// ========================
// GLOBAL INIT
// ========================
document.addEventListener('DOMContentLoaded', () => {
  initParticles('particlesCanvas');
  initSidebar();
  initAnimatedNumbers();
  initProgressBars();
  initUploadZone();
  initSmoothScroll();
  initScrollAnimations();
  initCandidateSearch();
});
