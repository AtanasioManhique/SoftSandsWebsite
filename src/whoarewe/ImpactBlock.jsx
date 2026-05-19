import { useState } from "react";
import { useLang } from "../language/useLanguage";
import { t } from "../language/translations";
import { useReveal, SectionHeader } from "./whoWeAreUtils";

function ImpactCard({ item, index, visible }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#F8F6F2" : "rgba(248,246,242,0.55)",
        padding: "40px 36px",
        borderLeft: `2px solid ${hovered ? "#C8956C" : "transparent"}`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${150 + index * 100}ms,
                     transform 0.7s ease ${150 + index * 100}ms,
                     background 0.4s ease, border-color 0.4s ease`,
        cursor: "default",
      }}
    >
      <span style={{
        fontFamily: "'Jost', sans-serif",
        fontSize: 9, fontWeight: 500,
        letterSpacing: "0.28em", textTransform: "uppercase",
        color: "#C8956C", display: "block", marginBottom: 14,
      }}>
        {String(index + 1).padStart(2, "0")}
      </span>

      <h4 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 24, fontWeight: 500,
        color: "#1a1614",
        lineHeight: 1.2, marginBottom: 12,
        transform: hovered ? "translateX(4px)" : "translateX(0)",
        transition: "all 0.35s ease",
      }}>
        {item.label}
      </h4>

      <p style={{
        fontFamily: "'Jost', sans-serif",
        fontSize: 15, fontWeight: 400, lineHeight: 1.78,
        color: "#3a2c26", margin: 0,
      }}>
        {item.body}
      </p>
    </div>
  );
}

export default function ImpactBlock() {
  const { lang } = useLang();
  const c = t[lang].whoWeAre.impact;
  const [ref, visible] = useReveal();

  return (
    <section ref={ref} style={{ background: "#EDE9E3", padding: "48px 7% 40px" }}>
      <SectionHeader
        eyebrow={null}
        title={c.title}
        body={c.body}
        visible={visible}
        dark={false}
      />

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "2px",
        marginTop: 8,
      }} className="who-impact-grid">
        {c.items.map((item, i) => (
          <ImpactCard key={i} item={item} index={i} visible={visible} />
        ))}
      </div>

      <style>{`
        @media (max-width: 700px) {
          .who-impact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}