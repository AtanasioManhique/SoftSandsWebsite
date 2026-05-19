import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   HOOK — reveal on scroll
───────────────────────────────────────────── */
export function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ─────────────────────────────────────────────
   SHARED — Section Header
───────────────────────────────────────────── */
export function SectionHeader({ eyebrow, title, body, visible, delay = 0, dark = false }) {
  const textColor = dark ? "#FAFAF8" : "#1a1614";
  const mutedColor = dark ? "rgba(255,255,255,0.52)" : "rgba(107,93,84,0.65)";

  return (
    <div style={{ marginBottom: body ? 48 : 56 }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 14, marginBottom: 20,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}>
        <span style={{ width: 28, height: 1, background: "#C8956C", display: "inline-block", flexShrink: 0 }} />
        <span style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: 9.5, fontWeight: 500,
          letterSpacing: "0.32em", textTransform: "uppercase",
          color: "#C8956C",
        }}>
          {eyebrow}
        </span>
      </div>

      <h2 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "clamp(32px, 3.8vw, 54px)",
        fontWeight: 300, lineHeight: 1.1,
        color: textColor,
        letterSpacing: "-0.01em",
        marginBottom: body ? 20 : 0,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(22px)",
        transition: `opacity 0.7s ease ${delay + 80}ms, transform 0.7s ease ${delay + 80}ms`,
      }}>
        {title.split("\n").map((l, i) => <span key={i} style={{ display: "block" }}>{l}</span>)}
      </h2>

      {body && (
        <p style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: 15, fontWeight: 300, lineHeight: 1.8,
          color: mutedColor, maxWidth: 620, margin: 0,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(18px)",
          transition: `opacity 0.7s ease ${delay + 160}ms, transform 0.7s ease ${delay + 160}ms`,
        }}>
          {body}
        </p>
      )}
    </div>
  );
}