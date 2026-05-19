import { useState } from "react";
import { useLang } from "../language/useLanguage";
import { useReveal } from "../whoarewe/whoWeAreUtils";

const CHANNELS = {
  en: [
    {
      id: "whatsapp",
      label: "WhatsApp",
      tag: "Fastest Response",
      description: "The quickest way to reach us. Send a message and we'll get back to you within hours.",
      value: "(+258) 875 941 153",
      href: "https://wa.me/258875941153",
      cta: "Open WhatsApp",
      color: "#25D366",
      colorDim: "rgba(37,211,102,0.12)",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="currentColor"/>
          <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.656 1.438 5.168L2 22l4.978-1.404A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        </svg>
      ),
      featured: true,
    },
    {
      id: "email",
      label: "Email",
      tag: "Within 24h",
      description: "Prefer writing? Send us an email and we'll reply with everything you need.",
      value: "softsandsbookings87@gmail.com",
      href: "mailto:softsandsbookings87@gmail.com",
      cta: "Send Email",
      color: "#C8956C",
      colorDim: "rgba(200,149,108,0.1)",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
      ),
      featured: false,
    },
    {
      id: "instagram",
      label: "Instagram",
      tag: "Follow & DM",
      description: "See our properties, follow our journey, and send us a direct message anytime.",
      value: "@softsands.mz",
      href: "https://www.instagram.com/softsands.mz/",
      cta: "Open Instagram",
      color: "#E1306C",
      colorDim: "rgba(225,48,108,0.1)",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="2" width="20" height="20" rx="5"/>
          <circle cx="12" cy="12" r="5"/>
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
        </svg>
      ),
      featured: false,
    },
    {
      id: "facebook",
      label: "Facebook",
      tag: "Stay Updated",
      description: "Follow our Facebook page for updates, new properties, and news from the coastline.",
      value: "Soft Sands Accommodations",
      href: "https://www.facebook.com/softsandsaccommodations",
      cta: "Open Facebook",
      color: "#1877F2",
      colorDim: "rgba(24,119,242,0.1)",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
        </svg>
      ),
      featured: false,
    },
    {
      id: "tiktok",
      label: "TikTok",
      tag: "Watch & Follow",
      description: "Catch a glimpse of Mozambique's coastline through our eyes — follow us on TikTok.",
      value: "@softsands",
      href: "https://www.tiktok.com/@softsands",
      cta: "Open TikTok",
      color: "#1a1614",
      colorDim: "rgba(26,22,20,0.06)",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 12a4 4 0 104 4V4a5 5 0 005 5"/>
        </svg>
      ),
      featured: false,
    },
  ],
  pt: [
    {
      id: "whatsapp",
      label: "WhatsApp",
      tag: "Resposta Mais Rápida",
      description: "A forma mais rápida de nos contactar. Envie uma mensagem e respondemos em poucas horas.",
      value: "(+258) 875 941 153",
      href: "https://wa.me/258875941153",
      cta: "Abrir WhatsApp",
      color: "#25D366",
      colorDim: "rgba(37,211,102,0.12)",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="currentColor"/>
          <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.656 1.438 5.168L2 22l4.978-1.404A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        </svg>
      ),
      featured: true,
    },
    {
      id: "email",
      label: "Email",
      tag: "Até 24 horas",
      description: "Prefere escrever? Envie-nos um email e respondemos com tudo o que precisa.",
      value: "softsandsbookings87@gmail.com",
      href: "https://mail.google.com/mail/?view=cm&to=softsandsbookings87@gmail.com",
      cta: "Enviar Email",
      color: "#C8956C",
      colorDim: "rgba(200,149,108,0.1)",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
      ),
      featured: false,
    },
    {
      id: "instagram",
      label: "Instagram",
      tag: "Seguir & DM",
      description: "Veja as nossas propriedades, siga a nossa jornada e envie-nos uma mensagem directa.",
      value: "@softsands.mz",
      href: "https://www.instagram.com/softsands.mz/",
      cta: "Abrir Instagram",
      color: "#E1306C",
      colorDim: "rgba(225,48,108,0.1)",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="2" width="20" height="20" rx="5"/>
          <circle cx="12" cy="12" r="5"/>
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
        </svg>
      ),
      featured: false,
    },
    {
      id: "facebook",
      label: "Facebook",
      tag: "Fique Actualizado",
      description: "Siga a nossa página no Facebook para actualizações, novas propriedades e novidades da costa.",
      value: "Soft Sands Accommodations",
      href: "https://www.facebook.com/softsandsaccommodations",
      cta: "Abrir Facebook",
      color: "#1877F2",
      colorDim: "rgba(24,119,242,0.1)",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
        </svg>
      ),
      featured: false,
    },
    {
      id: "tiktok",
      label: "TikTok",
      tag: "Ver & Seguir",
      description: "Veja a costa de Moçambique pelos nossos olhos — siga-nos no TikTok.",
      value: "@softsands",
      href: "https://www.tiktok.com/@softsands",
      cta: "Abrir TikTok",
      color: "#1a1614",
      colorDim: "rgba(26,22,20,0.06)",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 12a4 4 0 104 4V4a5 5 0 005 5"/>
        </svg>
      ),
      featured: false,
    },
  ],
};

