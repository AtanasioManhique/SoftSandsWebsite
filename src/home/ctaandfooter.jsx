import { useEffect, useRef, useState } from "react";
import { useLang } from "../language/useLanguage";
import { t } from "../language/translations";
import facebookIcon from "../data/facebook (1).png";
import instagramIcon from "../data/instagram (1).png";
import tiktokIcon from "../data/tik-tok.png";
import whatsappIcon from "../data/whatsapp.png";

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

export function CTABanner() {
  const { lang } = useLang();
  const tr = t[lang].cta;
  const [ref, visible] = useReveal();
  const [hovered, setHovered] = useState(false);

  return (
    <section ref={ref} style={{
      background: "linear-gradient(135deg, #1a1614 0%, #2d2015 50%, #1a1614 100%)",
      padding: "32px 7% 64px",
      textAlign: "center",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: 500, height: 500, borderRadius: "50%",
        border: "1px solid rgba(200,149,108,0.08)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: 700, height: 700, borderRadius: "50%",
        border: "1px solid rgba(200,149,108,0.04)",
        pointerEvents: "none",
      }} />

      <div style={{
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
        position: "relative", zIndex: 1,
      }}>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 300,
          color: "#FAFAF8", lineHeight: 1.1, marginBottom: 20,
        }}>
          {tr.title.split("\n").map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>)}
        </h2>
        <p style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: 16, fontWeight: 300, lineHeight: 1.75,
          color: "rgba(255,255,255,0.58)", maxWidth: 500, margin: "0 auto 40px",
        }}>
          {tr.sub}
        </p>
        <a
          href="/contactus"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: "inline-flex", alignItems: "center", gap: 12,
            padding: "16px 40px",
            background: hovered ? "#DEB896" : "#C8956C",
            color: "#1a1614",
            fontFamily: "'Jost', sans-serif",
            fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase",
            border: "none", cursor: "pointer", textDecoration: "none",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            boxShadow: hovered ? "0 12px 40px rgba(200,149,108,0.5)" : "none",
            transition: "all 0.3s ease",
            display: "inline-flex",
          }}
        >
          {tr.btn}
          <span style={{ display: "inline-block", transform: hovered ? "translateX(5px)" : "translateX(0)", transition: "transform 0.3s" }}>→</span>
        </a>
      </div>
    </section>
  );
}

export function Footer() {
  const { lang } = useLang();
  const tr = t[lang];
  const navKeys = ["home", "whoWeAre", "whatWeDo", "contact"];

  return (
    <footer style={{
      background: "#F8F5F1",
      padding: "64px 7% 32px",
      fontFamily: "'Jost', sans-serif",
      borderTop: "1px solid rgba(0,0,0,0.06)",
    }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: 48, marginBottom: 56 }} className="footer-grid">

        {/* Col 1: Brand */}
        <div>
          <div style={{ marginBottom: 16 }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 22, fontWeight: 600, color: "#171311",
              letterSpacing: "0.04em", lineHeight: 1, marginBottom: 4,
            }}>
              Soft Sands
            </div>
            <div style={{ fontSize: 8.5, fontWeight: 500, color: "#C8956C", letterSpacing: "0.26em", textTransform: "uppercase" }}>
              Accommodations
            </div>
          </div>

          {/* Social */}
          <div style={{ display: "flex", gap: 16 }}>
            <a href="https://chat.whatsapp.com/Ivm1DTrdgjoIhV9sWbE5Xl" target="_blank" rel="noreferrer" aria-label="WhatsApp" style={{ transition: "transform 0.3s" }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.15)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
              <img src={whatsappIcon} alt="WhatsApp" width="24" height="24" style={{ objectFit: "contain" }} />
            </a>
            <a href="https://www.facebook.com/softsandsaccommodations" target="_blank" rel="noreferrer" aria-label="Facebook" style={{ transition: "transform 0.3s" }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.15)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
              <img src={facebookIcon} alt="Facebook" width="24" height="24" style={{ objectFit: "contain" }} />
            </a>
            <a href="https://www.instagram.com/softsands.mz/" target="_blank" rel="noreferrer" aria-label="Instagram" style={{ transition: "transform 0.3s" }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.15)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
              <img src={instagramIcon} alt="Instagram" width="24" height="24" style={{ objectFit: "contain" }} />
            </a>
            <a href="https://www.tiktok.com/@softsands" target="_blank" rel="noreferrer" aria-label="TikTok" style={{ transition: "transform 0.3s" }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.15)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
              <img src={tiktokIcon} alt="TikTok" width="24" height="24" style={{ objectFit: "contain" }} />
            </a>
          </div>
        </div>

        {/* Col 2: Quick links */}
        <div>
          <h5 style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "#C8956C", marginBottom: 20 }}>
            {tr.footer.links}
          </h5>
          {navKeys.map(k => (
            <a key={k} href="#" style={{
              display: "block", fontSize: 13, fontWeight: 300, color: "rgba(23,19,17,0.65)",
              textDecoration: "none", marginBottom: 10, transition: "color 0.3s",
            }}
              onMouseEnter={e => e.currentTarget.style.color = "#C8956C"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(23,19,17,0.65)"}
            >
              {tr.nav[k]}
            </a>
          ))}
        </div>

        {/* Col 3: Contact */}
        <div>
          <h5 style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "#C8956C", marginBottom: 20 }}>
            {tr.footer.contact}
          </h5>
          {[
            { icon: "✉", text: "softsandsbookings87@gmail.com", href: "mailto:softsandsbookings87@gmail.com" },
            { icon: "📞", text: "(+258) 875 941 153", href: "tel:+258875941153" },
          ].map((item, i) => (
            <a key={i} href={item.href} style={{
              display: "flex", alignItems: "flex-start", gap: 10,
              fontSize: 13, fontWeight: 300, color: "rgba(23,19,17,0.65)",
              textDecoration: "none", marginBottom: 12, transition: "color 0.3s",
            }}
              onMouseEnter={e => e.currentTarget.style.color = "#C8956C"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(23,19,17,0.65)"}
            >
              <span style={{ fontSize: 13 }}>{item.icon}</span> {item.text}
            </a>
          ))}
        </div>

      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: "1px solid rgba(0,0,0,0.06)",
        paddingTop: 24,
        display: "flex", justifyContent: "center", alignItems: "center",
        flexWrap: "wrap", gap: 12,
      }}>
        <span style={{ fontSize: 12, color: "rgba(23,19,17,0.4)", fontWeight: 300 }}>
          {tr.footer.copy}
        </span>
      </div>

      <style>{`
        @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 36px !important; } }
        @media (max-width: 480px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}