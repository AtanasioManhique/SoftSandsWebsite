import { useState } from "react";
import { useLang } from "../language/useLanguage";
import { useReveal } from "../whoarewe/whoWeAreUtils";

const CONTENT = {
  en: {
    eyebrow: "The Service",
    title: "Everything handled.\nNothing left to chance.",
    sub: "We take care of every step — from finding the right property to ensuring you're looked after throughout your stay.",
    steps: [
      {
        num: "01",
        title: "Property Selection",
        body: "We personally vet every property in our portfolio — checking quality, comfort, location, and reliability. No surprises, only exceptional stays.",
        detail: "Each homeowner goes through a verification process before listing with us.",
      },
      {
        num: "02",
        title: "Seamless Booking",
        body: "A simple, transparent process with local support at every step. You tell us what you're looking for — we match you with the right property.",
        detail: "No complex platforms. Just clear communication and confirmed bookings.",
      },
      {
        num: "03",
        title: "Dedicated Support",
        body: "Our team is available before and during your stay. Any question, any need — we handle it personally, not through an automated system.",
        detail: "Real people, real responses. The way hospitality should work.",
      },
      {
        num: "04",
        title: "Secure Payments",
        body: "Safe and convenient payment options tailored to the Mozambican context — including M-Pesa and Conta Móvel for a seamless cashless experience.",
        detail: "Payments are secure, traceable, and protected for both guests and homeowners.",
      },
    ],
  },
  pt: {
    eyebrow: "O Serviço",
    title: "Tudo tratado.\nNada deixado ao acaso.",
    sub: "Cuidamos de cada etapa — desde encontrar a propriedade certa até garantir que está bem tratado durante toda a sua estadia.",
    steps: [
      {
        num: "01",
        title: "Seleção de Propriedades",
        body: "Verificamos pessoalmente cada propriedade no nosso portfólio — qualidade, conforto, localização e fiabilidade. Sem surpresas, apenas estadias excecionais.",
        detail: "Cada proprietário passa por um processo de verificação antes de listar connosco.",
      },
      {
        num: "02",
        title: "Reserva Simples",
        body: "Um processo simples e transparente com apoio local em cada etapa. Diz-nos o que procura — nós encontramos a propriedade certa.",
        detail: "Sem plataformas complexas. Apenas comunicação clara e reservas confirmadas.",
      },
      {
        num: "03",
        title: "Apoio Dedicado",
        body: "A nossa equipa está disponível antes e durante a sua estadia. Qualquer questão, qualquer necessidade — tratamos pessoalmente, não através de um sistema automatizado.",
        detail: "Pessoas reais, respostas reais. Como a hospitalidade deve funcionar.",
      },
      {
        num: "04",
        title: "Pagamentos Seguros",
        body: "Opções de pagamento seguras e convenientes adaptadas ao contexto moçambicano — incluindo M-Pesa e Conta Móvel para uma experiência sem dinheiro físico.",
        detail: "Pagamentos seguros, rastreáveis e protegidos para hóspedes e proprietários.",
      },
    ],
  },
};

function ServiceCard({ step, index, visible }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        padding: "44px 36px 40px",
        background: hovered ? "#FFFFFF" : "#FAFAF8",
        borderTop: `2px solid ${hovered ? "#C8956C" : "rgba(200,149,108,0.2)"}`,
        boxShadow: hovered ? "0 12px 30px rgba(0,0,0,0.06)" : "0 4px 12px rgba(0,0,0,0.02)",
        cursor: "default",
        opacity: visible ? 1 : 0,
        transform: visible 
          ? (hovered ? "translateY(-6px)" : "translateY(0)") 
          : "translateY(32px)",
        transition: [
          `opacity 0.75s ease ${150 + index * 130}ms`,
          `transform ${hovered ? "0.4s ease" : `0.75s ease ${150 + index * 130}ms`}`,
          "background 0.4s ease",
          "border-color 0.4s ease",
          "box-shadow 0.4s ease"
        ].join(", "),
        overflow: "hidden",
      }}
    >
      {/* Ghost number */}
      <div style={{
        position: "absolute",
        top: -12, right: 20,
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 90, fontWeight: 300, lineHeight: 1,
        color: hovered ? "rgba(200,149,108,0.15)" : "rgba(200,149,108,0.08)",
        userSelect: "none", pointerEvents: "none",
        transition: "color 0.4s ease",
      }}>
        {step.num}
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 26, fontWeight: 400, lineHeight: 1.2,
        color: "#1a1614",
        marginBottom: 10,
        transform: hovered ? "translateX(4px)" : "translateX(0)",
        transition: "transform 0.35s ease",
      }}>
        {step.title}
      </h3>

      {/* Body */}
      <p style={{
        fontFamily: "'Jost', sans-serif",
        fontSize: 15, fontWeight: 300, lineHeight: 1.82,
        color: "rgba(107,93,84,0.72)",
        marginBottom: 20,
      }}>
        {step.body}
      </p>

      {/* Detail — appears on hover */}
      <div style={{
        display: "flex", alignItems: "flex-start", gap: 8,
        opacity: hovered ? 1 : 0,
        transform: hovered ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 0.35s ease, transform 0.35s ease",
      }}>
        <span style={{
          display: "inline-block", width: 16, height: 1,
          background: "#C8956C", marginTop: 9, flexShrink: 0,
        }} />
        <span style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: 12, fontWeight: 300, fontStyle: "italic",
          color: "rgba(200,149,108,0.8)",
          lineHeight: 1.6,
        }}>
          {step.detail}
        </span>
      </div>

      {/* Bottom accent */}
      <div style={{
        position: "absolute", bottom: 0, left: 0,
        height: 2,
        width: hovered ? "100%" : "0%",
        background: "linear-gradient(to right, #C8956C, transparent)",
        transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)",
      }} />
    </div>
  );
}

export default function ServiceBlock() {
  const { lang } = useLang();
  const c = CONTENT[lang] || CONTENT.en;
  const [ref, visible] = useReveal(0.1);

  return (
    <section
      ref={ref}
      className="service-section"
      style={{
        background: "#F2EFEA",
        padding: "48px 7% 40px",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0 80px",
          alignItems: "end",
        }} className="service-header-grid">
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(34px, 4vw, 56px)",
            fontWeight: 300, lineHeight: 1.1,
            color: "#1a1614", margin: 0,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s",
          }}>
            {c.title.split("\n").map((line, i) => (
              <span key={i} style={{ display: "block" }}>{line}</span>
            ))}
          </h2>

          <p style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 15, fontWeight: 300, lineHeight: 1.8,
            color: "rgba(107,93,84,0.8)",
            margin: 0,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
          }}>
            {c.sub}
          </p>
        </div>
      </div>

      {/* Cards grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 2,
      }} className="service-cards-grid">
        {c.steps.map((step, i) => (
          <ServiceCard key={i} step={step} index={i} visible={visible} />
        ))}
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .service-cards-grid { grid-template-columns: repeat(2,1fr) !important; gap: 12px !important; }
        }
        @media (max-width: 860px) {
          .service-section { padding-top: 25px !important; }
          .service-header-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
        }
        @media (max-width: 600px) {
          .service-cards-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}