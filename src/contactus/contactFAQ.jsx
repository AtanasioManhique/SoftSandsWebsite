import { useState } from "react";
import { useLang } from "../language/useLanguage";
import { useReveal } from "../whoarewe/whoWeAreUtils";

/* ─────────────────────────────────────────────────────────
   CONTENT
───────────────────────────────────────────────────────── */
const CONTENT = {
  en: {
    eyebrow: "Quick Answers",
    title: "Things people\nusually ask.",
    faqs: [
      {
        num: "01",
        q: "How quickly do you respond?",
        a: "We're always close to our phones. WhatsApp, Instagram DMs and Emails are answered the same day usually within the hour. Every reply comes from us, personally. No bots, no automation — just real people ready to help.",
      },
      {
        num: "02",
        q: "Can international visitors book?",
        a: "Absolutely. We welcome guests from all over the world. Whether you're visiting from within Mozambique or flying in internationally, we'll handle all the details and make the process seamless for you.",
      },
      {
        num: "03",
        q: "What payment methods do you accept?",
        a: "We currently accept M-Pesa and Conta Móvel for local payments. For international guests, please reach out directly via WhatsApp or email and we'll find the best arrangement for you.",
      },
    ],
  },
  pt: {
    eyebrow: "Respostas Rápidas",
    title: "O que costumam\nperguntar.",
    faqs: [
      {
        num: "01",
        q: "Com que rapidez respondem?",
        a: "Estamos sempre perto de nossos telefones. As mensagens diretas do WhatsApp, Instagram e Emails são respondidas no mesmo dia geralmente dentro da hora.Cada resposta vem de nós, pessoalmente. Sem bots, sem automação — apenas pessoas reais prontas para ajudar.",
      },
      {
        num: "02",
        q: "Visitantes internacionais podem reservar?",
        a: "Claro que sim. Recebemos hóspedes de todo o mundo. Seja de dentro de Moçambique ou de qualquer outro país, tratamos de todos os detalhes e tornamos o processo simples para si.",
      },
      {
        num: "03",
        q: "Que métodos de pagamento aceitam?",
        a: "Aceitamos M-Pesa e Conta Móvel para pagamentos locais. Para hóspedes internacionais, entre em contacto via WhatsApp ou email e encontramos em conjunto a melhor solução.",
      },
    ],
  },
};

/* ─────────────────────────────────────────────────────────
   FAQ ITEM
───────────────────────────────────────────────────────── */
function FaqItem({ faq, index, sectionVisible }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        opacity: sectionVisible ? 1 : 0,
        transform: sectionVisible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.75s ease ${200 + index * 120}ms, transform 0.75s ease ${200 + index * 120}ms`,
      }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "28px 0",
          display: "flex",
          alignItems: "flex-start",
          gap: 24,
          textAlign: "left",
        }}
      >
        {/* Number */}
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 13,
          fontWeight: 300,
          color: "rgba(200,149,108,0.5)",
          letterSpacing: "0.1em",
          flexShrink: 0,
          paddingTop: 3,
          minWidth: 24,
        }}>
          {faq.num}
        </span>

        {/* Question */}
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(20px, 2.2vw, 26px)",
          fontWeight: 300,
          color: open ? "#FAFAF8" : "rgba(250,250,248,0.75)",
          lineHeight: 1.25,
          flex: 1,
          transition: "color 0.35s ease",
          letterSpacing: "-0.01em",
        }}>
          {faq.q}
        </span>

        {/* Toggle icon */}
        <span style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          border: `1px solid ${open ? "rgba(200,149,108,0.6)" : "rgba(200,149,108,0.2)"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginTop: 2,
          transition: "border-color 0.35s ease, background 0.35s ease",
          background: open ? "rgba(200,149,108,0.08)" : "transparent",
        }}>
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            style={{
              transform: open ? "rotate(45deg)" : "rotate(0deg)",
              transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            <line x1="5" y1="1" x2="5" y2="9" stroke="#C8956C" strokeWidth="1.2" strokeLinecap="round"/>
            <line x1="1" y1="5" x2="9" y2="5" stroke="#C8956C" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        </span>
      </button>

      {/* Answer — animated expand */}
      <div style={{
        overflow: "hidden",
        maxHeight: open ? 200 : 0,
        opacity: open ? 1 : 0,
        transition: "max-height 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease",
      }}>
        <p style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: 14,
          fontWeight: 300,
          lineHeight: 1.85,
          color: "rgba(255,255,255,0.48)",
          margin: 0,
          paddingLeft: 48,
          paddingBottom: 28,
          maxWidth: 560,
        }}>
          {faq.a}
        </p>
      </div>

      {/* Divider */}
      <div style={{
        height: 1,
        background: "linear-gradient(to right, rgba(200,149,108,0.18) 0%, rgba(200,149,108,0.04) 70%, transparent 100%)",
      }} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   EXPORT
───────────────────────────────────────────────────────── */
export default function ContactFAQ() {
  const { lang } = useLang();
  const c = CONTENT[lang] || CONTENT.en;
  const [ref, visible] = useReveal(0.1);

  return (
    <section
      ref={ref}
      style={{
        background: "#1e1a17",
        padding: "32px 7% 64px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle bg glow */}
      <div style={{
        position: "absolute",
        top: "30%", left: "60%",
        width: 480, height: 380,
        borderRadius: "50%",
        background: "rgba(200,149,108,0.05)",
        filter: "blur(100px)",
        pointerEvents: "none",
      }} />

      <div style={{
        maxWidth: 960,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr 1.6fr",
        gap: "0 80px",
        alignItems: "start",
        position: "relative", zIndex: 1,
      }} className="faq-grid">

        {/* ── Left: label + title ── */}
        <div style={{
          position: "sticky",
          top: 40,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.75s ease 0.1s, transform 0.75s ease 0.1s",
        }}>


          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(30px, 3vw, 44px)",
            fontWeight: 300,
            color: "#FAFAF8",
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
            margin: 0,
          }}>
            {c.title.split("\n").map((line, i) => (
              <span key={i} style={{ display: "block" }}>
                {i === 1 ? <em style={{ fontStyle: "italic", color: "#DEB896" }}>{line}</em> : line}
              </span>
            ))}
          </h2>
        </div>

        {/* ── Right: FAQ items ── */}
        <div>
          {c.faqs.map((faq, i) => (
            <FaqItem
              key={faq.num}
              faq={faq}
              index={i}
              sectionVisible={visible}
            />
          ))}
        </div>
      </div>

      <style>{`

      @media (max-width: 860px) {
          section { padding: 30px 6% 32px !important; min-height: 35vh !important; }
        }
        @media (max-width: 768px) {
          .faq-grid {
            grid-template-columns: 1fr !important;
            gap: 40px 0 !important;
          }
          .faq-grid > div:first-child {
            position: static !important;
          }
        }
      `}</style>
    </section>
  );
}