import { useState, useEffect, useRef, useCallback } from "react";
import { useLang } from "../language/useLanguage";


   
   import img1 from "../data/ExperienceSection/BeachFront.png";
   import img2 from "../data/ExperienceSection/LuxuryAmenities.png";
   import img3 from "../data/ExperienceSection/PersonalizedService.png";
   
const IMAGE_PLACEHOLDERS = {
  0: img1, // ocean terrace
  1: img2, // elegant pool
  2: img3, // sunset dinner
};

/* ─────────────────────────────────────────────────────────
   BILINGUAL CONTENT
───────────────────────────────────────────────────────── */
const CONTENT = {
  en: {
    eyebrow: "THE SOFT SANDS EXPERIENCE",
    title: "Designed for unforgettable escapes.",
    sub: "",
    cards: [
      {
        num: "01",
        title: "Beachfront Bliss",
        body: "Wake up to the sound of the ocean and enjoy breathtaking views from your private balcony — every morning feels like a dream.",
        tag: "Stay",
      },
      {
        num: "02",
        title: "Luxurious Amenities",
        body: "Swimming pools, spa treatments, and world-class dining — our properties are designed to elevate every moment of your stay.",
        tag: "Indulge",
      },
      {
        num: "03",
        title: "Personalized Service",
        body: "Our dedicated team handles everything before and during your stay. Your comfort is our absolute commitment.",
        tag: "Experience",
      },
    ],
  },
  pt: {
    eyebrow: "A EXPERIÊNCIA SOFT SANDS",
    title: "Criado para refúgios inesquecíveis",
    sub: "",
    cards: [
      {
        num: "01",
        title: "Beira-Mar Perfeito",
        body: "Acorde com o som do oceano e vistas deslumbrantes da sua varanda privada — cada manhã parece um sonho.",
        tag: "Estadia",
      },
      {
        num: "02",
        title: "Comodidades de Luxo",
        body: "Piscinas, tratamentos de spa e gastronomia de excelência — as nossas propriedades elevam cada momento da sua estadia.",
        tag: "Desfrute",
      },
      {
        num: "03",
        title: "Serviço Personalizado",
        body: "A nossa equipa trata de tudo antes e durante a sua estadia. O seu conforto é o nosso compromisso absoluto.",
        tag: "Experiência",
      },
    ],
  },
};

/* ─────────────────────────────────────────────────────────
   SVG ICONS
───────────────────────────────────────────────────────── */
const IconWave = ({ active }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M2 11C4 8.5 6 8.5 8 11C10 13.5 12 13.5 14 11C16 8.5 18 8.5 20 11"
      stroke={active ? "#C8956C" : "#b8a898"} strokeWidth="1.4" strokeLinecap="round" fill="none"
      style={{ transition: "stroke 0.4s ease" }} />
    <path d="M2 7C4 4.5 6 4.5 8 7C10 9.5 12 9.5 14 7C16 4.5 18 4.5 20 7"
      stroke={active ? "#C8956C" : "#b8a898"} strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.45"
      style={{ transition: "stroke 0.4s ease" }} />
  </svg>
);

const IconStar = ({ active }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 2L11.8 7.4H17.5L12.9 10.6L14.7 16L10 12.8L5.3 16L7.1 10.6L2.5 7.4H8.2L10 2Z"
      stroke={active ? "#C8956C" : "#b8a898"} strokeWidth="1.3" strokeLinejoin="round"
      fill={active ? "rgba(200,149,108,0.1)" : "none"}
      style={{ transition: "all 0.4s ease" }} />
  </svg>
);

const IconHandshake = ({ active }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M3 10L6 7.5L8 8.5L10 7.5H12.5L14 8.5"
      stroke={active ? "#C8956C" : "#b8a898"} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"
      style={{ transition: "stroke 0.4s ease" }} />
    <path d="M17 10L14 7.5"
      stroke={active ? "#C8956C" : "#b8a898"} strokeWidth="1.3" strokeLinecap="round"
      style={{ transition: "stroke 0.4s ease" }} />
    <path d="M6 13H15" stroke={active ? "#C8956C" : "#b8a898"} strokeWidth="1.3" strokeLinecap="round"
      style={{ transition: "stroke 0.4s ease" }} />
    <path d="M5 11.5C4 11.5 3 12.2 3 13.2C3 14.2 4 15 5 15H15C16 15 17 14.2 17 13.2C17 12.2 16 11.5 15 11.5"
      stroke={active ? "#C8956C" : "#b8a898"} strokeWidth="1.2" strokeLinecap="round" fill="none"
      style={{ transition: "stroke 0.4s ease" }} />
  </svg>
);

