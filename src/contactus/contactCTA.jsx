import { useState } from "react";
import { useLang } from "../language/useLanguage";
import { useReveal } from "../whoarewe/whoWeAreUtils";

const CONTENT = {
  en: {
    line: "Your Mozambique story starts with one message.",
    sub: "No forms. No waiting. Just us.",
      t0: "Your",
      t1: "Mozambique story",
      t2: "starts with",
      t3: "one message",
    buttons: [
      {
        label: "Message us on WhatsApp",
        href: "https://wa.me/258875941153",
        primary: true,
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="currentColor"/>
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.656 1.438 5.168L2 22l4.978-1.404A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          </svg>
        ),
      },
      {
        label: "DM on Instagram",
        href: "https://www.instagram.com/softsands.mz/",
        primary: false,
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="2" width="20" height="20" rx="5"/>
            <circle cx="12" cy="12" r="5"/>
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
          </svg>
        ),
      },
    ],
  },
  pt: {
    line: "A sua história em Moçambique começa com uma mensagem.",
    sub: "Sem formulários. Sem esperas. Só nós.",
     t0: "Sua",
     t1: "história em Moçambique",
     t2: "começa com",
     t3: "uma mensagem.",  
    buttons: [
      {
        label: "Fale connosco no WhatsApp",
        href: "https://wa.me/258875941153",
        primary: true,
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="currentColor"/>
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.656 1.438 5.168L2 22l4.978-1.404A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          </svg>
        ),
      },
      {
        label: "DM no Instagram",
        href: "https://www.instagram.com/softsands.mz/",
        primary: false,
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="2" width="20" height="20" rx="5"/>
            <circle cx="12" cy="12" r="5"/>
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
          </svg>
        ),
      },
    ],
  },
};

function CtaButton({ btn, delay, visible }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={btn.href}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        fontFamily: "'Jost', sans-serif",
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        textDecoration: "none",
        padding: "16px 36px",
        cursor: "pointer",
        background: btn.primary
          ? hovered ? "#DEB896" : "#C8956C"
          : "transparent",
        color: btn.primary
          ? "#1a1614"
          : hovered ? "#C8956C" : "rgba(255,255,255,0.55)",
        border: btn.primary
          ? "1px solid transparent"
          : `1px solid ${hovered ? "rgba(200,149,108,0.6)" : "rgba(255,255,255,0.18)"}`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: [
          `opacity 0.75s ease ${delay}ms`,
          `transform 0.75s ease ${delay}ms`,
          "background 0.3s ease",
          "color 0.3s ease",
          "border-color 0.3s ease",
        ].join(", "),
      }}
    >
      <span style={{
        color: btn.primary
          ? "#1a1614"
          : hovered ? "#C8956C" : "rgba(255,255,255,0.4)",
        transition: "color 0.3s ease",
        display: "flex",
        alignItems: "center",
      }}>
        {btn.icon}
      </span>
      {btn.label}
      <span style={{
        fontSize: 14,
        transform: hovered ? "translateX(4px)" : "translateX(0)",
        transition: "transform 0.3s ease",
      }}>→</span>
    </a>
  );
}

export default function ContactCTA() {
  const { lang } = useLang();
  const c = CONTENT[lang] || CONTENT.en;
  const [ref, visible] = useReveal(0.2);

  return (
    <section
      ref={ref}
      style={{
        background: "#24201d",
        padding: "100px 7% 110px",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* Warm radial glow */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 600, height: 400,
        borderRadius: "50%",
        background: "rgba(200,149,108,0.07)",
        filter: "blur(120px)",
        pointerEvents: "none",
      }} />

      {/* Decorative rings */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 520, height: 520,
        borderRadius: "50%",
        border: "1px solid rgba(200,149,108,0.06)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 760, height: 760,
        borderRadius: "50%",
        border: "1px solid rgba(200,149,108,0.03)",
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* Ornament */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: 14, marginBottom: 40,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.7s ease 0.1s",
        }}>
          <span style={{ width: 36, height: 1, background: "rgba(200,149,108,0.3)", display: "block" }} />
          <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#C8956C", opacity: 0.5 }} />
          <span style={{ width: 36, height: 1, background: "rgba(200,149,108,0.3)", display: "block" }} />
        </div>

        {/* Main line */}
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(28px, 4vw, 56px)",
          fontWeight: 300,
          color: "#FAFAF8",
          lineHeight: 1.18,
          letterSpacing: "-0.01em",
          maxWidth: 680,
          margin: "0 auto 48px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(22px)",
          transition: "opacity 0.85s ease 0.18s, transform 0.85s ease 0.18s",
        }}>
          {c.t0}{" "}
          <em style={{ fontStyle: "italic", color: "#DEB896" }}>{c.t1}</em>
          {" "}{c.t2}{" "}
          <em style={{ fontStyle: "italic", color: "#DEB896" }}>{c.t3}</em>
        </h2>

        {/* Buttons */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          flexWrap: "wrap",
        }}>
          {c.buttons.map((btn, i) => (
            <CtaButton key={i} btn={btn} delay={320 + i * 110} visible={visible} />
          ))}
        </div>

        {/* Sub */}
        <p style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: 11,
          fontWeight: 300,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.22)",
          marginTop: 28,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.7s ease 0.55s",
        }}>
          {c.sub}
        </p>
      </div>

      <style>{`
        @media (max-width: 520px) {
          .cta-row a {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}