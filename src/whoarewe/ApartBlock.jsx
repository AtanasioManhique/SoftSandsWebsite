import { useState } from "react";
import { useLang } from "../language/useLanguage";
import { t } from "../language/translations";
import { useReveal, SectionHeader } from "../whoarewe/whoWeAreUtils";

function ApartItem({ item, index, visible, isLast }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "32px 0",
        borderBottom: isLast ? "none" : "1px solid rgba(200,149,108,0.15)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(24px)",
        transition: `opacity 0.7s ease ${150 + index * 100}ms,
                     transform 0.7s ease ${150 + index * 100}ms`,
        cursor: "default",
      }}
    >
      <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>

        {/* Number badge */}
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          border: `1px solid ${hovered ? "#C8956C" : "rgba(200,149,108,0.3)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
          background: hovered ? "rgba(200,149,108,0.08)" : "transparent",
          transition: "all 0.35s ease",
        }}>
          <span style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 9, fontWeight: 500,
            letterSpacing: "0.1em",
            color: hovered ? "#C8956C" : "rgba(200,149,108,0.6)",
            transition: "color 0.35s ease",
          }}>
            {item.num}
          </span>
        </div>

        <div style={{ flex: 1 }}>
          <h4 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 25, fontWeight: 400,
            color: hovered ? "#1a1614" : "#3d2e28",
            lineHeight: 1.2, marginBottom: 10,
            transform: hovered ? "translateX(4px)" : "translateX(0)",
            transition: "all 0.35s ease",
          }}>
            {item.label}
          </h4>
          <p style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 15, fontWeight: 300, lineHeight: 1.78,
            color: "rgba(107,93,84,0.72)",
            margin: 0,
          }}>
            {item.body}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ApartBlock() {
  const { lang } = useLang();
  const c = t[lang].whoWeAre.apart;
  const [ref, visible] = useReveal();

  return (
    <section ref={ref} style={{ background: "#F8F6F2", padding: "96px 7%" }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "0 80px",
        alignItems: "start",
      }} className="who-apart-grid">

        {/* Left — sticky header */}
         <div style={{ position: "sticky", top: 100 }}>
  <SectionHeader
    eyebrow={c.eyebrow}
    title={c.title}
    visible={visible}
    dark={false}
  />

  <p style={{
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 22,
    fontStyle: "italic",
    fontWeight: 300,
    color: "rgba(107,93,84,0.75)",
    lineHeight: 1.5,
    marginTop: -24,
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(18px)",
    transition: "opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s",
  }}>
    {c.body}
  </p>
</div>

        {/* Right — items */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {c.items.map((item, i) => (
            <ApartItem
              key={i}
              item={item}
              index={i}
              visible={visible}
              isLast={i === c.items.length - 1}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .who-apart-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}