const ICONS = [IconWave, IconStar, IconHandshake];

/* ─────────────────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────────────────── */
function useReveal(threshold = 0.2) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ─────────────────────────────────────────────────────────
   IMAGE PANEL
───────────────────────────────────────────────────────── */
function ImagePanel({ activeIndex, cards }) {
  const [displayIndex, setDisplayIndex] = useState(activeIndex);
  const [transitioning, setTransitioning] = useState(false);
  const [zoom, setZoom] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (activeIndex === displayIndex) return;
    setTransitioning(true);
    setZoom(false);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setDisplayIndex(activeIndex);
      setTransitioning(false);
      setTimeout(() => setZoom(true), 60);
    }, 520);
    return () => clearTimeout(timerRef.current);
  }, [activeIndex]);

  useEffect(() => {
    const t = setTimeout(() => setZoom(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>

      {/* Images stack — crossfade */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: "-8% 0",
            backgroundImage: `url(${IMAGE_PLACEHOLDERS[i]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: displayIndex === i ? (transitioning ? 0 : 1) : 0,
            transform: (displayIndex === i && zoom) ? "scale(1.06)" : "scale(1.0)",
            transition: displayIndex === i
              ? "opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 8s cubic-bezier(0.25,0.46,0.45,0.94)"
              : "opacity 0.52s cubic-bezier(0.4,0,0.2,1)",
            willChange: "transform, opacity",
          }}
        />
      ))}

      {/* Cinematic gradient overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.0) 40%, rgba(0,0,0,0.0) 60%, rgba(0,0,0,0.30) 100%)",
      }} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   EXPERIENCE CARD
   — own IntersectionObserver fires onActive when ≥50% visible
───────────────────────────────────────────────────────── */
function ExperienceCard({ card, index, isActive, onActive, isLast, revealDelay }) {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const Icon = ICONS[index];

  /* Entrance animation observer */
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Scroll-driven active observer — fires when card is ≥45% visible */
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onActive(index);
      },
      { threshold: 0.45 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index, onActive]);

  return (
    <div
      ref={cardRef}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.8s cubic-bezier(0.4,0,0.2,1) ${revealDelay}ms, transform 0.8s cubic-bezier(0.4,0,0.2,1) ${revealDelay}ms`,
      }}
    >
      <div style={{
        position: "relative",
        padding: "32px 44px 32px 0",
        cursor: "pointer",
        overflow: "visible",
      }}>

        {/* Active left bar */}
        <div style={{
          position: "absolute",
          left: -80,
          top: 0,
          bottom: 0,
          width: 2,
          background: "#C8956C",
          opacity: isActive ? 1 : 0,
          transform: isActive ? "scaleY(1)" : "scaleY(0.3)",
          transformOrigin: "top",
          transition: "opacity 0.45s ease, transform 0.45s cubic-bezier(0.4,0,0.2,1)",
        }} />

        {/* Ghost number — editorial */}
        <div style={{
          position: "absolute",
          right: -12,
          top: -16,
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 88,
          fontWeight: 300,
          lineHeight: 1,
          color: isActive ? "rgba(200,149,108,0.22)" : "rgba(200,149,108,0.09)",
          userSelect: "none",
          pointerEvents: "none",
          transition: "color 0.5s ease, transform 0.5s ease",
          transform: isActive ? "translateX(10px)" : "translateX(0)",
          letterSpacing: "-0.02em",
        }}>
          {card.num}
        </div>

        {/* Icon + tag row */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          marginBottom: 16,
        }}>
          <div style={{
            width: 32, height: 32,
            borderRadius: "50%",
            border: `1px solid ${isActive ? "rgba(200,149,108,0.5)" : "rgba(200,149,108,0.2)"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: isActive ? "rgba(200,149,108,0.06)" : "transparent",
            transition: "all 0.4s ease",
            flexShrink: 0,
          }}>
            <Icon active={isActive} />
          </div>
          <span style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 9, fontWeight: 500,
            letterSpacing: "0.28em", textTransform: "uppercase",
            color: isActive ? "#C8956C" : "rgba(139,120,108,0.6)",
            transition: "color 0.4s ease",
          }}>
            {card.tag}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 32,
          fontWeight: isActive ? 400 : 300,
          color: isActive ? "#1a1614" : "#6b5d54",
          lineHeight: 1.15,
          marginBottom: 16,
          letterSpacing: "-0.01em",
          transform: isActive ? "translateX(6px)" : "translateX(0)",
          transition: "all 0.45s cubic-bezier(0.4,0,0.2,1)",
        }}>
          {card.title}
        </h3>

        {/* Body */}
        <p style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: 14.5,
          fontWeight: 300,
          lineHeight: 1.85,
          color: isActive ? "#6b5d54" : "rgba(107,93,84,0.45)",
          margin: 0,
          maxWidth: 400,
          transform: isActive ? "translateX(6px)" : "translateX(0)",
          transition: "all 0.45s cubic-bezier(0.4,0,0.2,1) 0.05s",
        }}>
          {card.body}
        </p>

        {/* Active glow underline */}
        <div style={{
          position: "absolute",
          bottom: 0, left: 0,
          width: isActive ? "40%" : "0%",
          height: 0.5,
          background: "linear-gradient(to right, #C8956C, transparent)",
          transition: "width 0.6s cubic-bezier(0.4,0,0.2,1) 0.1s",
        }} />
      </div>

      {/* Separator */}
      {!isLast && (
        <div style={{
          height: 1,
          background: "linear-gradient(to right, rgba(200,149,108,0.2) 0%, rgba(200,149,108,0.08) 60%, transparent 100%)",
          marginLeft: 0,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s ease 0.3s",
        }} />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   SECTION BRIDGE
───────────────────────────────────────────────────────── */
export function SectionBridge() {
  return (
    <div style={{
      background: "linear-gradient(to bottom, #1a1614 0%, #F8F6F2 100%)",
      height: 100,
      position: "relative", zIndex: 1,
    }}>
      <div style={{
        position: "absolute", left: "50%", top: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex", alignItems: "center", gap: 14,
      }}>
        <span style={{ width: 36, height: 1, background: "rgba(200,149,108,0.3)", display: "block" }} />
        <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#C8956C", opacity: 0.5 }} />
        <span style={{ width: 36, height: 1, background: "rgba(200,149,150,0.3)", display: "block" }} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   MOBILE EXPERIENCE SECTION
───────────────────────────────────────────────────────── */
function MobileExperience({ c }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [headerRef, headerVisible] = useReveal(0.15);

  // Auto-advance
  useEffect(() => {
    const t = setInterval(() => {
      setActiveIndex((i) => (i + 1) % 3);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ background: "#F8F6F2", fontFamily: "'Jost', sans-serif" }}>

      {/* Image */}
      <div style={{ position: "relative", width: "100%", height: "62vw", minHeight: 260, maxHeight: 400, overflow: "hidden" }}>
        <ImagePanel activeIndex={activeIndex} cards={c.cards} />
      </div>

      {/* Content */}
      <div style={{ padding: "52px 28px 72px" }}>

        {/* Header */}
        <div ref={headerRef} style={{ marginBottom: 44 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 12, marginBottom: 20,
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "none" : "translateY(16px)",
            transition: "all 0.7s ease",
          }}>
            <span style={{ width: 24, height: 1, background: "#C8956C", display: "block" }} />
            <span style={{
              fontFamily: "'Jost', sans-serif", fontSize: 9, fontWeight: 500,
              letterSpacing: "0.3em", textTransform: "uppercase", color: "#C8956C",
            }}>
              {c.eyebrow}
            </span>
          </div>

          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(30px, 7.5vw, 42px)",
            fontWeight: 300, color: "#1a1614", lineHeight: 1.15,
            marginBottom: 18, letterSpacing: "-0.01em",
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "none" : "translateY(20px)",
            transition: "all 0.7s ease 0.1s",
          }}>
            {c.title.split("\n").map((line, i) => (
              <span key={i} style={{ display: "block" }}>{line}</span>
            ))}
          </h2>

          <p style={{
            fontFamily: "'Jost', sans-serif", fontSize: 13.5, fontWeight: 300,
            lineHeight: 1.8, color: "#6b5d54", margin: 0,
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "none" : "translateY(20px)",
            transition: "all 0.7s ease 0.2s",
          }}>
            {c.sub}
          </p>
        </div>

        {/* Tab bar */}
        <div style={{
          display: "flex", gap: 0, marginBottom: 36,
          borderBottom: "1px solid rgba(200,149,108,0.15)",
        }}>
          {c.cards.map((card, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              style={{
                flex: 1, padding: "10px 0",
                fontFamily: "'Jost', sans-serif", fontSize: 9, fontWeight: 500,
                letterSpacing: "0.22em", textTransform: "uppercase",
                color: activeIndex === i ? "#C8956C" : "rgba(139,120,108,0.5)",
                background: "none", border: "none",
                borderBottom: `2px solid ${activeIndex === i ? "#C8956C" : "transparent"}`,
                cursor: "pointer",
                marginBottom: -1,
                transition: "all 0.35s ease",
              }}
            >
              {card.num}
            </button>
          ))}
        </div>

        {/* Active card */}
        <div style={{
          padding: "4px 0",
          transition: "opacity 0.35s ease",
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 8, marginBottom: 14,
          }}>
            {(() => {
              const Icon = ICONS[activeIndex];
              return (
                <div style={{
                  width: 28, height: 28, borderRadius: "50%",
                  border: "1px solid rgba(200,149,108,0.4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon active={true} />
                </div>
              );
            })()}
            <span style={{
              fontFamily: "'Jost', sans-serif", fontSize: 8.5, fontWeight: 500,
              letterSpacing: "0.28em", textTransform: "uppercase", color: "#C8956C",
            }}>
              {c.cards[activeIndex].tag}
            </span>
          </div>

          <h3 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 26, fontWeight: 400, color: "#1a1614",
            lineHeight: 1.2, marginBottom: 14,
          }}>
            {c.cards[activeIndex].title}
          </h3>
          <p style={{
            fontFamily: "'Jost', sans-serif", fontSize: 13.5, fontWeight: 300,
            lineHeight: 1.85, color: "#6b5d54", margin: 0,
          }}>
            {c.cards[activeIndex].body}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   DESKTOP EXPERIENCE SECTION
───────────────────────────────────────────────────────── */
function DesktopExperience({ c }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [headerRef, headerVisible] = useReveal(0.15);

  /* Stable callback — won't re-create observers on every render */
  const handleActive = useCallback((i) => setActiveIndex(i), []);

  return (
    <section
      style={{ background: "#F8F6F2", display: "grid", gridTemplateColumns: "5fr 7fr", minHeight: "100vh" }}
    >

      {/* ════ LEFT — Sticky Image ════ */}
      <div style={{
        position: "sticky", top: 0,
        height: "100vh",
        overflow: "hidden",
        flexShrink: 0,
      }}>
        <ImagePanel activeIndex={activeIndex} cards={c.cards} />
      </div>

      {/* ════ RIGHT — Content ════ */}
      <div style={{
        background: "#F8F6F2",
        padding: "88px 72px 40px 80px",
        position: "relative",
      }}>

        {/* Subtle grain texture overlay */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
          opacity: 0.4,
          zIndex: 0,
        }} />

        <div style={{ position: "relative", zIndex: 1 }}>

          {/* ── Header ── */}
          <div ref={headerRef} style={{ marginBottom: 40 }}>

            <div style={{
              display: "flex", alignItems: "center", gap: 14, marginBottom: 22,
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "none" : "translateY(18px)",
              transition: "opacity 0.75s ease, transform 0.75s ease",
            }}>
              <span style={{ display: "block", width: 28, height: 1, background: "#C8956C", flexShrink: 0 }} />
              <span style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 9.5, fontWeight: 500,
                letterSpacing: "0.32em", textTransform: "uppercase",
                color: "#C8956C",
              }}>
                {c.eyebrow}
              </span>
            </div>

            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(34px, 3.2vw, 50px)",
              fontWeight: 300,
              color: "#1a1614",
              lineHeight: 1.12,
              marginBottom: 20,
              letterSpacing: "-0.01em",
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "none" : "translateY(22px)",
              transition: "opacity 0.75s ease 0.1s, transform 0.75s ease 0.1s",
            }}>
              {c.title.split("\n").map((line, i) => (
                <span key={i} style={{ display: "block" }}>{line}</span>
              ))}
            </h2>
          </div>

          {/* ── Gold divider ── */}
          <div style={{
            display: "flex", alignItems: "center", gap: 12, marginBottom: 36,
            opacity: headerVisible ? 1 : 0,
            transition: "opacity 0.7s ease 0.25s",
          }}>
            <span style={{ width: 24, height: 1, background: "rgba(200,149,108,0.4)", display: "block" }} />
            <span style={{ flex: 1, height: 1, background: "linear-gradient(to right, rgba(200,149,108,0.18), transparent)" }} />
          </div>

          {/* ── Cards — each fires handleActive on scroll ── */}
          <div style={{ paddingLeft: 0 }}>
            {c.cards.map((card, i) => (
              <ExperienceCard
                key={i}
                card={card}
                index={i}
                isActive={activeIndex === i}
                onActive={handleActive}
                isLast={i === c.cards.length - 1}
                revealDelay={i * 100}
              />
            ))}
          </div>


        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────────────────── */
export default function ExperienceSection() {
  const { lang } = useLang();
  const c = CONTENT[lang] || CONTENT.en;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile ? <MobileExperience c={c} /> : <DesktopExperience c={c} />;
}