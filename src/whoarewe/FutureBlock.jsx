import { useState } from "react";
import { useLang } from "../language/useLanguage";
import { t } from "../language/translations";
import { useReveal, SectionHeader } from "./whoWeAreUtils";

function FutureCard({ item, index, visible }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "36px 32px",
        border: "1px solid",
        borderColor: hovered ? "rgba(200,149,108,0.5)" : "rgba(200,149,108,0.15)",
        background: hovered ? "rgba(200,149,108,0.04)" : "transparent",
        position: "relative", overflow: "hidden",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.75s ease ${200 + index * 120}ms,
                     transform 0.75s ease ${200 + index * 120}ms,
                     border-color 0.4s ease, background 0.4s ease`,
        cursor: "default",
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: "absolute", top: 0, left: 0,
        width: hovered ? "100%" : "0%",
        height: 2,
        background: "linear-gradient(to right, #C8956C, transparent)",
        transition: "width 0.55s cubic-bezier(0.4,0,0.2,1)",
      }} />

      {/* Ghost number */}
      <div style={{
        position: "absolute", bottom: -10, right: 16,
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 80, fontWeight: 300, lineHeight: 1,
        color: hovered ? "rgba(200,149,108,0.18)" : "rgba(200,149,108,0.07)",
        userSelect: "none", pointerEvents: "none",
        transition: "color 0.5s ease",
      }}>
        {String(index + 1).padStart(2, "0")}
      </div>

      <h4 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 22, fontWeight: 400,
        color: "#1a1614", lineHeight: 1.2,
        marginBottom: 14,
        transform: hovered ? "translateX(4px)" : "translateX(0)",
        transition: "transform 0.35s ease",
      }}>
        {item.label}
      </h4>

      <p style={{
        fontFamily: "'Jost', sans-serif",
        fontSize: 14, fontWeight: 300, lineHeight: 1.78,
        color: "rgba(107,93,84,0.72)", margin: 0,
      }}>
        {item.body}
      </p>
    </div>
  );
}

export default function FutureBlock() {
  const { lang } = useLang();
  const c = t[lang].whoWeAre.future;
  const [ref, visible] = useReveal();

  return (
    <section ref={ref} style={{ background: "#F8F6F2", padding: "48px 7% 40px" }}>
      <SectionHeader
        eyebrow={null}
        title={c.title}
        body={c.body}
        visible={visible}
        dark={false}
      />

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 24,
        marginTop: 16,
      }} className="who-future-grid">
        {c.initiatives.map((item, i) => (
          <FutureCard key={i} item={item} index={i} visible={visible} />
        ))}
      </div>

      {/* Footer label */}
      <div style={{
        marginTop: 40,
        display: "flex", alignItems: "center", gap: 12,
        opacity: visible ? 0.4 : 0,
        transition: "opacity 0.8s ease 0.7s",
      }}>
        <span style={{
          width: 20, height: 1,
          background: "rgba(200,149,108,0.5)",
          display: "block",
        }} />
        <span style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: 8.5, fontWeight: 400,
          letterSpacing: "0.22em", textTransform: "uppercase",
          color: "rgba(107,93,84,0.5)",
        }}>
          Soft Sands Accommodations · Est. 2022
        </span>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .who-future-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
        }
      `}</style>
    </section>
  );
}