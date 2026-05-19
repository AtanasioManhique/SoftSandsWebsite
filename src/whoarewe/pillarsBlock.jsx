import { useState, useEffect } from "react";
import { useLang } from "../language/useLanguage";
import {t} from "../language/translations";
import { useReveal, SectionHeader } from "./whoWeAreUtils";

function PillarCard({ item, index, visible, className, inlineStyle, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative", overflow: "hidden",
        cursor: "default",
        ...inlineStyle
      }}
    >
      {/* Ghost number */}
      <div style={{
        position: "absolute", top: -8, right: 20,
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 100, fontWeight: 300, lineHeight: 1,
        color: "rgba(200,149,108,0.1)",
        userSelect: "none", pointerEvents: "none",
        transition: "color 0.5s ease",
      }}>
        {item.num}
      </div>

      {/* Accent line */}
      <div style={{
        width: hovered ? "100%" : "32px",
        height: 1,
        background: "#C8956C",
        marginBottom: 28,
        transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)",
      }} />

      <h3 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 26, fontWeight: 400,
        color: "#1a1614",
        lineHeight: 1.15, marginBottom: 16,
        transition: "color 0.4s ease",
      }}>
        {item.label}
      </h3>

      <p style={{
        fontFamily: "'Jost', sans-serif",
        fontSize: 14, fontWeight: 300, lineHeight: 1.8,
        color: "rgba(107,93,84,0.75)",
        margin: 0,
        transition: "color 0.4s ease",
      }}>
        {item.body}
      </p>
    </div>
  );
}

export default function PillarsBlock() {
  const { lang } = useLang();
  const c = t[lang].whoWeAre.pillars; 
  const [ref, visible] = useReveal();

  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 860);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % c.items.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isMobile, c.items.length]);

  const [touchStart, setTouchStart] = useState(null);
  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchEnd = (e) => {
    if (!touchStart || !isMobile) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) setActive((prev) => (prev + 1) % c.items.length);
    else if (diff < -50) setActive((prev) => (prev - 1 + c.items.length) % c.items.length);
    setTouchStart(null);
  };

  return (
    <section ref={ref} className="pillars-section" style={{ background: "#EDE9E3", position: "relative", overflow: "hidden" }}>
      <SectionHeader eyebrow={c.eyebrow} title={c.title} visible={visible} dark={false} />

      {/* Slider Container for Mobile, standard wrapper for Desktop */}
      <div 
        className="pillars-slider-wrapper"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="who-pillars-grid"
          style={{
            transform: isMobile ? `translateX(-${active * 100}%)` : "none",
          }}
        >
          {c.items.map((item, i) => {
            const inlineStyle = !isMobile
              ? {
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(32px)",
                  transition: `opacity 0.75s ease ${200 + i * 120}ms, transform 0.75s ease ${200 + i * 120}ms`,
                }
              : {};

            return (
              <PillarCard 
                key={i} 
                item={item} 
                index={i} 
                visible={visible}
                className="pillar-card"
                inlineStyle={inlineStyle}
              />
            );
          })}
        </div>
      </div>

      {/* Dots for mobile navigation */}
      {isMobile && (
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 16 }}>
          {c.items.map((_, i) => (
            <div 
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: 8, height: 8, borderRadius: "50%",
                background: i === active ? "#C8956C" : "rgba(200,149,108,0.3)",
                transition: "background 0.3s ease",
                cursor: "pointer"
              }}
            />
          ))}
        </div>
      )}

      <style>{`
        .pillars-section {
          padding: 64px 7% 48px;
        }

        .pillars-slider-wrapper {
          width: 100%;
          overflow: hidden;
          position: relative;
        }

        .who-pillars-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .pillar-card {
          background: #F8F6F2;
          padding: 44px 36px 40px;
          border-radius: 16px;
          width: 100%;
        }

        @media (max-width: 860px) {
          .pillars-section {
            padding: 40px 6% 24px;
          }
          .who-pillars-grid { 
            display: flex !important;
            gap: 0;
            width: 100%;
          }
          .pillar-card {
            flex: 0 0 100%;
            min-width: 100%;
            padding: 32px 24px;
            background: #FFFFFF;
            border: 1px solid rgba(0,0,0,0.04);
            box-shadow: 0 4px 20px rgba(0,0,0,0.03);
          }
        }
      `}</style>
    </section>
  );
}