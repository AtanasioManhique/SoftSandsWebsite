import { useEffect, useRef, useState } from "react";
import { useLang } from "../language/useLanguage";

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

const PARTNERS = [
  "Ponta Membene",
  "Sky Island",
  "Farol da Barra",
  "Barra In",
  "Ocean View",
  "Lehani",
  "Kaya Kwero",
  "Ponta Consult",
  "Ponta Stay",
  "Casa na Praia",
  "Tofo Summer",
  "Tilak Lodge",
];

const CONTENT = {
  en: {
    eyebrow: "Trusted Partners",
    title: "Properties we've\nworked with.",
    sub: "A growing network of exceptional stays across Mozambique's southern coastline — each one handpicked, each one trusted.",
    count: "12 properties",
    countSub: "and counting",
  },
  pt: {
    eyebrow: "Parceiros de Confiança",
    title: "Propriedades com\nquem trabalhámos.",
    sub: "Uma rede crescente de estadias excepcionais ao longo da costa sul de Moçambique — cada uma selecionada, cada uma de confiança.",
    count: "12 propriedades",
    countSub: "e a crescer",
  },
};

function PartnerItem({ name, index, visible }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "20px 0",
        borderBottom: "1px solid rgba(200,149,108,0.12)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-20px)",
        transition: `opacity 0.65s ease ${100 + index * 60}ms, transform 0.65s ease ${100 + index * 60}ms`,
        cursor: "default",
      }}
    >
      {/* Number */}
      <span style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 12,
        fontWeight: 300,
        color: hovered ? "#C8956C" : "rgba(200,149,108,0.35)",
        letterSpacing: "0.1em",
        minWidth: 28,
        transition: "color 0.3s ease",
        flexShrink: 0,
      }}>
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Dot */}
      <span style={{
        width: hovered ? 20 : 4,
        height: 1,
        background: hovered ? "#C8956C" : "rgba(200,149,108,0.3)",
        display: "block",
        flexShrink: 0,
        transition: "width 0.4s cubic-bezier(0.4,0,0.2,1), background 0.3s ease",
      }} />

      {/* Name */}
      <span style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "clamp(18px, 1.8vw, 24px)",
        fontWeight: 300,
        color: hovered ? "#1a1614" : "rgba(23,19,17,0.75)",
        letterSpacing: "0.01em",
        lineHeight: 1,
        flex: 1,
        transition: "color 0.3s ease",
      }}>
        {name}
      </span>


    </div>
  );
}

export default function PartnersSection() {
  const { lang } = useLang();
  const c = CONTENT[lang] || CONTENT.en;
  const [ref, visible] = useReveal();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const half = Math.ceil(PARTNERS.length / 2);
  const col1 = PARTNERS.slice(0, half);
  const col2 = PARTNERS.slice(half);

  return (
    <section
      ref={ref}
      style={{
        background: "#F5EFE6",
        padding: isMobile ? "72px 6% 80px" : "100px 7% 112px",
        position: "relative",
        overflow: "hidden",
      }}
    >


      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ── Header ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 32 : 80,
          alignItems: "flex-end",
          marginBottom: isMobile ? 44 : 64,
        }}>

          {/* Left: title */}
          <div>
            <div style={{
              display: "flex", alignItems: "center", gap: 14, marginBottom: 20,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(18px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}>
              <span style={{
                width: 28, height: 1, background: "#C8956C",
                display: "inline-block", flexShrink: 0,
              }} />
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
              fontSize: "clamp(32px, 4vw, 54px)",
              fontWeight: 300,
              color: "#1a1614",
              lineHeight: 1.12,
              letterSpacing: "-0.01em",
              margin: 0,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(22px)",
              transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
            }}>
              {c.title.split("\n").map((line, i) => (
                <span key={i} style={{ display: "block" }}>{line}</span>
              ))}
            </h2>
          </div>

          {/* Right: subtitle + stat */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(22px)",
            transition: "opacity 0.7s ease 0.18s, transform 0.7s ease 0.18s",
          }}>
            <p style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: 14,
              fontWeight: 300,
              lineHeight: 1.82,
              color: "#7a6d64",
              margin: "0 0 28px",
              maxWidth: 380,
            }}>
              {c.sub}
            </p>

            {/* Stat */}
            <div style={{
              display: "flex", alignItems: "baseline", gap: 10,
              paddingTop: 24,
              borderTop: "1px solid rgba(200,149,108,0.2)",
            }}>
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(36px, 4vw, 52px)",
                fontWeight: 300,
                color: "#C8956C",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}>
                {c.count}
              </span>
              <span style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 11,
                fontWeight: 400,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(107,93,84,0.6)",
              }}>
                {c.countSub}
              </span>
            </div>
          </div>
        </div>

        {/* ── Partners list ── */}
        {isMobile ? (
          /* Mobile: single column */
          <div>
            {PARTNERS.map((name, i) => (
              <PartnerItem key={i} name={name} index={i} visible={visible} />
            ))}
          </div>
        ) : (
          /* Desktop: two columns */
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0 80px",
          }}>
            <div>
              {col1.map((name, i) => (
                <PartnerItem key={i} name={name} index={i} visible={visible} />
              ))}
            </div>
            <div>
              {col2.map((name, i) => (
                <PartnerItem key={i} name={name} index={col1.length + i} visible={visible} />
              ))}
            </div>
          </div>
        )}


      </div>
    </section>
  );
}