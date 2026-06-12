import { useState, useEffect, useRef } from "react";
import "./App.css";

const petals = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 8,
  duration: 6 + Math.random() * 6,
  size: 10 + Math.random() * 14,
  emoji: ["🌼", "🌻", "✿", "❀", "💛"][Math.floor(Math.random() * 5)],
}));

const hearts = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: 5 + Math.random() * 90,
  delay: Math.random() * 5,
  duration: 4 + Math.random() * 4,
}));

const sections = [
  {
    id: "wish",
    title: "Selamat Ulang Tahun, Ayis",
    content: `Cie tambah tua:P AKHIRNYA SEUMURAN, FIX GABOLE EJEK AKU TUA!`,
  },
  {
    id: "hope",
    title: "My Wishes for You",
    content: `Sebenernya wishnya udah aku tulis sii di letter tadi, but please jangan dibaca dipahami doang. DILAKUIN!!!`,
  },
  {
    id: "confession",
    title: "And.. there's something i wanna say...",
    content: `I might not be the best friend u ever had, aku jahat, aku jg banyak salah. Tapi aku beneran peduli sm kamu, aku beneran sayang, not just as friends but... more. Well.. i love u, still love u, truly deh no fake no tipu. Sorry buat jahatku selama ini, aku berusaha buat nebus, that's why aku mungkin keliatan perhatian banget, nanyain kamu, gopud tf, etc. Semoga luka di hati kamu bisa sembuh sedikit demi sedikit <3`,
    special: true,
  },
  {
    id: "video",
    title: "Kmu",
    videoUrl: "https://www.youtube.com/embed/OWbtxdq5rvQ",
  },
  {
    id: "game",
    title: "Maw main gim?",
    gameUrl: "https://www.crazygames.com/",
    gameLabel: "game",
  },
];

function FloatingParticle({ petal }) {
  return (
    <span className="petal" style={{ left: petal.left+"%", animationDelay: petal.delay+"s", animationDuration: petal.duration+"s", fontSize: petal.size+"px" }}>
      {petal.emoji}
    </span>
  );
}

function FloatingHeart({ heart }) {
  return (
    <span className="heart-float" style={{ left: heart.left+"%", animationDelay: heart.delay+"s", animationDuration: heart.duration+"s" }}>
      ♡
    </span>
  );
}

function Section({ section, index }) {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`section-card${visible ? " visible" : ""}${section.special ? " special-card" : ""}`} style={{ transitionDelay: index * 0.1 + "s" }}>
      <div className="section-icon">{section.icon}</div>
      <h2 className="section-title">{section.title}</h2>

      {section.special && !open ? (
        <div className="locked-content">
          <p className="teaser">Please read me</p>
          <button className="open-btn" onClick={() => setOpen(true)}>Open me!</button>
        </div>
      ) : section.content ? (
        <p className="section-content">{section.content}</p>
      ) : null}

      {section.videoUrl && (
        <div style={{ position: "relative", paddingBottom: "56.25%", borderRadius: "14px", overflow: "hidden", marginTop: "0.5rem" }}>
          <iframe
            src={section.videoUrl}
            title={section.title}
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {section.gameUrl && (
        <div style={{ textAlign: "center", marginTop: "0.5rem" }}>
          <a
            href={section.gameUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="open-btn"
            style={{ display: "inline-block", textDecoration: "none" }}
          >
            {section.gameLabel || "Main game 🎮"}
          </a>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 300);
    setTimeout(() => setShowContent(true), 1200);
  }, []);

  return (
    <div className="app">
      <div className="bg-gradient" />
      <div className="petals-container">
        {petals.map((p) => <FloatingParticle key={p.id} petal={p} />)}
      </div>
      <div className="hearts-container">
        {hearts.map((h) => <FloatingHeart key={h.id} heart={h} />)}
      </div>
      <header className={`hero${loaded ? " hero-in" : ""}`}>
        <div className="hero-inner">
          <h1 className="hero-title">Happy Birthday<br /><em>Ayis</em></h1>
          <div className="divider-line" />
          <p className="hero-sub">May your day always be filled with happiness</p>
        </div>
      </header>
      <main className={`content${showContent ? " content-in" : ""}`}>
        {sections.map((sec, i) => <Section key={sec.id} section={sec} index={i} />)}
      </main>
      <footer className="footer">
        <p>made with love — @siandeluna</p>
      </footer>
    </div>
  );
}
