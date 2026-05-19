import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLang } from "../language/useLanguage";
import { t } from "../language/translations";

const NAV_KEYS = ["home", "whoWeAre", "whatWeDo", "contact"];

const NAV_ROUTES = {
  home: "/",
  whoWeAre: "/whoarewe",
  whatWeDo: "/whatwedo",
  contact: "/contactus",
};

export default function Navbar() {
  const { lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const tr = t[lang].nav;

  /* Deriva o active a partir da rota actual — não de estado local */
  const active = Object.entries(NAV_ROUTES).find(
    ([, path]) => path === location.pathname
  )?.[0] ?? "home";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  function handleNav(key) {
    navigate(NAV_ROUTES[key]);
    setMenuOpen(false);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Jost:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          height: 1px;
          background: #C8956C;
          width: 0;
          transition: width 0.35s cubic-bezier(0.4,0,0.2,1);
        }
        .nav-link:hover::after,
        .nav-link-active::after { width: 100% !important; }
        .nav-link:hover { color: #C8956C !important; }

        @media (max-width: 900px) {
          .desktop-links { display: none !important; }
          .lang-pill     { display: none !important; }
          .hamburger-btn { display: flex !important; }
          .main-nav      { padding: 0 22px !important; }
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav
        className="main-nav"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: scrolled ? 64 : 80,
          padding: "0 52px",
          background: scrolled ? "rgba(15, 12, 10, 0.82)" : "transparent",
          backdropFilter: scrolled ? "blur(22px) saturate(160%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(22px) saturate(160%)" : "none",
          borderBottom: scrolled ? "1px solid rgba(200,149,108,0.14)" : "none",
          boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.3)" : "none",
          transition: "all 0.45s cubic-bezier(0.4,0,0.2,1)",
          fontFamily: "'Jost', sans-serif",
        }}
      >
        {/* ── Logo ── */}
        <a
          onClick={() => handleNav("home")}
          style={{
            display: "flex", flexDirection: "column", gap: 3,
            textDecoration: "none", cursor: "pointer",
          }}
        >
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 22, fontWeight: 600,
            color: "#FAFAF8",
            letterSpacing: "0.05em", lineHeight: 1,
          }}>
            Soft Sands
          </span>
          <span style={{
            fontSize: 8.5, fontWeight: 500,
            color: "#C8956C",
            letterSpacing: "0.28em", textTransform: "uppercase",
          }}>
            Accommodations
          </span>
        </a>

        {/* ── Desktop Links ── */}
        <ul className="desktop-links" style={{ display: "flex", gap: 40, listStyle: "none" }}>
          {NAV_KEYS.map((key) => (
            <li key={key}>
              <button
                onClick={() => handleNav(key)}
                className={`nav-link ${active === key ? "nav-link-active" : ""}`}
                style={{
                  position: "relative",
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 14, fontWeight: 500,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  paddingBottom: 4,
                  color: active === key ? "#C8956C" : "rgba(255,255,255,0.88)",
                  transition: "color 0.3s ease",
                }}
              >
                {tr[key]}
              </button>
            </li>
          ))}
        </ul>

        {/* ── Right: Lang Toggle + Hamburger ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>

          {/* Lang pill */}
          <div
            className="lang-pill"
            style={{
              display: "flex", alignItems: "center",
              borderRadius: 50,
              border: "1px solid rgba(200,149,108,0.5)",
              background: "rgba(0,0,0,0.30)",
              backdropFilter: "blur(8px)",
              overflow: "hidden",
              padding: "3px", gap: 3,
            }}
          >
            {["pt", "en"].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 12, fontWeight: 700,
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  cursor: "pointer", border: "none", borderRadius: 50,
                  padding: "6px 16px",
                  background: lang === l ? "#C8956C" : "transparent",
                  color: lang === l ? "#1a1210" : "rgba(255,255,255,0.70)",
                  transition: "all 0.3s ease",
                }}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            className="hamburger-btn"
            style={{
              display: "none", flexDirection: "column", gap: 5,
              background: "none", border: "none",
              cursor: "pointer", padding: 4, zIndex: 1100,
            }}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: "block", width: 26, height: 1.5,
                background: "#FAFAF8",
                transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
                transformOrigin: "center",
                transform: menuOpen
                  ? i === 0 ? "rotate(45deg) translate(4.5px, 4.5px)"
                  : i === 1 ? "scaleX(0)"
                  : "rotate(-45deg) translate(4.5px, -4.5px)"
                  : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* ── MOBILE FULLSCREEN MENU ── */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 900,
        background: "rgba(10, 8, 6, 0.97)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 10,
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? "all" : "none",
        transition: "opacity 0.45s cubic-bezier(0.4,0,0.2,1)",
      }}>
        {NAV_KEYS.map((key, i) => (
          <button
            key={key}
            onClick={() => handleNav(key)}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 28, fontWeight: 300,
              color: active === key ? "#C8956C" : "#FAFAF8",
              background: "none", border: "none", cursor: "pointer",
              letterSpacing: "0.04em",
              padding: "8px 0",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(24px)",
              transition: `opacity 0.4s ease ${menuOpen ? i * 75 + 100 : 0}ms,
                           transform 0.4s ease ${menuOpen ? i * 75 + 100 : 0}ms,
                           color 0.3s ease`,
            }}
          >
            {tr[key]}
          </button>
        ))}

        <span style={{
          display: "block", width: 40, height: 1,
          background: "rgba(200,149,108,0.35)",
          margin: "12px 0",
          opacity: menuOpen ? 1 : 0,
          transition: `opacity 0.4s ease ${menuOpen ? "380ms" : "0ms"}`,
        }} />

        {/* Lang toggle — mobile */}
        <div style={{
          display: "flex", gap: 20,
          opacity: menuOpen ? 1 : 0,
          transition: `opacity 0.4s ease ${menuOpen ? "450ms" : "0ms"}`,
        }}>
          {["en", "pt"].map((l, i) => (
            <span key={l} style={{ display: "flex", alignItems: "center", gap: 20 }}>
              {i > 0 && (
                <span style={{ width: 1, height: 16, background: "rgba(200,149,108,0.35)" }} />
              )}
              <button
                onClick={() => { setLang(l); setMenuOpen(false); }}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 13, fontWeight: 500,
                  letterSpacing: "0.22em", textTransform: "uppercase",
                  color: lang === l ? "#C8956C" : "rgba(255,255,255,0.38)",
                  transition: "color 0.3s",
                }}
              >
                {l.toUpperCase()}
              </button>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}