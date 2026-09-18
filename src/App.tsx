import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { InfrastructureCanvas } from "./components/infra/InfrastructureCanvas";
import { PortfolioSections } from "./components/PortfolioSections";

export default function App() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "dark" | "light" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = saved ?? (prefersDark ? "dark" : "light");
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  return (
    <div className="layout">
      <header className="header">
        <a href="#" className="brand">
          vh.dev
        </a>
        <div className="header-actions">
          <nav className="nav">
            <a href="#infra">Infra</a>
            <a href="#proyectos">Projects</a>
            <a href="#experiencia">Experience</a>
            <a href="#tecnologias">Stack</a>
            <a href="#contacto">Contact</a>
          </nav>
          <button
            onClick={toggleTheme}
            className="theme-btn"
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            aria-pressed={theme === "dark"}
            title={theme === "dark" ? "Light theme" : "Dark theme"}
          >
            <span className="inline-flex items-center justify-center transition-transform duration-200" style={{ transform: theme === "dark" ? "rotate(0deg)" : "rotate(180deg)" }}>
              {theme === "dark" ? <FiMoon className="h-4 w-4" /> : <FiSun className="h-4 w-4" />}
            </span>
          </button>
        </div>
      </header>

      <main>
        <section id="infra" className="section">
          <h2 className="section-title">Live infrastructure — Homelab</h2>
          <p className="contact-desc">Drag, pan and zoom. Click a card to inspect. Interaction only inside the frame.</p>
          <div className="infra-area relative overflow-hidden h-[480px] md:h-[560px] lg:h-[600px]">
            <InfrastructureCanvas />
            <div className="infra-area__hint pointer-events-none absolute left-3 top-3 z-10 hidden md:inline-flex items-center gap-1.5 rounded-full border bg-[var(--node-bg)]/80 backdrop-blur px-2.5 py-1 text-[11px] font-mono" style={{ borderColor: "var(--node-border)", color: "var(--node-muted)" }}>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Interactive area
            </div>
          </div>
        </section>

        <PortfolioSections />
      </main>

      <footer className="footer">
        <p>&copy; 2026 Vicente Herrera · vh.dev</p>
      </footer>
    </div>
  );
}
