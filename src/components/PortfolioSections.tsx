export function PortfolioSections() {
  return (
    <>
      <section className="hero">
        <h1 className="name">Vicente Herrera</h1>
        <p className="role">Platform Engineer in training · Backend & Infrastructure · Duoc UC — Puerto Varas, Chile</p>
        <p className="bio">
          Building scalable infrastructure so teams ship faster. Production backend background in Go
          (PostgreSQL/Supabase, Redis, WebSockets). Now going deep on Kubernetes, Terraform and observability.
          Solid base in Docker, relational databases and real-time APIs. Open to <strong>Platform / DevOps Junior</strong> roles.
        </p>
        <div className="hero-ctas">
          <a href="#proyectos" className="btn btn-primary">View projects</a>
          <a href="#contacto" className="btn">Get in touch</a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Resume</a>
        </div>
        <p className="hero-proof">AZ-900 · Duoc UC 2025–2029 · Homelab live · Docker · Kubernetes (learning)</p>
      </section>

      <section id="proyectos" className="section">
        <h2 className="section-title"><span className="section-num">01</span> Projects — Case studies</h2>
        <div className="project-list">
          <article className="project-card">
            <div className="project-meta">
              <span className="project-year">2026 · Live</span>
              <div className="project-tags">
                <span>Go</span>
                <span>React Native</span>
                <span>Supabase</span>
                <span>Redis</span>
                <span>WebSockets</span>
              </div>
            </div>
            <div className="project-content">
              <h3 className="project-title">Plop — E2E Multiplatform Platform</h3>
              <p className="project-desc">
                <strong>Problem:</strong> Fragmented reviews and chat across web/mobile with auth, moderation and media.
                <br />
                <strong>Architecture:</strong> Go 1.25 REST API (PostgreSQL via Supabase + Redis cache, async WebSockets, JWT/OAuth2, HMAC-SHA256 via Flow) · React Native 0.81 + Expo (FlashList, Zustand) · Caddy reverse proxy · Docker Compose, Render & Vercel.
                <br />
                <strong>Impact:</strong> &lt;200ms p95 API, real-time chat, signed transactions, external Deezer/TVMaze integrations.
              </p>
              <div className="project-links">
                <a href="https://plop.dpdns.org" target="_blank" rel="noopener noreferrer" className="link">
                  Live
                </a>
                <a href="https://github.com/bulletformyvalentinefan" target="_blank" rel="noopener noreferrer" className="link">
                  Private repo
                </a>
              </div>
            </div>
          </article>

          <article className="project-card">
            <div className="project-meta">
              <span className="project-year">2026</span>
              <div className="project-tags">
                <span>Go</span>
                <span>Gin</span>
                <span>PostgreSQL</span>
                <span>React</span>
                <span>Docker Compose</span>
              </div>
            </div>
            <div className="project-content">
              <h3 className="project-title">Expense Tracker — Full-stack Finance</h3>
              <p className="project-desc">
                <strong>Problem:</strong> Personal finance without clear categorization, pagination or wallet insights.
                <br />
                <strong>Architecture:</strong> Go (Gin + GORM) + PostgreSQL, auth, CRUD with pagination, wallet & category summaries · React 19 + Vite · 3-service Compose (api, db, frontend).
                <br />
                <strong>Decisions:</strong> Gin for minimal overhead, GORM for migrations, Compose for one-command homelab deploy.
              </p>
              <div className="project-links">
                <a href="https://github.com/bulletformyvalentinefan/expense-tracker" target="_blank" rel="noopener noreferrer" className="link">
                  GitHub
                </a>
              </div>
            </div>
          </article>

          <article className="project-card">
            <div className="project-meta">
              <span className="project-year">2026 · Live</span>
              <div className="project-tags">
                <span>Go</span>
                <span>React</span>
                <span>Redis</span>
                <span>Docker</span>
                <span>Spotify API</span>
              </div>
            </div>
            <div className="project-content">
              <h3 className="project-title">Play Something — Go Spotify Proxy</h3>
              <p className="project-desc">
                <strong>Problem:</strong> Play Spotify outside official player with homelab cache and auth flow.
                <br />
                <strong>Architecture:</strong> Go 1.26 proxy (<code>chi</code> + <code>go-librespot</code> + <code>rs/cors</code>) · Redis 7 (appendonly) · React 19 + Vite + react-router · Docker Compose (redis, proxy :8081/:8989, frontend :80, GHCR images, healthchecks).
                <br />
                <strong>Impact:</strong> Local cache, homelab deploy one-command, aligns with portfolio Redis/Docker stack.
              </p>
              <div className="project-links">
                <a href="https://playsomething.vercel.app" target="_blank" rel="noopener noreferrer" className="link">
                  Demo
                </a>
                <a href="https://github.com/bulletformyvalentinefan/play-something" target="_blank" rel="noopener noreferrer" className="link">
                  GitHub
                </a>
              </div>
            </div>
          </article>

          <article className="project-card">
            <div className="project-meta">
              <span className="project-year">2026</span>
              <div className="project-tags">
                <span>Markdown</span>
                <span>SAST</span>
                <span>Security</span>
              </div>
            </div>
            <div className="project-content">
              <h3 className="project-title">Vulnerability Analyst — Security Skill</h3>
              <p className="project-desc">
                <strong>Problem:</strong> Inconsistent SAST for repos, deps and API config.
                <br />
                <strong>Solution:</strong> Auditing skill for opencode / Claude Code (SKILL.md + references/) that scans source, Git, deps and APIs and emits a structured report without touching files.
                <br />
                <strong>Use:</strong> `skill: vulnerability-analyst` — read-only, CI-friendly.
              </p>
              <div className="project-links">
                <a href="https://github.com/bulletformyvalentinefan/vulnerability-analyst" target="_blank" rel="noopener noreferrer" className="link">
                  GitHub
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section id="experiencia" className="section">
        <h2 className="section-title"><span className="section-num">02</span> Experience</h2>
        <div className="stack-grid">
          <div className="stack-col">
            <span className="stack-label">IT Support — Duoc UC</span>
            <p>Duoc UC · Mar 2026 — Jun 2026 — Puerto Varas</p>
            <p>Event infrastructure: connectivity, workstations, AV, live incident response. Cut setup time with checklists and pre-imaged hosts.</p>
          </div>
          <div className="stack-col">
            <span className="stack-label">Education</span>
            <p>Computer Engineering — Duoc UC, Chile (2025 — 2029)</p>
            <p>High School — Colegio Terravida, Puerto Varas</p>
          </div>
          <div className="stack-col">
            <span className="stack-label">Certifications</span>
            <p>Microsoft Certified: Azure Fundamentals (AZ-900) — Jan 2026</p>
            <p>Scrum Product Owner Professional (SPOPC®) — Dec 2025</p>
            <p>Languages: Spanish (native) · English (technical intermediate)</p>
          </div>
        </div>
      </section>

      <section id="tecnologias" className="section">
        <h2 className="section-title"><span className="section-num">03</span> Stack</h2>
        <div className="stack-grid">
          <div className="stack-col">
            <span className="stack-label">Core Infrastructure — Proficient</span>
            <p>Docker, Docker Compose, Caddy, Cloudflare Tunnel · PostgreSQL, Redis · Supabase · Uptime Kuma, Homelab live</p>
          </div>
          <div className="stack-col">
            <span className="stack-label">Backend & Languages — Proficient</span>
            <p>Go (advanced), SQL, TypeScript/JavaScript · React, React Native, Expo · REST, WebSockets, JWT/OAuth2, HMAC · Gin, chi</p>
          </div>
          <div className="stack-col">
            <span className="stack-label">Learning — Platform focus 2026</span>
            <p>Kubernetes, Terraform · Python, Bash · Prometheus, Grafana, OpenTelemetry · GitHub Actions, Backstage (next) · Scrum</p>
          </div>
        </div>
      </section>

      <section id="contacto" className="section">
        <h2 className="section-title"><span className="section-num">04</span> Contact</h2>
        <p className="contact-desc">Open to Platform Engineer / DevOps Junior roles and infra collaborations. Fastest reply via email — I read every message.</p>
        <div className="social-links">
          <a href="https://github.com/bulletformyvalentinefan" target="_blank" rel="noopener noreferrer" className="link">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/vicente-herrera-solis" target="_blank" rel="noopener noreferrer" className="link">
            LinkedIn
          </a>
          <a href="mailto:v.herrera.dev@outlook.com" className="link">
            Email
          </a>
        </div>
      </section>
    </>
  );
}
