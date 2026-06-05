import { useState, useEffect, useRef } from "react";
import "./App.css";

const petals = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 8,
  duration: 6 + Math.random() * 6,
  size: 10 + Math.random() * 14,
  emoji: ["🌸", "🌷", "✿", "❀", "🌺"][Math.floor(Math.random() * 5)],
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
    // icon: "🎂",
    title: "Selamat Ulang Tahun, Ayis",
    // content: `Di hari yang istimewa ini, aku ingin kamu tahu betapa berartinya kamu.\nSelamat ulang tahun, Ayis — semoga hari ini dan seterusnya selalu dipenuhi kebahagiaan yang tulus, tawa yang hangat, dan cinta yang tiada habisnya.`,
  },
  // {
  //   id: "sweet",
  //   icon: "🌸",
  //   title: "Kata-kata Manis Untukmu",
  //   content: `Kamu adalah salah satu orang paling istimewa yang pernah ada di hidupku.\nAda sesuatu dalam dirimu — cara kamu bicara, cara kamu peduli, cara kamu ada — yang bikin dunia ini terasa lebih hangat dan lebih berarti.\n\nKamu layak mendapatkan semua hal terbaik yang ada di dunia ini.\nSemua kebaikan yang kamu berikan kepada orang lain, semoga kembali kepadamu berlipat ganda.`,
  // },
  // {
  //   id: "hope",
  //   icon: "✨",
  //   title: "Harapan & Doa Untukmu",
  //   content: `Semoga di tahun ini dan tahun-tahun ke depan:\n\n🌟 Setiap langkahmu selalu diberkati dan dipermudah\n💪 Segala mimpi dan cita-citamu perlahan jadi kenyataan\n🌿 Kesehatan selalu menemanimu di setiap hari\n💛 Orang-orang yang kamu sayangi selalu ada untukmu\n🌈 Kebahagiaan datang dari hal-hal kecil yang sering terlewat\n🕊️ Hatimu selalu damai, meskipun dunia terasa berat`,
  // },
  {
    id: "confession",
    // icon: "💌",
    title: "Theres something i awanna say...",
    content: `I might not be the best friend u ever had, aku jahat, aku jg banyak salah. Tapi aku beneran peduli sm kamu, aku beneran sayang, not just as friends but... more. Sorry buat jahatku selama ini, aku`,
    special: true,
  },
  // {
  //   id: "close",
  //   icon: "🎀",
  //   title: "Untuk Kamu, Ayis",
  //   content: `Jadilah dirimu yang paling bahagia. Jangan lupa istirahat, jangan lupa makan, jangan lupa tersenyum — karena senyummu itu menular dan memperindah hari-hari orang di sekitarmu.\n\nSemoga ulang tahun ini jadi awal dari babak baru yang lebih indah, lebih berani, dan lebih penuh cinta.\n\nSelamat ulang tahun, Ayis. 🌸\nDengan sepenuh hati,\n— seseorang yang benar-benar menyayangimu.`,
  // },
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
          <button className="open-btn" onClick={() => setOpen(true)}>Buka Pesan 💌</button>
        </div>
      ) : (
        <p className="section-content">{section.content}</p>
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
          {/* <p className="pre-title">— made with love —</p> */}
          <h1 className="hero-title">Happy Birthday<br /><em>Ayis</em></h1>
          <div className="divider-line" />
          <p className="hero-sub">May your day always be filled with happiness</p>
        </div>
      </header>
      <main className={`content${showContent ? " content-in" : ""}`}>
        {sections.map((sec, i) => <Section key={sec.id} section={sec} index={i} />)}
      </main>
      <footer className="footer">
        <p>Made with 💗 — khusus untuk Ayis</p>
      </footer>
    </div>
  );
}
