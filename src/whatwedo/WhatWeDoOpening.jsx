import { useLang } from "../language/useLanguage";
import { useReveal } from "../whoarewe/whoWeAreUtils";
import img2 from "../data/whatwedo.png";

const IMAGE_SRC = img2;
const CONTENT = {
  en: {
    eyebrow: "What We Do",
    title: "We curate exceptional\nbeach house experiences.",
    sub: "From the first message to the final goodbye — we handle every detail so you can focus on what matters most.",
  },
  pt: {
    eyebrow: "O Que Fazemos",
    title: "Selecionamos cuidadosamente experiências únicas\nem casas de praia.",
    sub: "Desde a primeira mensagem até à despedida final — tratamos de cada detalhe para que se possa focar no que mais importa.",
  },
};

export default function WhatWeDoOpening() {
  const { lang } = useLang();
  const c = CONTENT[lang] || CONTENT.en;
  const [ref, visible] = useReveal();

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        padding: "160px 7% 90px",
        overflow: "hidden",
        minHeight: "65vh",
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      {/* ── Background image ── */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url(${IMAGE_SRC})`,
        backgroundSize: "cover",
        backgroundPosition: "center 40%",
        transform: visible ? "scale(1)" : "scale(1.05)",
        transition: "transform 2.8s cubic-bezier(0.4,0,0.2,1)",
      }} />

      {/* ── Cinematic overlay — stronger at bottom where text sits ── */}
      <div style={{
        position: "absolute", inset: 0,
        background: [
          "linear-gradient(to bottom, rgba(10,8,6,0.45) 0%, rgba(10,8,6,0.15) 35%, rgba(10,8,6,0.72) 75%, rgba(10,8,6,0.92) 100%)",
          "linear-gradient(to right,  rgba(10,8,6,0.35) 0%, transparent 60%)",
        ].join(", "),
      }} />

      {/* ── Subtle warm glow bottom left ── */}
      <div style={{
        position: "absolute",
        bottom: -40, left: "8%",
        width: 360, height: 360,
        borderRadius: "50%",
        background: "rgba(200,149,108,0.1)",
        filter: "blur(90px)",
        pointerEvents: "none",
      }} />

      {/* ── Content — anchored to bottom ── */}
      <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 680 }}>

      

        {/* Title */}
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(38px, 5.5vw, 74px)",
          fontWeight: 300, lineHeight: 1.08,
          color: "#FAFAF8",
          marginBottom: 20,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.85s ease 0.2s, transform 0.85s ease 0.2s",
        }}>
          {c.title.split("\n").map((line, i) => (
            <span key={i} style={{ display: "block" }}>
              {i === 1
                ? <em style={{ fontStyle: "italic", color: "#DEB896" }}>{line}</em>
                : line}
            </span>
          ))}
        </h1>

        {/* Sub */}
        <p style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: "clamp(14px, 1.35vw, 16.5px)",
          fontWeight: 300, lineHeight: 1.8,
          color: "rgba(255,255,255,0.58)",
          maxWidth: 480,
          margin: 0,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.85s ease 0.34s, transform 0.85s ease 0.34s",
        }}>
          {c.sub}
        </p>
      </div>

      <style>{`
        @media (max-width: 640px) {
          section {
            padding: 160px 6% 80px !important;
            min-height: 65vh !important;
          }
        }
      `}</style>
    </section>
  );
}