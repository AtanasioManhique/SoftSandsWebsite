import { useLang } from "../language/useLanguage";
import { useReveal } from "../whoarewe/whoWeAreUtils";

const CONTENT = {
  en: {
    eyebrow: "Contact Us",
    title: "Let's plan\nyour escape.",
    sub: "No forms, no bots. Just a real conversation with our team — we're here to help you find the perfect stay.",
  },
  pt: {
    eyebrow: "Contacto",
    title: "Vamos planear\na sua escapada.",
    sub: "Sem formulários, sem bots. Apenas uma conversa real com a nossa equipa — estamos aqui para o ajudar a encontrar a estadia perfeita.",
  },
};

export default function ContactOpening() {
  const { lang } = useLang();
  const c = CONTENT[lang] || CONTENT.en;
  const [ref, visible] = useReveal();

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        paddingTop: 80,        /* altura da navbar desktop */
        paddingBottom: 48,
        paddingLeft: "7%",
        paddingRight: "7%",
        overflow: "hidden",
        minHeight: "40vh",
        display: "flex",
        flexDirection: "column",
        background: "#24201d",
      }}
    >
      {/* Warm radial glow */}
      <div style={{
        position: "absolute",
        top: "20%", right: "15%",
        width: 500, height: 400,
        borderRadius: "50%",
        background: "rgba(200,149,108,0.08)",
        filter: "blur(110px)",
        pointerEvents: "none",
      }} />

      {/* Subtle decorative rings */}
      <div style={{
        position: "absolute",
        bottom: -100, left: "8%",
        width: 380, height: 380,
        borderRadius: "50%",
        border: "1px solid rgba(200,149,108,0.07)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        bottom: -160, left: "4%",
        width: 560, height: 560,
        borderRadius: "50%",
        border: "1px solid rgba(200,149,108,0.04)",
        pointerEvents: "none",
      }} />

      {/* Navbar spacer — empurra o conteúdo para baixo da navbar */}
      <div style={{ height: 80 }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: 640 }}>

        {/* Title */}
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(44px, 6vw, 82px)",
          fontWeight: 300, lineHeight: 1.07,
          color: "#FAFAF8",
          marginBottom: 24,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.85s ease 0.12s, transform 0.85s ease 0.12s",
        }}>
          {c.title.split("\n").map((line, i) => (
            <span key={i} style={{ display: "block" }}>
              {i === 1
                ? <em style={{ fontStyle: "italic", color: "#DEB896" }}>{line}</em>
                : line}
            </span>
          ))}
        </h1>

        {/* Sub */}
        <p style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: "clamp(14px, 1.35vw, 17px)",
          fontWeight: 300, lineHeight: 1.8,
          color: "rgba(255,255,255,0.52)",
          maxWidth: 460, margin: 0,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.85s ease 0.25s, transform 0.85s ease 0.25s",
        }}>
          {c.sub}
        </p>
      </div>

    </section>
  );
}