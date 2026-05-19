import { useState } from "react";
import { useLang } from "../language/useLanguage";
import { useReveal } from "../whoarewe/whoWeAreUtils";

const CONTENT = {
  en: {
    eyebrow: "Who We Serve",
    title: "Built for two sides\nof the same story.",
    sub: "Whether you're searching for the perfect escape or looking to share your coastal property — Soft Sands was built for you.",
    cards: [
      {
        tag: "For Travelers",
        title: "Your perfect stay,\nwithout the guesswork.",
        body: "We find and vet beach properties so you don't have to. Every listing in our portfolio has been personally reviewed — which means you can book with confidence, not hope.",
        points: [
          "Handpicked properties across Maputo, Gaza & Inhambane",
          "Transparent booking with local human support",
          "Secure payment via M-Pesa & Conta Móvel",
          "Dedicated assistance before and during your stay",
        ],
        accent: "#C8956C",
        bg: "#1a1614",
        bgHover: "#221d1a",
      },
      {
        tag: "For Homeowners",
        title: "Your property,\nin trusted hands.",
        body: "We partner with homeowners who want to offer their coastal properties to quality guests — with none of the hassle of managing it alone. We handle the guests. You receive the returns.",
        points: [
          "Strategic partnerships with verified owners",
          "We manage guest communication & logistics",
          "Reach national and international travelers",
          "Reliable, transparent process from start to finish",
        ],
        accent: "#C8956C",
        bg: "#F8F6F2",
        bgHover: "#F0EDE7",
      },
    ],
  },
  pt: {
    eyebrow: "A Quem Servimos",
    title: "Criado para os dois lados\nda mesma história.",
    sub: "Quer esteja à procura da escapada perfeita ou queira partilhar a sua propriedade costeira — a Soft Sands foi criada para si.",
    cards: [
      {
        tag: "Para Viajantes",
        title: "A sua estadia perfeita,\nsem adivinhações.",
        body: "Encontramos e verificamos propriedades de praia para que não tenha de o fazer. Cada anúncio no nosso portfólio foi revisto pessoalmente — o que significa que pode reservar com confiança, não com esperança.",
        points: [
          "Propriedades selecionadas em Maputo, Gaza e Inhambane",
          "Reserva transparente com apoio humano local",
          "Pagamento seguro via M-Pesa e Conta Móvel",
          "Assistência dedicada antes e durante a sua estadia",
        ],
        accent: "#C8956C",
        bg: "#1a1614",
        bgHover: "#221d1a",
      },
      {
        tag: "Para Proprietários",
        title: "A sua propriedade,\nem mãos de confiança.",
        body: "Fazemos parcerias com proprietários que querem oferecer as suas propriedades costeiras a hóspedes de qualidade — sem o trabalho de gerir sozinhos. Tratamos dos hóspedes. Recebe os resultados.",
        points: [
          "Parcerias estratégicas com proprietários verificados",
          "Gerimos a comunicação e logística com os hóspedes",
          "Alcance viajantes nacionais e internacionais",
          "Processo fiável e transparente do início ao fim",
        ],
        accent: "#C8956C",
        bg: "#F8F6F2",
        bgHover: "#F0EDE7",
      },
    ],
  },
};

function AudienceCard({ card, index, visible }) {
  const [hovered, setHovered] = useState(false);
  const isDark = card.bg === "#1a1614";

  return (
    <div
      className="audience-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? card.bgHover : card.bg,
        position: "relative", overflow: "hidden",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: [
          `opacity 0.8s ease ${200 + index * 180}ms`,
          `transform 0.8s ease ${200 + index * 180}ms`,
          "background 0.4s ease",
        ].join(", "),
      }}
    >
      {/* Decorative glow on dark card */}
      {isDark && (
        <div style={{
          position: "absolute",
          top: -60, right: -60,
          width: 300, height: 300,
          borderRadius: "50%",
          background: "rgba(200,149,108,0.08)",
          filter: "blur(80px)",
          pointerEvents: "none",
          opacity: hovered ? 1 : 0.5,
          transition: "opacity 0.5s ease",
        }} />
      )}

      {/* Tag */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        marginBottom: 24,
        padding: "6px 14px",
        border: `1px solid ${isDark ? "rgba(200,149,108,0.25)" : "rgba(200,149,108,0.3)"}`,
      }}>
        <span style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: 9.5, fontWeight: 600,
          letterSpacing: "0.22em", textTransform: "uppercase",
          color: "#C8956C",
        }}>
          {card.tag}
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "clamp(24px, 2.5vw, 32px)",
        fontWeight: 300, lineHeight: 1.15,
        color: isDark ? "#FAFAF8" : "#1a1614",
        marginBottom: 16,
      }}>
        {card.title.split("\n").map((line, i) => (
          <span key={i} style={{ display: "block" }}>{line}</span>
        ))}
      </h3>

      {/* Body */}
      <p style={{
        fontFamily: "'Jost', sans-serif",
        fontSize: 14, fontWeight: 300, lineHeight: 1.7,
        color: isDark ? "rgba(255,255,255,0.58)" : "rgba(107,93,84,0.8)",
        marginBottom: 28,
        maxWidth: 420,
      }}>
        {card.body}
      </p>

      {/* Points */}
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {card.points.map((point, i) => (
          <li key={i} style={{
            display: "flex", alignItems: "flex-start", gap: 12,
            marginBottom: 12,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(-12px)",
            transition: `opacity 0.6s ease ${400 + index * 180 + i * 80}ms, transform 0.6s ease ${400 + index * 180 + i * 80}ms`,
          }}>
            <span style={{
              display: "inline-block",
              width: 4, height: 4, borderRadius: "50%",
              background: "#C8956C",
              marginTop: 8, flexShrink: 0,
            }} />
            <span style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: 13.5, fontWeight: 300, lineHeight: 1.5,
              color: isDark ? "rgba(255,255,255,0.68)" : "rgba(107,93,84,0.85)",
            }}>
              {point}
            </span>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default function ForWhoBlock() {
  const { lang } = useLang();
  const c = CONTENT[lang] || CONTENT.en;
  const [ref, visible] = useReveal(0.1);

  return (
    <section ref={ref} className="forwho-section" style={{ background: "#EDE9E3" }}>
      {/* Header */}
      <div className="forwho-header" style={{ textAlign: "center" }}>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(30px, 4vw, 48px)",
          fontWeight: 300, lineHeight: 1.1,
          color: "#1a1614",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s",
          margin: 0,
        }}>
          {c.title.split("\n").map((line, i) => (
            <span key={i} style={{ display: "block" }}>{line}</span>
          ))}
        </h2>
      </div>

      {/* Two cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 2,
      }} className="forwho-grid">
        {c.cards.map((card, i) => (
          <AudienceCard key={i} card={card} index={i} visible={visible} />
        ))}
      </div>

      <style>{`
        .forwho-section {
          padding: 48px 7% 40px;
        }
        .forwho-header {
          margin-bottom: 32px;
        }
        .audience-card {
          padding: 48px 40px;
        }
        @media (max-width: 860px) {
          .forwho-section {
            padding: -20px 3% 15px;
          }
          .forwho-header {
            margin-bottom: 24px;
          }
          .forwho-grid { 
            grid-template-columns: 1fr !important; 
            gap: 12px !important; 
          }
          .audience-card {
            padding: 32px 24px;
          }
        }
      `}</style>
    </section>
  );
}