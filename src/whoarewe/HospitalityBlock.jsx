import { useState } from "react";
import { useLang } from "../language/useLanguage";
import { t } from "../language/translations";
import { useReveal, SectionHeader } from "./whoWeAreUtils";
import hospImg from "../data/10.jpg";

function HospCard({ side, index, visible }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "48px 44px 52px",
        background: hovered
          ? "rgba(255,255,255,0.07)"
          : "rgba(255,255,255,0.03)",
        border: "1px solid",
        borderColor: hovered
          ? "rgba(200,149,108,0.45)"
          : "rgba(255,255,255,0.08)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered ? "translateY(-6px)" : "translateY(0)"
          : "translateY(32px)",
        transition: `
          opacity 0.85s ease ${220 + index * 150}ms,
          transform 0.85s ease ${220 + index * 150}ms,
          background 0.45s ease,
          border-color 0.45s ease
        `,
        cursor: "default",
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: "absolute", top: 0, left: 0,
        height: 1,
        width: hovered ? "100%" : "0%",
        background: "linear-gradient(to right, #C8956C, transparent)",
        transition: "width 0.6s cubic-bezier(0.4,0,0.2,1)",
      }} />

      {/* Title */}
      <h3 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "clamp(26px, 2.4vw, 34px)",
        fontWeight: 300, lineHeight: 1.15,
        color: hovered ? "#FAFAF8" : "rgba(255,255,255,0.88)",
        marginBottom: 20,
        transform: hovered ? "translateX(6px)" : "translateX(0)",
        transition: "transform 0.4s ease, color 0.4s ease",
      }}>
        {side.label}
      </h3>

      {/* Divider */}
      <div style={{
        width: hovered ? 48 : 28, height: 1,
        background: "rgba(200,149,108,0.5)",
        marginBottom: 20,
        transition: "width 0.4s ease",
      }} />

      {/* Body */}
      <p style={{
        fontFamily: "'Jost', sans-serif",
        fontSize: 14.5, fontWeight: 300, lineHeight: 1.9,
        color: hovered ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.5)",
        margin: 0,
        transition: "color 0.4s ease",
      }}>
        {side.body}
      </p>
    </div>
  );
}

export default function HospitalityBlock() {
  const { lang } = useLang();
  const c = t[lang].whoWeAre.hospitality;
  const [ref, visible] = useReveal();

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "auto",
        padding: "80px 7%",
      }}
    >
      {/* ── Background image ── */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url(${hospImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center 30%",
        transform: "scale(1.03)",
        zIndex: 0,
      }} />

      {/* ── Dark overlay — gradiente cinematográfico ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: `
          linear-gradient(
            to bottom,
            rgba(10,8,6,0.72) 0%,
            rgba(10,8,6,0.55) 40%,
            rgba(10,8,6,0.78) 100%
          )
        `,
      }} />

      {/* ── Lateral vignette ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.45) 100%)",
      }} />

      {/* ── Warm tone overlay — puxa os dourados do pôr do sol ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: "linear-gradient(135deg, rgba(200,149,108,0.06) 0%, transparent 60%)",
      }} />

      {/* ── Content ── */}
      <div style={{ position: "relative", zIndex: 2 }}>

        {/* Header */}
        <div style={{ maxWidth: 680, marginBottom: 72 }}>
          <SectionHeader
            eyebrow={c.eyebrow}
            title={c.title}
            body={c.body}
            visible={visible}
            dark={true}
          />
        </div>

        {/* Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          maxWidth: 1000,
        }} className="who-hosp-grid">
          {c.sides.map((side, i) => (
            <div key={i}>
              <HospCard side={side} index={i} visible={visible} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .who-hosp-grid {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
        }
      `}</style>
    </section>
  );
}