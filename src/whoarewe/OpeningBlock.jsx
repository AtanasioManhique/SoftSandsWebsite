import { useLang } from "../language/useLanguage";
import { t } from "../language/translations";
import { useReveal, SectionHeader } from "./whoWeAreUtils";
import img1 from "../data/whoWeAre.png";

const IMAGE_SRC = img1;
export default function OpeningBlock() {
  const { lang } = useLang();
  const c = t[lang].whoWeAre.opening;
  const [ref, visible] = useReveal();

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        padding: "130px 7% 90px",
        overflow: "hidden",
        minHeight: "auto",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* ── Background image ── */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url(${IMAGE_SRC})`,
        backgroundSize: "cover",
        backgroundPosition: "center 35%",
        transform: visible ? "scale(1)" : "scale(1.06)",
        transition: "transform 2.8s cubic-bezier(0.4,0,0.2,1)",
      }} />

      {/* ── Overlay — warm cinematic gradient, not too dark ── */}
      <div style={{
        position: "absolute", inset: 0,
        background: [
          "linear-gradient(to right,  rgba(15,12,10,0.82) 0%, rgba(15,12,10,0.55) 55%, rgba(15,12,10,0.25) 100%)",
          "linear-gradient(to bottom, rgba(15,12,10,0.3)  0%, rgba(15,12,10,0.0)  40%, rgba(15,12,10,0.55) 100%)",
        ].join(", "),
      }} />

      {/* ── Subtle warm glow — top right ── */}
      <div style={{
        position: "absolute",
        top: -80, right: -60,
        width: 480, height: 480,
        borderRadius: "50%",
        background: "rgba(200,149,108,0.07)",
        filter: "blur(100px)",
        pointerEvents: "none",
      }} />

      {/* ── Content ── */}
      <div
        style={{
          position: "relative", zIndex: 2,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0 80px",
          alignItems: "start",
          width: "100%",
        }}
        className="who-opening-grid"
      >

        {/* ════ LEFT ════ */}
        <div>
          {/* Eyebrow */}
          <div style={{
            display: "flex", alignItems: "center", gap: 14,
            marginBottom: 28,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(-16px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}>
            <span style={{
              display: "inline-block", width: 28, height: 1,
              background: "#C8956C", flexShrink: 0,
            }} />
            <span style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: 10, fontWeight: 500,
              letterSpacing: "0.3em", textTransform: "uppercase",
              color: "#C8956C",
            }}>
              {c.eyebrow}
            </span>
          </div>

          {/* Main title — narrow, strong */}
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(38px, 4.5vw, 62px)",
            fontWeight: 300, lineHeight: 1.1,
            color: "#FAFAF8",
            maxWidth: 440,
            marginBottom: 0,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(22px)",
            transition: "opacity 0.85s ease 0.1s, transform 0.85s ease 0.1s",
          }}>
            {c.title.split("\n").map((line, i) => (
              <span key={i} style={{ display: "block" }}>{line}</span>
            ))}
          </h1>

          {/* Decorative separator */}
          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            marginTop: 36, marginBottom: 0,
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease 0.3s",
          }}>
            <span style={{
              display: "block", width: 32, height: 1,
              background: "rgba(200,149,108,0.45)",
            }} />
            <span style={{
              width: 4, height: 4, borderRadius: "50%",
              background: "#C8956C", opacity: 0.6,
            }} />
          </div>

          {/* Luxury pull quote — below title */}
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(20px, 2.2vw, 26px)",
            fontWeight: 300, fontStyle: "italic",
            lineHeight: 1.45,
            color: "rgba(222,184,150,0.85)",
            maxWidth: 400,
            marginTop: 28, marginBottom: 0,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(18px)",
            transition: "opacity 0.85s ease 0.4s, transform 0.85s ease 0.4s",
          }}>
            {c.t0}<br />
            {c.t1}
          </p>
        </div>

        {/* ════ RIGHT ════ */}
        <div style={{ paddingTop: 8 }}>

          {/* Vertical gold line */}
          <div className="opening-gold-line" style={{
            width: 1, height: 56,
            background: "linear-gradient(to bottom, rgba(200,149,108,0.9), rgba(200,149,108,0.08))",
            marginBottom: 32,
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease 0.35s",
          }} />

          {/* Primary paragraph — larger, brighter */}
          <p style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 17, fontWeight: 300, lineHeight: 1.95,
            color: "rgba(255,255,255,0.78)",
            maxWidth: 460, marginBottom: 28,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease 0.45s, transform 0.8s ease 0.45s",
          }}>
            {c.body.split(".").slice(0, 2).join(".") + "."}
          </p>

          {/* Secondary paragraph — softer */}
          <p style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 15, fontWeight: 300, lineHeight: 1.9,
            color: "rgba(255,255,255,0.45)",
            maxWidth: 420, marginBottom: 0,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease 0.58s, transform 0.8s ease 0.58s",
          }}>
            {c.body.split(".").slice(2).join(".").trim()}
          </p>

        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .who-opening-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .opening-gold-line {
            display: none !important;
          }
        }
        @media (max-width: 640px) {
          section {
            padding: 110px 6% 70px !important;
          }
        }
      `}</style>
    </section>
  );
}