function ChannelCard({ channel, index, visible }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={channel.href}
      target="_blank"
      rel="noreferrer"
      className={`channel-card ${channel.featured ? 'featured' : 'standard'}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        textDecoration: "none",
        background: hovered ? channel.colorDim : "#FFFFFF",
        border: `1px solid ${hovered ? channel.color + "55" : "rgba(200,149,108,0.15)"}`,
        boxShadow: hovered ? "0 12px 24px rgba(0,0,0,0.04)" : "none",
        position: "relative", overflow: "hidden",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: [
          `opacity 0.75s ease ${150 + index * 100}ms`,
          `transform 0.75s ease ${150 + index * 100}ms`,
          "background 0.35s ease",
          "border-color 0.35s ease",
          "box-shadow 0.35s ease",
        ].join(", "),
        gridColumn: channel.featured ? "1 / -1" : "auto",
      }}
    >
      {/* Featured badge */}
      {channel.featured && (
        <div style={{
          position: "absolute", top: 16, right: 20,
          fontFamily: "'Jost', sans-serif",
          fontSize: 9, fontWeight: 600,
          letterSpacing: "0.22em", textTransform: "uppercase",
          color: channel.color,
          border: `1px solid ${channel.color}55`,
          padding: "4px 10px",
          background: "#FFFFFF",
        }}>
          {channel.tag}
        </div>
      )}

      <div style={{
        display: "flex",
        alignItems: channel.featured ? "center" : "flex-start",
        gap: channel.featured ? 24 : 16,
        flexDirection: channel.featured ? "row" : "column",
      }} className="channel-inner">

        {/* Icon */}
        <div style={{
          color: hovered ? channel.color : "rgba(107,93,84,0.4)",
          flexShrink: 0,
          transform: hovered ? "scale(1.1)" : "scale(1)",
          transition: "color 0.35s ease, transform 0.35s ease",
        }}>
          {channel.icon}
        </div>

        {/* Content */}
        <div style={{ flex: 1 }}>
          {!channel.featured && (
            <div style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: 9, fontWeight: 600,
              letterSpacing: "0.22em", textTransform: "uppercase",
              color: hovered ? channel.color : "rgba(107,93,84,0.6)",
              marginBottom: 6,
              transition: "color 0.35s ease",
            }}>
              {channel.tag}
            </div>
          )}

          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: channel.featured ? 26 : 22,
            fontWeight: 400, lineHeight: 1.2,
            color: hovered ? "#1a1614" : "#1a1614",
            marginBottom: 6,
            transition: "color 0.35s ease",
          }}>
            {channel.label}
          </div>

          <div style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 13, fontWeight: 300,
            color: hovered ? channel.color : "rgba(107,93,84,0.8)",
            marginBottom: channel.featured ? 10 : 8,
            letterSpacing: "0.03em",
            transition: "color 0.35s ease",
          }}>
            {channel.value}
          </div>

          {channel.featured && (
            <p style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: 14, fontWeight: 300, lineHeight: 1.75,
              color: "rgba(107,93,84,0.8)",
              margin: 0, maxWidth: 480,
            }}>
              {channel.description}
            </p>
          )}
        </div>

        {/* CTA arrow */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          color: hovered ? channel.color : "rgba(107,93,84,0.4)",
          transition: "color 0.35s ease",
          flexShrink: 0,
          marginTop: channel.featured ? 0 : "auto",
        }}>
          <span style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 10, fontWeight: 500,
            letterSpacing: "0.16em", textTransform: "uppercase",
            display: channel.featured ? "block" : "none",
          }}>
            {channel.cta}
          </span>
          <span style={{
            fontSize: channel.featured ? 16 : 14,
            transform: hovered ? "translateX(4px)" : "translateX(0)",
            transition: "transform 0.35s ease",
          }}>→</span>
        </div>
      </div>

      {/* Bottom accent line */}
      <div style={{
        position: "absolute", bottom: 0, left: 0,
        height: 2,
        width: hovered ? "100%" : "0%",
        background: `linear-gradient(to right, ${channel.color}, transparent)`,
        transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)",
      }} />
    </a>
  );
}

export default function ContactChannels() {
  const { lang } = useLang();
  const channels = CHANNELS[lang] || CHANNELS.en;
  const [ref, visible] = useReveal(0.1);

  return (
    <section ref={ref} style={{ background: "#F8F6F2", padding: "80px 7%" }}>

      {/* Grid: WhatsApp full width top, then 2x2 below */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 16,
      }} className="channels-grid">
        {channels.map((channel, i) => (
          <ChannelCard key={channel.id} channel={channel} index={i} visible={visible} />
        ))}
      </div>

      <style>{`
        .channel-card.featured {
          padding: 30px 30px;
        }
        .channel-card.standard {
          padding: 24px 24px;
        }
          

        @media (max-width: 700px) {
          .channels-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
          .channel-inner { flex-direction: column !important; align-items: flex-start !important; gap: 16px !important; }
          
          .channel-card.featured {
            padding: 24px 20px;
          }
          .channel-card.standard {
            padding: 20px 20px;
          }
        }
      `}</style>
    </section>
  );
}