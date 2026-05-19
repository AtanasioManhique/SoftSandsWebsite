import { useState } from "react";
import { useLang } from "../language/useLanguage";
import { useReveal } from "../whoarewe/whoWeAreUtils";

const CONTENT = {
  en: {
    eyebrow: "Why Soft Sands",
    title: "Not just a listing.\nA commitment.",
    sub: "Anyone can list a property. We do something different — we build trust between people, and we stand behind every stay we arrange.",
    items: [
      { num: "01", title: "Integrity First", body: "We act transparently and honestly in everything we do. What you see is what you get — no hidden fees, no misleading listings, no surprises." },
      { num: "02", title: "Genuine Human Support", body: "Behind every booking is a real person who cares. Not a bot, not a ticket system — just a dedicated team that treats every guest like a priority." },
      { num: "03", title: "Local Knowledge", body: "We know Mozambique's southern coastline intimately — Maputo, Gaza, and Inhambane. That knowledge means better recommendations, better properties, and better experiences." },
      { num: "04", title: "Built on Trust", body: "Our reputation depends on every stay going well. That's why we vet every property, verify every owner, and stay involved throughout the entire process." },
      { num: "05", title: "Promoting Mozambique", body: "We're not just a business — we're passionate about showcasing the beauty of our country to nationals and international visitors alike. Every booking supports local communities." },
      { num: "06", title: "Innovation & Growth", body: "We embrace new ideas and evolving needs. From secure digital payments to an upcoming dedicated platform — we're always working to make the experience better." },
    ],
    closing: {
      quote: "We believe that every traveler deserves a stay that feels exactly as promised — and every homeowner deserves a partner they can trust.",
      name: "Soft Sands Team",
    },
  },
  pt: {
    eyebrow: "Porquê a Soft Sands",
    title: "Não apenas um anúncio.\nUm compromisso.",
    sub: "Qualquer um pode anunciar uma propriedade. Nós fazemos algo diferente — construímos confiança entre pessoas e apoiamos cada estadia que organizamos.",
    items: [
      { num: "01", title: "Integridade em Primeiro", body: "Agimos com transparência e honestidade em tudo o que fazemos. O que vê é o que recebe — sem taxas escondidas, sem anúncios enganosos, sem surpresas." },
      { num: "02", title: "Apoio Humano Genuíno", body: "Por detrás de cada reserva está uma pessoa real que se importa. Não um bot, não um sistema de tickets — apenas uma equipa dedicada que trata cada hóspede como prioridade." },
      { num: "03", title: "Conhecimento Local", body: "Conhecemos intimamente a costa sul de Moçambique — Maputo, Gaza e Inhambane. Esse conhecimento traduz-se em melhores recomendações, melhores propriedades e melhores experiências." },
      { num: "04", title: "Construído na Confiança", body: "A nossa reputação depende de cada estadia correr bem. Por isso verificamos cada propriedade, confirmamos cada proprietário e mantemo-nos envolvidos durante todo o processo." },
      { num: "05", title: "A Promover Moçambique", body: "Não somos apenas um negócio — somos apaixonados por mostrar a beleza do nosso país a nacionais e visitantes internacionais. Cada reserva apoia as comunidades locais." },
      { num: "06", title: "Inovação & Crescimento", body: "Abraçamos novas ideias e necessidades em evolução. Dos pagamentos digitais seguros a uma plataforma dedicada em desenvolvimento — estamos sempre a trabalhar para melhorar a experiência." },
    ],
    closing: {
      quote: "Acreditamos que cada viajante merece uma estadia que seja exatamente o que foi prometido — e cada proprietário merece um parceiro em quem possa confiar.",
      name: "Equipa Soft Sands",
    },
  },
};

function WhyCard({ item, index, visible }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "40px 32px 36px",
        borderBottom: `1px solid ${hovered ? "rgba(200,149,108,0.4)" : "rgba(200,149,108,0.15)"}`,
        borderLeft: `2px solid ${hovered ? "#C8956C" : "transparent"}`,
        background: hovered ? "#FFFFFF" : "transparent",
        boxShadow: hovered ? "0 12px 32px rgba(0,0,0,0.04)" : "none",
        position: "relative", overflow: "hidden", cursor: "default",
        opacity: visible ? 1 : 0,
        transform: !visible ? "translateY(28px)" : (hovered ? "translateY(-8px)" : "translateY(0)"),
        transition: visible
          ? "transform 0.4s ease, box-shadow 0.4s ease, background 0.4s ease, border-color 0.4s ease"
          : `opacity 0.7s ease ${150 + index * 100}ms, transform 0.7s ease ${150 + index * 100}ms`,
      }}
    >
      <div style={{
        position: "absolute", top: -8, right: 16,
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 72, fontWeight: 300, lineHeight: 1,
        color: hovered ? "rgba(200,149,108,0.25)" : "rgba(200,149,108,0.12)",
        userSelect: "none", pointerEvents: "none",
        transition: "color 0.35s ease",
      }}>{item.num}</div>

      <h4 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 22, fontWeight: 400, lineHeight: 1.2,
        color: hovered ? "#C8956C" : "#1a1614",
        marginBottom: 12,
        transform: hovered ? "translateX(4px)" : "translateX(0)",
        transition: "color 0.35s ease, transform 0.35s ease",
      }}>{item.title}</h4>

      <p style={{
        fontFamily: "'Jost', sans-serif",
        fontSize: 13.5, fontWeight: 300, lineHeight: 1.8,
        color: hovered ? "rgba(107,93,84,1)" : "rgba(107,93,84,0.75)",
        margin: 0, transition: "color 0.35s ease",
      }}>{item.body}</p>
    </div>
  );
}

