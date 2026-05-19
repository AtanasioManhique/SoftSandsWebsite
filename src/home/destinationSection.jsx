import { useEffect, useRef, useState } from "react";
import { useLang } from "../language/useLanguage";
import { t } from "../language/translations";

import maputoImg from "../data/Destinations/Maputo.webp";
import gazaImg   from "../data/Destinations/Gaza.webp";
import inhambaneImg from "../data/Destinations/Inhambane.webp";

const DEST_IMAGES = [maputoImg, gazaImg, inhambaneImg];

function useReveal(threshold = 0.15) {
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
   DEST CARD — cinematic image card
───────────────────────────────────────────── */
function DestCard({ place, index, delay, visible }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        aspectRatio: "3 / 4",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(48px)",
        transition: `opacity 0.85s cubic-bezier(0.4,0,0.2,1) ${delay}ms,
                     transform 0.85s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
      }}
    >
      {/* ── Background image with zoom on hover ── */}
      <div
        style={{
          position: "absolute",
          inset: "-6%",
          backgroundImage: `url(${DEST_IMAGES[index]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: hovered ? "scale(1.08)" : "scale(1.0)",
          transition: "transform 1.1s cubic-bezier(0.25,0.46,0.45,0.94)",
          willChange: "transform",
        }}
      />

      {/* ── Base gradient overlay — always present ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.18) 35%, rgba(0,0,0,0.72) 75%, rgba(0,0,0,0.92) 100%)",
          transition: "opacity 0.7s ease",
        }}
      />

      {/* ── Hover overlay — reveals detail ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.18)",
          opacity: 0,
          transition: "opacity 0.7s ease",
        }}
      />

      {/* ── Top accent line — slides in on hover ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: "linear-gradient(to right, #C8956C, rgba(200,149,108,0.3))",
          transform: "scaleX(1)",
          transformOrigin: "left",
          transition: "transform 0.55s cubic-bezier(0.4,0,0.2,1)",
        }}
      />

      {/* ── Ghost number ── */}
      <div
        style={{
          position: "absolute",
          top: 20,
          right: 24,
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 96,
          fontWeight: 300,
          lineHeight: 1,
          color: "rgba(200,149,108,0.28)",
          userSelect: "none",
          pointerEvents: "none",
          transition: "color 0.6s ease, transform 0.6s ease",
          transform: "translateY(-6px)",
          letterSpacing: "-0.02em",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* ── Content block — slides up on hover ── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "0 36px 40px",
          transform: "translateY(-10px)",
          transition: "transform 0.55s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* Tag */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 14,
            opacity: 1,
            transition: "opacity 0.45s ease",
          }}
        >
          <span
            style={{
              width: 18,
              height: 1,
              background: "#C8956C",
              display: "inline-block",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: 9,
              fontWeight: 500,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#C8956C",
            }}
          >
            {place.tag}
          </span>
        </div>

        {/* Destination name */}
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(30px, 2.6vw, 42px)",
            fontWeight: 300,
            color: "#FAFAF8",
            lineHeight: 1.1,
            marginBottom: 14,
            letterSpacing: "-0.01em",
          }}
        >
          {place.name}
        </h3>

        {/* Description — fades in on hover */}
        <p
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 13.5,
            fontWeight: 300,
            lineHeight: 1.78,
            color: "rgba(255,255,255,0.78)",
            margin: 0,
            maxWidth: 320,
            opacity: 1,
            transform: "translateY(0)",
            transition:
              "opacity 0.5s ease 0.05s, transform 0.5s ease 0.05s",
          }}
        >
          {place.desc}
        </p>

        {/* Bottom divider — expands on hover */}
        <div
          style={{
            marginTop: 22,
            height: 1,
            background: `linear-gradient(to right, rgba(200,149,108,0.6), transparent)`,
            transition: "background 0.5s ease",
          }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MOBILE CARD — stack vertical
───────────────────────────────────────────── */
function MobileDestCard({ place, index, delay, visible }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setTimeout(() => setHovered(false), 800)}
      style={{
        position: "relative",
        overflow: "hidden",
        height: 280,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
      }}
    >
      {/* Image */}
      <div
        style={{
          position: "absolute",
          inset: "-4%",
          backgroundImage: `url(${DEST_IMAGES[index]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: hovered ? "scale(1.05)" : "scale(1.0)",
          transition: "transform 1s ease",
        }}
      />

      {/* Gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.65) 70%, rgba(0,0,0,0.88) 100%)",
        }}
      />

      {/* Top accent */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: 2,
          background: "linear-gradient(to right, #C8956C, rgba(200,149,108,0.2))",
        }}
      />

      {/* Ghost number */}
      <div
        style={{
          position: "absolute",
          top: 12, right: 16,
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 72, fontWeight: 300, lineHeight: 1,
          color: "rgba(200,149,108,0.2)",
          userSelect: "none", pointerEvents: "none",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Content */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 24px 28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <span style={{ width: 14, height: 1, background: "#C8956C", display: "inline-block" }} />
          <span style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 8.5, fontWeight: 500,
            letterSpacing: "0.3em", textTransform: "uppercase",
            color: "#C8956C",
          }}>
            {place.tag}
          </span>
        </div>
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 28, fontWeight: 300, color: "#FAFAF8",
          lineHeight: 1.1, marginBottom: 10,
        }}>
          {place.name}
        </h3>
        <p style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: 13, fontWeight: 300,
          lineHeight: 1.72, color: "rgba(255,255,255,0.7)",
          margin: 0,
        }}>
          {place.desc}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */
export default function DestinationsSection() {
  const { lang } = useLang();
  const tr = t[lang].destinations;
  const [sectionRef, visible] = useReveal();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#0f0c0a",
        padding: isMobile ? "72px 6% 80px" : "100px 7% 112px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle noise texture */}
      <div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E\")",
          opacity: 0.5,
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* ── Section Header ── */}
        <div style={{ marginBottom: isMobile ? 44 : 64 }}>

          {/* Eyebrow */}
          <div style={{
            display: "flex", alignItems: "center", gap: 14, marginBottom: 20,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}>
            <span style={{
              width: 30, height: 1, background: "#C8956C",
              display: "inline-block", flexShrink: 0,
            }} />
            <span style={{
              fontFamily: "'Jost', sans-serif",
              color: "#C8956C",
              fontSize: 9.5, fontWeight: 500,
              letterSpacing: "0.32em", textTransform: "uppercase",
            }}>
              {tr.eyebrow}
            </span>
          </div>

          {/* Title */}
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(34px, 4.5vw, 62px)",
              fontWeight: 300,
              color: "#FAFAF8",
              lineHeight: 1.1,
              marginBottom: 18,
              letterSpacing: "-0.01em",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(26px)",
              transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
            }}
          >
            {tr.title.split("\n").map((l, i) => (
              <span key={i} style={{ display: "block" }}>{l}</span>
            ))}
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: 15, fontWeight: 300, lineHeight: 1.75,
              color: "rgba(255,255,255,0.48)",
              maxWidth: 520,
              margin: 0,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease 0.18s, transform 0.7s ease 0.18s",
            }}
          >
            {tr.sub}
          </p>
        </div>

        {/* ── Cards Grid ── */}
        {isMobile ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {tr.places.map((place, i) => (
              <MobileDestCard
                key={i}
                place={place}
                index={i}
                delay={180 + i * 110}
                visible={visible}
              />
            ))}
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 3,
            }}
          >
            {tr.places.map((place, i) => (
              <DestCard
                key={i}
                place={place}
                index={i}
                delay={180 + i * 130}
                visible={visible}
              />
            ))}
          </div>
        )}

        {/* ── Footer label ── */}
        <div
          style={{
            marginTop: 52,
            display: "flex", alignItems: "center", gap: 12,
            opacity: visible ? 0.35 : 0,
            transition: "opacity 0.8s ease 0.6s",
          }}
        >
          <span style={{ width: 20, height: 1, background: "rgba(200,149,108,0.5)", display: "block" }} />
        
        </div>
      </div>
    </section>
  );
}