export function PortfolioSections() {
  return (
    <>
      <section className="hero">
        <h1 className="name">Vicente Herrera</h1>
        <p className="role">Platform Engineer in training · Backend &amp; Infrastructure · Duoc UC</p>
        <p className="bio">
          Construyendo infraestructura escalable que permite a equipos shippear más rápido. Background backend en Go y
          Spring Boot en producción (PostgreSQL, Redis, Kafka, WebSockets), ahora profundizando en Kubernetes, Terraform
          y observabilidad. Base sólida en Docker, bases de datos relacionales y APIs en tiempo real. Estudiante de
          Ingeniería en Informática en Duoc UC, Puerto Varas.
        </p>
      </section>

      <section id="proyectos" className="section">
        <h2 className="section-title">Proyectos</h2>
        <div className="project-list">
          <article className="project-card">
            <div className="project-meta">
              <span className="project-year">2026 · En producción</span>
              <div className="project-tags">
                <span>Go</span>
                <span>React Native</span>
                <span>Supabase</span>
                <span>Redis</span>
                <span>WebSockets</span>
              </div>
            </div>
            <div className="project-content">
              <h3 className="project-title">Plop — Plataforma Multiplataforma E2E</h3>
              <p className="project-desc">
                API REST de alto rendimiento en Go 1.25 con PostgreSQL/Supabase y caché en Redis. WebSockets asíncronos
                para chat en tiempo real, seguridad stateless con JWT/OAuth2, frontend con React Native 0.81 y Expo
                (FlashList, Zustand, notificaciones push). Transacciones firmadas con HMAC-SHA256 vía Flow,
                integraciones externas (Deezer, TVMaze) y despliegue con Docker Compose, Caddy, Render y Vercel.
              </p>
              <div className="project-links">
                <a href="https://plop.dpdns.org" target="_blank" rel="noopener noreferrer" className="link">
                  Web
                </a>
                <a href="https://github.com/bulletformyvalentinefan" target="_blank" rel="noopener noreferrer" className="link">
                  GitHub Repositorio privado
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
              <h3 className="project-title">Expense Tracker</h3>
              <p className="project-desc">
                Aplicación full-stack de gestión de gastos implementada con Go (Gin + GORM) y PostgreSQL. Autenticación,
                CRUD de gastos y categorías con paginación, billetera y resumen por categorías, y despliegue orquestado
                con Docker Compose. Frontend en React 19 + Vite.
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
              <span className="project-year">2026 · En producción</span>
              <div className="project-tags">
                <span>Java 21</span>
                <span>Spring Boot</span>
                <span>Oracle 23c</span>
                <span>Redis</span>
                <span>Kafka</span>
              </div>
            </div>
            <div className="project-content">
              <h3 className="project-title">Play Something — Clon de Spotify Event-Driven</h3>
              <p className="project-desc">
                Clon funcional de Spotify con arquitectura de microservicios orientada a eventos. Backend en Spring Boot
                3.4 que consume la API pública de Deezer con caché declarativa en Redis (TTL 1h) y métricas de
                reproducción asíncronas vía Kafka. Frontend editorial en React 19 + Vite con tema claro/oscuro,
                persistencia en Oracle 23c y despliegue orquestado con Docker Compose y CI con GitHub Actions. La demo
                en Vercel despliega solo el frontend: el backend requiere levantar Oracle, Redis y Kafka localmente.
              </p>
              <div className="project-links">
                <a href="https://playsomething.vercel.app" target="_blank" rel="noopener noreferrer" className="link">
                  Demo (frontend)
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
              <h3 className="project-title">Vulnerability Analyst</h3>
              <p className="project-desc">
                Skill de auditoría de seguridad (SAST) para opencode / Claude Code. Escanea código fuente, repositorios
                Git, dependencias y configuración de APIs, y produce un reporte estructurado sin modificar archivos.
                Definido en SKILL.md + references/.
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
        <h2 className="section-title">Experiencia</h2>
        <div className="stack-grid">
          <div className="stack-col">
            <span className="stack-label">Soporte — Duoc UC</span>
            <p>Duoc UC · Mar 2026 — Jun 2026</p>
          </div>
          <div className="stack-col">
            <span className="stack-label">Formación</span>
            <p>Ingeniería en Informática — Duoc UC, Chile (2025 — 2029)</p>
            <p>Enseñanza Media Completa — Colegio Terravida, Puerto Varas</p>
          </div>
          <div className="stack-col">
            <span className="stack-label">Certificaciones</span>
            <p>Microsoft Certified: Azure Fundamentals (AZ-900) — Microsoft · Ene 2026</p>
            <p>Scrum Product Owner Professional (SPOPC®) — CertiProf · Dic 2025</p>
            <p>Idiomas: Español (nativo) · Inglés (intermedio técnico)</p>
          </div>
        </div>
      </section>

      <section id="tecnologias" className="section">
        <h2 className="section-title">Tecnologías</h2>
        <div className="stack-grid">
          <div className="stack-col">
            <span className="stack-label">Core Infrastructure</span>
            <p>Docker, Docker Compose, Kubernetes (learning), Terraform (learning) · PostgreSQL, Redis, Kafka, Oracle 23c · AWS (free tier), Supabase</p>
          </div>
          <div className="stack-col">
            <span className="stack-label">Backend &amp; Lenguajes</span>
            <p>Go (avanzado), Java 21 / Spring Boot, SQL, JavaScript/TypeScript · React Native, Expo, React · REST APIs, WebSockets, JWT/OAuth2</p>
          </div>
          <div className="stack-col">
            <span className="stack-label">Learning in Progress</span>
            <p>Python (learning), Bash (learning) · Prometheus, Grafana, OpenTelemetry · GitHub Actions, Scrum · Git, Postman, IntelliJ IDEA</p>
          </div>
        </div>
      </section>

      <section id="contacto" className="section">
        <h2 className="section-title">Conectar</h2>
        <p className="contact-desc">Abierto a roles Platform Engineer / DevOps Junior, colaboraciones infra y proyectos backend.</p>
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
