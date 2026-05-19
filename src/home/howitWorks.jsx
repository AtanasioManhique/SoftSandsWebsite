import { useEffect, useRef, useState } from "react";
import { useLang } from "../language/useLanguage";
import { t } from "../language/translations";

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

export default function HowItWorks() {
  const { lang } = useLang();
  const tr = t[lang].howItWorks;
  const [ref, visible] = useReveal();
  const [lineProgress, setLineProgress] = useState(0);

  useEffect(() => {
    if (visible) {
      const start = Date.now();
      const dur = 1200;
      const tick = () => {
        const p = Math.min((Date.now() - start) / dur, 1);
        setLineProgress(p);
        if (p < 1) requestAnimationFrame(tick);
      };
      const id = setTimeout(() => requestAnimationFrame(tick), 400);
      return () => clearTimeout(id);
    }
  }, [visible]);

  return (
    <section ref={ref} style={{
      background: "#F5EFE6",
      padding: "100px 7%",
      fontFamily: "'Jost', sans-serif",
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 72 }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 20,
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}>
          <span style={{ width: 30, height: 1, background: "#C8956C", display: "inline-block" }} />
          <span style={{ color: "#C8956C", fontSize: 10, fontWeight: 500, letterSpacing: "0.3em", textTransform: "uppercase" }}>
            {tr.eyebrow}
          </span>
          <span style={{ width: 30, height: 1, background: "#C8956C", display: "inline-block" }} />
        </div>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(34px, 4.5vw, 58px)", fontWeight: 300,
          color: "#1a1614", lineHeight: 1.12,
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
        }}>
          {tr.title.split("\n").map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>)}
        </h2>
      </div>

      {/* Steps with connecting line */}
      <div style={{ position: "relative" }}>
        {/* Connecting line (desktop) */}
        <div style={{
          position: "absolute", top: 28, left: "12.5%", right: "12.5%", height: 1,
          background: "rgba(200,149,108,0.15)",
          overflow: "hidden",
        }} className="step-line">
          <div style={{
            height: "100%",
            background: "#C8956C",
            width: `${lineProgress * 100}%`,
            transition: "width 0.05s linear",
          }} />
        </div>

        {/* Steps grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 40 }} className="steps-grid">
          {tr.steps.map((step, i) => (
            <div key={i} style={{
              display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
              opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)",
              transition: `opacity 0.7s ease ${300 + i * 150}ms, transform 0.7s ease ${300 + i * 150}ms`,
            }}>
              {/* Circle */}
              <div style={{
                width: 56, height: 56, borderRadius: "50%",
                background: "#1a1614", border: "1px solid #C8956C",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 24, position: "relative", zIndex: 1,
              }}>
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 18, fontWeight: 400, color: "#C8956C",
                }}>
                  {step.num}
                </span>
              </div>

              <h4 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 22, fontWeight: 400, color: "#1a1614",
                marginBottom: 10, lineHeight: 1.2,
              }}>
                {step.title}
              </h4>
              <p style={{
                fontSize: 13.5, fontWeight: 300, lineHeight: 1.75,
                color: "#7a6a60",
              }}>
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .steps-grid { grid-template-columns: repeat(2,1fr) !important; gap: 32px !important; }
          .step-line { display: none !important; }
        }
        @media (max-width: 480px) {
          .steps-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}