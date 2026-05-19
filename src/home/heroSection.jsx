import { useState, useEffect, useRef } from "react";
import { useLang } from "../language/useLanguage";
import { heroImages } from "../data/index.js";

/* ── Duração por slide (ms) ──────────────────────────────── */
const DURATIONS = [6500, 6500, 6500, 6500, 7000, 7000];
const TOTAL = heroImages.length;

/* ── Conteúdo ──────────────────────────────────────────────*/
const CONTENT = {
  en: {
    m1: {
      eyebrow: "Southern Mozambique",
      title: "Soft Sands\nAccommodations",
      body: "A coastal tourism startup dedicated to promoting domestic tourism in southern Mozambique.",
    },
    m2: {
      eyebrow: "Southern Mozambique",
      title: "Soft Sands\nAccommodations",
      body: "Founded in 2022, we offer exceptional accommodation experiences with a focus on warm hospitality for both national and international visitors.",
    },
    m3: {
      eyebrow: "Maputo · Gaza · Inhambane",
      title: "where comfort\nmeets coastline",
      body: "Your perfect beach escape awaits — from Maputo to Inhambane.",
      italic: true,
    },
  },
  pt: {
    m1: {
      eyebrow: "Sul de Moçambique",
      title: "Soft Sands\nAccommodations",
      body: "Uma startup de turismo costeiro dedicada a promover o turismo doméstico no sul de Moçambique.",
    },
    m2: {
      eyebrow: "Sul de Moçambique",
      title: "Soft Sands\nAccommodations",
      body: "Fundada em 2022, oferecemos experiências de alojamento excecionais com foco numa hospitalidade calorosa para visitantes nacionais e internacionais.",
    },
    m3: {
      eyebrow: "Maputo · Gaza · Inhambane",
      title: "onde o conforto\nencontra a costa",
      body: "A sua escapada de praia perfeita aguarda — de Maputo a Inhambane.",
      italic: true,
    },
  },
};

function getMoment(cur) {
  if (cur <= 1) return "m1";
  if (cur <= 3) return "m2";
  return "m3";
}

/* ════════════════════════════════════════════════════════════
   CSS GLOBAL
   ════════════════════════════════════════════════════════ */
