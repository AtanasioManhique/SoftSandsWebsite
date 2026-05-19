import { useState, useEffect, useRef } from "react";
import { useLang } from "../language/useLanguage";
import { t } from "../language/translations";

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );

    if (ref.current) obs.observe(ref.current);

    return () => obs.disconnect();
  }, []);

  return [ref, visible];
}

export default function Testimonials() {
  const { lang } = useLang();
  const tr = t[lang].testimonials;

  const [active, setActive] = useState(0);
  const [ref, visible] = useReveal();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % tr.items.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isMobile, tr.items.length]);

  return (
    <section
      ref={ref}
      style={{
        background: "#F6F2ED",
        padding: "80px 5%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative quote */}
      <div
        style={{
          position: "absolute",
          top: -40,
          left: "2%",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "360px",
          lineHeight: 1,
          fontWeight: 300,
          color: "rgba(200,149,108,0.08)",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        "
      </div>

      {/* Top */}
      <div
        style={{
          maxWidth: 760,
          marginBottom: 40,
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 22,
            opacity: visible ? 1 : 0,
            transform: visible
              ? "translateY(0)"
              : "translateY(20px)",
            transition: "all 0.8s ease",
          }}
        >
          <span
            style={{
              width: 34,
              height: 1,
              background: "#C8956C",
              display: "inline-block",
            }}
          />

          <span
            style={{
              fontFamily: "'Jost', sans-serif",
              color: "#C8956C",
              fontSize: 11,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
            }}
          >
            {tr.eyebrow}
          </span>
        </div>

        {/* Title */}
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(36px, 5vw, 64px)",
            fontWeight: 300,
            lineHeight: 1.05,
            color: "#171311",
            marginBottom: 16,
            opacity: visible ? 1 : 0,
            transform: visible
              ? "translateY(0)"
              : "translateY(28px)",
            transition: "all 0.9s ease 0.1s",
          }}
        >
          {tr.title.split("\n").map((l, i) => (
            <span key={i}>
              {l}
              {i === 0 && <br />}
            </span>
          ))}
        </h2>

        {/* Subtitle */}
        <p
          style={{
            maxWidth: 520,
            fontFamily: "'Jost', sans-serif",
            fontSize: 15,
            lineHeight: 1.6,
            color: "rgba(23,19,17,0.65)",
            opacity: visible ? 1 : 0,
            transform: visible
              ? "translateY(0)"
              : "translateY(20px)",
            transition: "all 0.8s ease 0.2s",
          }}
        >
          {tr.subtitle}
        </p>
      </div>

      {/* Testimonials */}
      <div className="testimonial-slider">
        {tr.items.map((item, i) => {
          const isActive = i === active;
          const isPrev = i === (active - 1 + tr.items.length) % tr.items.length;
          const isNext = i === (active + 1) % tr.items.length;

          let className = "testimonial-card";
          if (isMobile) {
            if (isActive) className += " active";
            else if (isPrev) className += " prev";
            else if (isNext) className += " next";
          }

          return (
            <div
              key={i}
              onClick={() => isMobile && setActive(i)}
              className={className}
              style={
                !isMobile
                  ? {
                      opacity: visible ? 1 : 0,
                      transform: visible ? "translateY(0)" : "translateY(40px)",
                      transition: `opacity 0.8s ease ${i * 120}ms, transform 0.8s ease ${i * 120}ms`,
                    }
                  : {}
              }
            >
              {/* Stars */}
              <div className="stars">★★★★★</div>

              {/* Quote */}
              <p className="quote">
                “{item.quote}”
              </p>

              {/* Author */}
              <div className="author">
                <span className="name">
                  {item.name}
                </span>

              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom */}
      <div
        className="testimonials-cta"
        style={{
          marginTop: 20,
          display: "flex",
          justifyContent: "center",
          position: "relative",
          zIndex: 10,
        }}
      >
        <a
          href="https://www.google.com/travel/search?q=Soft%20Sands%20Maputo&g2lb=4965990%2C72471280%2C72560029%2C72573224%2C72647020%2C72686036%2C72803964%2C72882230%2C73059275%2C73064764%2C73249147%2C121608706&hl=en-MZ&gl=mz&cs=1&ssta=1&ts=CAEaKwopEicyJTB4MWVlNjliZDYyZmJmMWI3MToweDUxZmY2ZjQ3NGRkNDI1ZjQ&qs=CAEyE0Nnb0k5TXZRN3ZUbzJfOVJFQUU4Ag&ap=ugEHcmV2aWV3cw&ictx=111&ved=0CAAQ5JsGahcKEwi4gKqRn7yUAxUAAAAAHQAAAAAQBw"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 18,
            color: "#C8956C",
            textDecoration: "none",
            transition: "0.3s ease",
          }}
        >
          {tr.read}
        </a>
      </div>

      <style>{`
        .testimonial-slider{
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          position: relative;
          width: 100%;
        }

        .testimonial-card{
          padding: 32px;
          background: #FFFFFF;
          border-radius: 16px;
          border: 1px solid rgba(0,0,0,0.04);
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.45s ease, box-shadow 0.45s ease;
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }

        .testimonial-card::before{
          content:"";
          position:absolute;
          inset:0;
          background: linear-gradient(135deg, rgba(200,149,108,0.05), transparent 40%);
          opacity:0;
          transition:0.4s ease;
        }

        .testimonial-card:hover{
          transform: translateY(-4px);
          border-color: rgba(200,149,108,0.2);
          box-shadow: 0 12px 30px rgba(0,0,0,0.06);
        }

        .testimonial-card:hover::before{
          opacity:1;
        }

        .stars{
          color:#C8956C;
          font-size:13px;
          letter-spacing:4px;
          margin-bottom:24px;
        }

        .quote{
          font-family:'Cormorant Garamond', serif;
          font-size:26px;
          line-height:1.4;
          font-style:italic;
          font-weight:400;
          color:#171311;
          margin-bottom:28px;
        }

        .author{
          display:flex;
          flex-direction:column;
          gap:4px;
        }

        .name{
          font-family:'Jost', sans-serif;
          font-size:14px;
          font-weight:600;
          color:#171311;
          letter-spacing:0.03em;
        }

        .role{
          font-family:'Jost', sans-serif;
          font-size:11px;
          color:#C8956C;
          text-transform:uppercase;
          letter-spacing:0.18em;
        }

        @media (max-width: 900px){
          .testimonial-slider{
            display: flex;
            justify-content: center;
            align-items: center;
            height: 480px;
            padding: 0;
            overflow: visible;
          }

          .testimonials-cta {
            margin-top: 30px;
          }

          .testimonial-card{
            position: absolute;
            width: 82%;
            padding: 24px;
            transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .testimonial-card.active{
            transform: translateX(0) scale(1);
            z-index: 3;
            opacity: 1;
            background: #FFFFFF;
            border-color: rgba(200,149,108,0.28);
            box-shadow: 0 15px 35px rgba(0,0,0,0.08);
          }

          .testimonial-card.prev{
            transform: translateX(-18%) scale(0.85);
            z-index: 1;
            opacity: 0.4;
            pointer-events: none;
            filter: blur(1px);
          }

          .testimonial-card.next{
            transform: translateX(18%) scale(0.85);
            z-index: 1;
            opacity: 0.4;
            pointer-events: none;
            filter: blur(1px);
          }

          .quote{
            font-size:20px;
            line-height:1.4;
            margin-bottom: 20px;
          }
        }
      `}</style>
    </section>
  );
}