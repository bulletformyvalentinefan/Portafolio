import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
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
        <PortfolioSections />
      </main>

      <footer className="footer">
        <p>&copy; 2026 Vicente Herrera · vh.dev</p>
      </footer>
    </div>
  );
}
