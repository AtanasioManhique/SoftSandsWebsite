import { useLang } from "../language/useLanguage";
import { useReveal } from "../whoarewe/whoWeAreUtils";

const CONTENT = {
  en: {
    eyebrow: "The Problem We Solve",
    title: "A gap that needed\nto be closed.",
    problem: "Despite Mozambique's many beautiful beach destinations, domestic tourism still faces a critical gap — connecting homeowners with travelers, and ensuring that experience is safe, reliable, and genuinely good.",
    consequence: "This disconnect opens the door for opportunists to exploit unsuspecting guests. Travelers get burned. Homeowners lose trust. The potential of Mozambique's coastline goes unrealised.",
    solution: {
      label: "Our Answer",
      text: "Soft Sands closes that gap. We built a secure, transparent platform that creates genuine, trustworthy connections — so every stay is exactly what was promised.",
    },
  },
  pt: {
    eyebrow: "O Problema que Resolvemos",
    title: "Uma lacuna que precisava\nde ser fechada.",
    problem: "Apesar dos muitos destinos de praia deslumbrantes de Moçambique, o turismo doméstico ainda enfrenta uma lacuna crítica — ligar proprietários a viajantes e garantir que essa experiência é segura, fiável e genuinamente boa.",
    consequence: "Esta desconexão abre portas a oportunistas que exploram hóspedes desprevenidos. Os viajantes ficam desiludidos. Os proprietários perdem a confiança. O potencial da costa de Moçambique fica por realizar.",
    solution: {
      label: "A Nossa Resposta",
      text: "A Soft Sands fecha essa lacuna. Criámos uma plataforma segura e transparente que cria ligações genuínas e de confiança — para que cada estadia seja exatamente o que foi prometido.",
    },
  },
};

export default function ProblemBlock() {
  const { lang } = useLang();
  const c = CONTENT[lang] || CONTENT.en;
  const [ref, visible] = useReveal(0.12);

  return (
    <section
      ref={ref}
      className="problem-section"
      style={{
        background: "#F8F6F2",
        padding: "48px 8% 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle decorative line left */}
      <div style={{
        position: "absolute",
        left: 0, top: "15%", bottom: "15%",
        width: 3,
        background: "linear-gradient(to bottom, transparent, #C8956C, transparent)",
        opacity: 0.3,
      }} />

      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.2fr",
          gap: "0 80px",
          alignItems: "start",
        }} className="problem-grid">

          {/* LEFT — header */}
          <div style={{ position: "sticky", top: 120 }}>
            {/* Eyebrow */}
            <div style={{
              display: "flex", alignItems: "center", gap: 14,
              marginBottom: 28,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-16px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}>
              <span style={{ display: "inline-block", width: 28, height: 1, background: "#C8956C" }} />
              <span style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 10, fontWeight: 500,
                letterSpacing: "0.3em", textTransform: "uppercase",
                color: "#C8956C",
              }}>{c.eyebrow}</span>
            </div>

            {/* Title */}
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(34px, 4vw, 54px)",
              fontWeight: 300, lineHeight: 1.1,
              color: "#1a1614",
              maxWidth: 380,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.85s ease 0.1s, transform 0.85s ease 0.1s",
            }}>
              {c.title.split("\n").map((line, i) => (
                <span key={i} style={{ display: "block" }}>{line}</span>
              ))}
            </h2>
          </div>

          {/* RIGHT — content */}
          <div style={{ paddingTop: 8 }}>

            {/* Problem paragraph */}
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(20px, 2vw, 26px)",
              fontWeight: 300, lineHeight: 1.65, fontStyle: "italic",
              color: "rgba(26,22,20,0.82)",
              marginBottom: 32,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
            }}>
              "{c.problem}"
            </p>

            {/* Consequence — softer */}
            <p style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: 15, fontWeight: 300, lineHeight: 1.9,
              color: "rgba(107,93,84,0.75)",
              marginBottom: 48,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s ease 0.32s, transform 0.8s ease 0.32s",
            }}>
              {c.consequence}
            </p>

            {/* Solution box */}
            <div style={{
              borderLeft: "2px solid #C8956C",
              paddingLeft: 28,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s ease 0.45s, transform 0.8s ease 0.45s",
            }}>
              <div style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 9.5, fontWeight: 600,
                letterSpacing: "0.28em", textTransform: "uppercase",
                color: "#C8956C",
                marginBottom: 12,
              }}>
                {c.solution.label}
              </div>
              <p style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 16, fontWeight: 400, lineHeight: 1.75,
                color: "#1a1614",
                margin: 0,
              }}>
                {c.solution.text}
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .problem-section { padding: 45px 8% 64px !important; }
          .problem-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .problem-grid > div:first-child { position: static !important; }
        }
      `}</style>
    </section>
  );
}