export default function WhySoftSandsBlock() {
  const { lang } = useLang();
  const c = CONTENT[lang] || CONTENT.en;
  const [ref, visible] = useReveal(0.1);
  const [closingRef, closingVisible] = useReveal(0.3);

  return (
    <section ref={ref} className="why-section" style={{ background: "#F9F7F4" }}>

      {/* Header */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: "0 80px", alignItems: "end", marginBottom: 72,
      }} className="why-header-grid">
        <div>
          <div style={{
            display: "flex", alignItems: "center", gap: 14, marginBottom: 24,
            opacity: visible ? 1 : 0, transition: "opacity 0.7s ease",
          }}>
            <span style={{ display: "inline-block", width: 28, height: 1, background: "#C8956C" }} />
            <span style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: "0.3em", textTransform: "uppercase", color: "#C8956C" }}>
              {c.eyebrow}
            </span>
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(34px, 4.5vw, 58px)", fontWeight: 300,
            lineHeight: 1.1, color: "#1a1614", margin: 0,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s",
          }}>
            {c.title.split("\n").map((line, i) => <span key={i} style={{ display: "block" }}>{line}</span>)}
          </h2>
        </div>
        <p style={{
          fontFamily: "'Jost', sans-serif", fontSize: 15, fontWeight: 300,
          lineHeight: 1.85, color: "rgba(107,93,84,0.8)", margin: 0,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
        }}>{c.sub}</p>
      </div>

      {/* Cards */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
        gap: "0 2px", borderTop: "1px solid rgba(200,149,108,0.15)",
      }} className="why-grid">
        {c.items.map((item, i) => <WhyCard key={i} item={item} index={i} visible={visible} />)}
      </div>

      {/* ── CLOSING QUOTE — dark full-bleed band ── */}
      <div
        ref={closingRef}
        style={{
          marginTop: 80,
          /* Full bleed — breaks out of section padding */
          marginLeft: "calc(-7%)",
          marginRight: "calc(-7%)",
          padding: "72px 7%",
          background: "#1a1614",
          position: "relative", overflow: "hidden",
          display: "flex", alignItems: "flex-start", gap: 32,
          opacity: closingVisible ? 1 : 0,
          transform: closingVisible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.85s ease, transform 0.85s ease",
        }}
      >
        {/* Subtle warm glow */}
        <div style={{
          position: "absolute", top: "50%", left: "35%",
          transform: "translate(-50%, -50%)",
          width: 600, height: 320, borderRadius: "80%",
          background: "radial-gradient(ellipse 80% 100% at 50% 50%, #3d2a1a 0%, #241710 55%, #160e09 100%)",
          filter: "blur(90px)", pointerEvents: "none",
        }} />

        {/* Giant quote mark */}
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 80, fontWeight: 300, lineHeight: 0.8,
          color: "rgba(200,149,108,0.22)",
          flexShrink: 0, marginTop: 8,
          position: "relative", zIndex: 1,
        }}>"</span>

        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(20px, 2.2vw, 28px)",
            fontWeight: 300, fontStyle: "italic",
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.82)",
            maxWidth: 700, marginBottom: 28,
          }}>{c.closing.quote}</p>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ display: "inline-block", width: 20, height: 1, background: "#C8956C" }} />
            <span style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: 11, fontWeight: 500,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "#C8956C",
            }}>{c.closing.name}</span>
          </div>
        </div>
      </div>

      <style>{`
        .why-section { padding: 48px 7% 0; }
        @media (max-width: 960px) {
          .why-grid { grid-template-columns: repeat(2,1fr) !important; }
          .why-header-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
        @media (max-width: 600px) {
          .why-section { padding: 32px 5% 0; }
          .why-grid { grid-template-columns: 1fr !important; }
          /* Adjust bleed for smaller padding on mobile */
          section > div:last-of-type {
            margin-left: -5% !important;
            margin-right: -5% !important;
          }
        }
      `}</style>
    </section>
  );
}