const GLOBAL_CSS = `
  @keyframes kenBurns {
    from { transform: scale(1.00); }
    to   { transform: scale(1.10); }
  }
  @keyframes lineGrow {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
  @keyframes eyebrowIn {
    from { opacity: 0; transform: translateX(-18px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes lineReveal {
    from { opacity: 0; transform: translateY(100%); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes bodyFadeIn {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

/* ════════════════════════════════════════════════════════════
   SLIDE — zero flicker cross-fade

   ESTRATÉGIA:
   - Todos os slides estão SEMPRE no DOM (sem montar/desmontar)
   - Slide ACTIVO   → opacity 1, zIndex 2, transition ON (fade in)
   - Slide ANTERIOR → opacity 1, zIndex 1, transition OFF (fica por baixo, imóvel)
   - Restantes      → opacity 0, zIndex 0, transition OFF (invisíveis)
   - O novo slide aparece POR CIMA do anterior → zero transparência dupla

   KB RESTART:
   - useEffect detecta `active=true` e usa reflow forçado para
     reiniciar a animação SEM desmontar o elemento → sem flicker
   ════════════════════════════════════════════════════════ */
function Slide({ src, active, isPrev }) {
  const imgRef = useRef(null);

  useEffect(() => {
    const el = imgRef.current;
    if (!el || !active) return;

    /* Restart Ken Burns sem remontar:
       1. remove a animação
       2. forçar reflow (lê offsetHeight — o browser redesenha)
       3. re-aplica a animação */
    el.style.animation = "none";
    void el.offsetHeight;          // reflow — NÃO remover esta linha
    el.style.animation = "kenBurns 9s cubic-bezier(0.25,0.46,0.45,0.94) forwards";
  }, [active]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        /* O anterior mantém-se 100% opaco por baixo, enquanto o novo fade in por cima */
        opacity: (active || isPrev) ? 1 : 0,
        zIndex: active ? 2 : isPrev ? 1 : 0,
        transition: active
          ? "opacity 1800ms cubic-bezier(0.4,0,0.2,1)"
          : "none",
        pointerEvents: "none",
      }}
    >
      <div
        ref={imgRef}
        style={{
          position: "absolute",
          inset: "-5%",
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          willChange: "transform",
        }}
      />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   EYEBROW animado
   ════════════════════════════════════════════════════════ */
function Eyebrow({ text }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20, overflow: "hidden" }}>
      <span style={{
        display: "block", width: 32, height: 1,
        background: "#C8956C", flexShrink: 0,
        transformOrigin: "left",
        animation: "lineGrow 600ms cubic-bezier(0.4,0,0.2,1) 100ms both",
      }} />
      <span style={{
        color: "#C8956C", fontSize: 12, fontWeight: 500,
        letterSpacing: "0.3em", textTransform: "uppercase",
        fontFamily: "'Jost', sans-serif",
        animation: "eyebrowIn 600ms cubic-bezier(0.4,0,0.2,1) 200ms both",
      }}>
        {text}
      </span>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   TITLE LINES — clip mask reveal
   ════════════════════════════════════════════════════════ */
function TitleLines({ lines, italic }) {
  return (
    <div style={{
      fontFamily: "'Cormorant Garamond', serif",
      fontWeight: 300,
      fontSize: "clamp(40px, 6.5vw, 88px)",
      lineHeight: 1.06,
      color: italic ? "#DEB896" : "#FFFFFF",
      fontStyle: italic ? "italic" : "normal",
      letterSpacing: italic ? "0.01em" : "-0.01em",
      textShadow: "0 2px 48px rgba(0,0,0,0.75)",
      marginBottom: 22,
    }}>
      {lines.map((line, i) => (
        <div key={i} style={{ overflow: "hidden", lineHeight: 1.12 }}>
          <span style={{
            display: "block",
            animation: `lineReveal 700ms cubic-bezier(0.16,1,0.3,1) ${300 + i * 140}ms both`,
          }}>
            {line}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   CONTENT BLOCK — remonta via key externo (só o texto)
   ════════════════════════════════════════════════════════ */
function ContentBlock({ block }) {
  const lines = block.title.split("\n");
  return (
    <div>
      <Eyebrow text={block.eyebrow} />

      {block.italic ? (
        <h2 style={{ margin: 0 }}>
          <TitleLines lines={lines} italic />
        </h2>
      ) : (
        <h1 style={{ margin: 0 }}>
          <TitleLines lines={lines} />
        </h1>
      )}

      <p style={{
        fontSize: "clamp(14px, 1.35vw, 17px)",
        fontWeight: 300, lineHeight: 1.78,
        color: "rgba(255,255,255,0.88)",
        maxWidth: 500,
        textShadow: "0 1px 14px rgba(0,0,0,0.65)",
        fontFamily: "'Jost', sans-serif",
        animation: `bodyFadeIn 700ms cubic-bezier(0.4,0,0.2,1) ${300 + lines.length * 140 + 80}ms both`,
      }}>
        {block.body}
      </p>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   HERO SECTION
   ════════════════════════════════════════════════════════ */
export default function HeroSection() {
  const { lang } = useLang();
  const c = CONTENT[lang] || CONTENT.en;

  const [cur, setCur]   = useState(0);
  const [prev, setPrev] = useState(null);

  /* Usar refs para o timer e para o índice actual
     → evita closures stale no setTimeout */
  const timerRef = useRef(null);
  const curRef   = useRef(0);

  useEffect(() => {
    function advance() {
      const next = (curRef.current + 1) % TOTAL;
      setPrev(curRef.current);
      setCur(next);
      curRef.current = next;
      timerRef.current = setTimeout(advance, DURATIONS[next % DURATIONS.length]);
    }

    timerRef.current = setTimeout(advance, DURATIONS[0]);
    return () => clearTimeout(timerRef.current);
  }, []); /* ← array vazio: só corre uma vez, sem dependências stale */

  const moment = getMoment(cur);
  const block  = c[moment];

  return (
    <section style={{
      position: "relative",
      width: "100%",
      height: "100dvh",
      minHeight: 600,
      overflow: "hidden",
      background: "#0a0d12",
    }}>
      <style>{GLOBAL_CSS}</style>

      {/* ── Todos os slides sempre no DOM ── */}
      {heroImages.map((src, i) => (
        <Slide key={i} src={src} active={i === cur} isPrev={i === prev} />
      ))}

      {/* ── Overlay escuro ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none",
        background:
          "linear-gradient(to bottom, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.04) 30%, rgba(0,0,0,0.50) 62%, rgba(0,0,0,0.90) 100%)",
      }} />

      {/* ── Vignette lateral ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none",
        background: "radial-gradient(ellipse at center, transparent 42%, rgba(0,0,0,0.30) 100%)",
      }} />

      {/* ── Conteúdo ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 10,
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        fontFamily: "'Jost', sans-serif",
      }}>
        <style>{`
          .hero-content-inner { padding: 0 7% 9%; }
          @media (max-width: 768px) { .hero-content-inner { padding: 0 6% 22%; } }
          @media (max-width: 480px) { .hero-content-inner { padding: 0 5% 26%; } }
        `}</style>

        <div className="hero-content-inner">
          {/* key=moment → só o bloco de texto remonta, NÃO as imagens */}
          <ContentBlock key={moment} block={block} />
        </div>
      </div>
    </section>
  );
}