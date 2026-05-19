/* ─────────────────────────────────────────────────────────
   SectionBridge.jsx
   Transição limpa entre Hero (escuro) e ExperienceSection
   (claro). Sem gradiente desfocado — linha sharp e moderna.
───────────────────────────────────────────────────────── */

export default function SectionBridge() {
  return (
    <div style={{
      background: "#F2F0ED",   /* cinza quente neutro — casa com areia e escuro */
      height: 80,
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    }}>

      {/* Linha superior: última memória do hero escuro */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: 3,
        background: "#1a1614",   /* mesma cor do fundo do hero — corte sharp */
      }} />

      {/* Elemento decorativo central */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}>
        <span style={{
          display: "block",
          width: 48, height: 1,
          background: "rgba(200,149,108,0.4)",
        }} />
        <span style={{
          display: "block",
          width: 4, height: 4,
          borderRadius: "50%",
          background: "#C8956C",
          opacity: 0.7,
        }} />
        <span style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: 8.5, fontWeight: 500,
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: "rgba(200,149,108,0.6)",
        }}>
          Soft Sands
        </span>
        <span style={{
          display: "block",
          width: 4, height: 4,
          borderRadius: "50%",
          background: "#C8956C",
          opacity: 0.7,
        }} />
        <span style={{
          display: "block",
          width: 48, height: 1,
          background: "rgba(200,149,108,0.4)",
        }} />
      </div>

      {/* Linha inferior: entrada suave no branco da experience */}
      <div style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        height: 1,
        background: "rgba(200,149,108,0.15)",
      }} />
    </div>
  );
}