/* =============================================
   ARAFI BUYA — PORTFOLIO 2026
   ============================================= */

document.addEventListener("DOMContentLoaded", () => {
  buildHero();
  buildAbout();
  buildSkills();
  buildProjects();
  initThemeToggle();
  initNavbar();
  initHamburger();
  initReveal();
  initSkillBars();

  document.getElementById("footer-name").textContent = portfolioData.name;
});

/* ── Hero ── */
function buildHero() {
  const { name, role, tagline, bio, stats } = portfolioData;

  const [first, ...rest] = name.split(" ");
  document.getElementById("hero-name").innerHTML =
    `<span class="accent">${first}</span> ${rest.join(" ")}`;

  document.getElementById("hero-role").innerHTML =
    `<span class="highlight">${role}</span> — ${tagline}`;

  document.getElementById("hero-bio").textContent = bio;

  const statsEl = document.getElementById("hero-stats");
  stats.forEach(({ value, label }) => {
    statsEl.insertAdjacentHTML("beforeend", `
      <div class="stat-item">
        <span class="stat-value">${value}</span>
        <span class="stat-label">${label}</span>
      </div>`);
  });
}

/* ── About ── */
function buildAbout() {
  const { education } = portfolioData;

  document.getElementById("about-bio").innerHTML = `
    <p>I'm a <strong>Year 2 Computer Engineering student</strong> who's been deep in the MERN stack for the past year. Started from zero, put in 100+ hours of structured bootcamp work, and shipped real apps to production.</p>
    <p>My stack: <strong>MongoDB, Express, React, Node.js</strong> — solid grip on REST API design, JWT auth, and component-based frontends. Every project pushes that understanding further.</p>
    <p>Next up: <strong>React Native</strong> for mobile and diving into <strong>Cyber Security</strong>. I want to understand the whole stack — web, mobile, and how to protect it.</p>`;

  document.getElementById("edu-degree").textContent =
    `${education.degree} — ${education.year}`;
  document.getElementById("edu-meta").textContent = education.course;
}

/* ── Skills ── */
function buildSkills() {
  const { skills, learning, projects } = portfolioData;

  const barsEl = document.getElementById("skill-bars");
  skills.forEach(({ name, level }) => {
    barsEl.insertAdjacentHTML("beforeend", `
      <div class="skill-row">
        <div class="skill-meta">
          <span class="skill-name">${name}</span>
          <span class="skill-pct">${level}%</span>
        </div>
        <div class="skill-track">
          <div class="skill-fill" data-level="${level}"></div>
        </div>
      </div>`);
  });

  const pillsEl = document.getElementById("learning-pills");
  learning.forEach(item => {
    pillsEl.insertAdjacentHTML("beforeend",
      `<span class="pill">↗ ${item}</span>`);
  });

  const icons = {
    "MongoDB":"🍃","Express":"⚡","React":"⚛","Node.js":"🟢",
    "JWT":"🔐","REST API":"🔗","HTML":"🧱","CSS":"🎨","JavaScript":"📜"
  };
  const allTags = [...new Set(projects.flatMap(p => p.tags))];
  const techEl = document.getElementById("tech-icons");
  allTags.forEach(t => {
    techEl.insertAdjacentHTML("beforeend",
      `<span class="tech-badge">${icons[t] ?? "•"} ${t}</span>`);
  });
}

/* ── Projects ── */
function buildProjects() {
  const grid = document.getElementById("projects-grid");

  portfolioData.projects.forEach(p => {
    const featuredClass = p.featured ? "featured" : "";
    const liveTag = p.deployed
      ? `<span class="badge-live">Live</span>` : `<span class="badge-pause">Paused</span>`;
    const demoBtn = p.link && p.link !== "#"
      ? `<a href="${p.link}" target="_blank" rel="noopener" class="link-btn demo">↗ Demo</a>` : "";
    const codeBtn = p.github && p.github !== "#"
      ? `<a href="${p.github}" target="_blank" rel="noopener" class="link-btn code">Code</a>`
      : `<span class="link-btn code disabled">Private</span>`;

    grid.insertAdjacentHTML("beforeend", `
      <div class="project-card ${featuredClass} reveal">
        <div class="project-img">
          <img src="${p.image}" alt="${p.title}" loading="lazy" />
        </div>
        <div class="project-body">
          <div class="project-top">
            <span class="project-title">${p.title}</span>
            ${liveTag}
          </div>
          <p class="project-desc">${p.description}</p>
          <div class="project-tags">
            ${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}
          </div>
          <div class="project-links">${demoBtn}${codeBtn}</div>
        </div>
      </div>`);
  });
}

/* ── Theme Toggle ── */
function initThemeToggle() {
  const btn = document.getElementById("themeToggle");
  const html = document.documentElement;

  const saved = localStorage.getItem("theme") ?? "dark";
  html.setAttribute("data-theme", saved);

  btn.addEventListener("click", () => {
    const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
}

/* ── Navbar ── */
function initNavbar() {
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 20);
  }, { passive: true });

  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      navLinks.forEach(a => a.classList.remove("active"));
      document.querySelector(`.nav-links a[href="#${e.target.id}"]`)
        ?.classList.add("active");
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  sections.forEach(s => obs.observe(s));
}

/* ── Hamburger ── */
function initHamburger() {
  const btn  = document.getElementById("hamburger");
  const menu = document.getElementById("mobile-menu");
  btn.addEventListener("click", () => menu.classList.toggle("open"));
  menu.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => menu.classList.remove("open")));
}

/* ── Scroll reveal ── */
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (!e.isIntersecting) return;
      setTimeout(() => e.target.classList.add("visible"), i * 70);
      obs.unobserve(e.target);
    });
  }, { threshold: 0.08 });
  document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
}

/* ── Skill bars ── */
function initSkillBars() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      setTimeout(() => {
        e.target.style.width = e.target.dataset.level + "%";
      }, 200);
      obs.unobserve(e.target);
    });
  }, { threshold: 0.3 });
  document.querySelectorAll(".skill-fill").forEach(f => obs.observe(f));
}