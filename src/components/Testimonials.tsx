"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

// ── Testimonial data ──────────────────────────────────────────────────────────
const testimonials = [
  {
    id: 1,
    quote:
      "Mishael Graphics did an amazing work for the LAMP FESTIVAL 2026 Branding and I'm grateful.",
    name: "OJ Nathaniel",
    role: "CEO",
    company: "Optimum Health Global (OPHEG)",
    rating: 5,
    initials: "OJ",
    accent: "#3b82f6",
  },
  {
    id: 2,
    quote:
      "I enjoy working with you and you have a calm mindset that allows ideas. Truly a creative partner.",
    name: "JoshZay",
    role: "Music Artist",
    company: "",
    rating: 4,
    initials: "JZ",
    accent: "#6366f1",
  },
  {
    id: 3,
    quote:
      "Mishael's Graphics has consistently delivered professional and creative branding for ASEND Corporation. From our yearly flyers to other design projects, Mishael always provides quality work on time. Highly recommended.",
    name: "Engr. David Baar",
    role: "Board Chair / Co-Founder",
    company: "ASEND Corporation",
    rating: 5,
    initials: "DB",
    accent: "#3b82f6",
  },
  {
    id: 4,
    quote:
      "Working with Mishael's Graphics has really helped my business grow online. From beautiful flyer designs to professionally managing my page, the creativity and consistency have been outstanding. I'm always satisfied with the quality of work delivered.",
    name: "Mummy Joy",
    role: "CEO",
    company: "Mummy Joy's Amazing Cakes",
    rating: 5,
    initials: "MJ",
    accent: "#ec4899",
  },
  {
    id: 5,
    quote:
      "Mishael's Graphics has been very consistent and professional in designing our weekly Sunday service flyers. The designs are always clean, creative, and delivered on time. Truly commendable work.",
    name: "Apostle TT Emmanuel",
    role: "Senior Pastor",
    company: "Paradise Mission International",
    rating: 5,
    initials: "AE",
    accent: "#8b5cf6",
  },
  {
    id: 6,
    quote:
      "Working with Mishael Graphics was an absolute pleasure. He took my vague ideas and turned them into a clean, modern, and highly beautiful design that perfectly reflects my style and work. The communication was smooth, revisions were fast, and the final result exceeded my expectations in both design quality and attention to detail.",
    name: "Mendi Soledad Mengi",
    role: "Owner",
    company: "Ms Creation Bakery",
    rating: 5,
    initials: "MS",
    accent: "#f59e0b",
  },
  {
    id: 7,
    quote:
      "I want to give a shout out to you for consistently delivering quality portraits. You are very punctual, humbled and the fastest Graphic designer I've ever come across. Your works are affordable and clean, and your visual has clarity.",
    name: "Nitara",
    role: "Client",
    company: "",
    rating: 4,
    initials: "N",
    accent: "#10b981",
  },
  {
    id: 8,
    quote:
      "Mishael has been handling our church visuals for the past 3 years and I must say he is good.",
    name: "Pastor Nkfuh Veracity",
    role: "Pastor",
    company: "CAGMIL",
    rating: 5,
    initials: "NV",
    accent: "#8b5cf6",
  },
  {
    id: 9,
    quote:
      "Mishael's Graphic is my number 1 and trusted designer. I always feel happy when I got a design to do cause I know my designer will deliver for me and will deliver excellently. I keep 0.5 cause he comes and replies to my messages late even after delivering 😂",
    name: "Engr Usmanu Jr.",
    role: "Former DAAS ASEND",
    company: "Paris, France",
    rating: 4.5,
    initials: "UJ",
    accent: "#f59e0b",
  },
  {
    id: 10,
    quote:
      "Mishael Graphics didn't just teach me graphic design — it gave me a real skill that changed how I earn a living. The training was clear, practical, and hands-on, making it easy to understand even the complex parts of design. Today, I'm confident in my work and able to take on projects that actually bring income. I'm genuinely grateful for the impact Mishael Graphics has had on my journey and growth as a designer.",
    name: "AG Designs",
    role: "Design Student / Graduate",
    company: "",
    rating: 5,
    initials: "AG",
    accent: "#3b82f6",
  },
  {
    id: 11,
    quote:
      "Working with Mishael Graphics has been a great experience. He is very talented, listens carefully to ideas, and always delivers quality work professionally and on time. I truly love his creativity and smooth communication throughout the process. I highly recommend him to anyone looking for amazing graphic design services..",
    name: "Dado 237",
    role: "Music Artist",
    company: "USA",
    rating: 5,
    initials: "D2",
    accent: "#ec4899",
  },
  {
    id: 12,
    quote:
      "Mishael's Graphics did good branding for Ocean Hack, giving the occasion a unified look, while delivering the results on time.",
    name: "Engr. Rachel Mifor",
    role: "Organizer",
    company: "Ocean Hack",
    rating: 5,
    initials: "RM",
    accent: "#06b6d4",
  },
];

// ── Star rating (gold, supports half stars) ───────────────────────────────────
const GOLD = "#f59e0b";
const GOLD_EMPTY = "#374151";

function Stars({
  rating,
  ownerId,
}: {
  rating: number;
  ownerId?: number | string;
}) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const full = rating >= i + 1;
        const half = !full && rating >= i + 0.5;
        const uid = `half-${ownerId ?? "0"}-${i}`;
        return (
          <svg key={i} width="15" height="15" viewBox="0 0 24 24">
            {half && (
              <defs>
                <linearGradient id={uid} x1="0" x2="1" y1="0" y2="0">
                  <stop offset="50%" stopColor={GOLD} />
                  <stop offset="50%" stopColor="transparent" />
                </linearGradient>
              </defs>
            )}
            <polygon
              points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
              fill={full ? GOLD : half ? `url(#${uid})` : "none"}
              stroke={full || half ? GOLD : GOLD_EMPTY}
              strokeWidth="1.5"
            />
          </svg>
        );
      })}
    </div>
  );
}

// ── Avatar ────────────────────────────────────────────────────────────────────
function Avatar({
  initials,
  accent,
  size = 44,
}: {
  initials: string;
  accent: string;
  size?: number;
}) {
  return (
    <div
      id="testimonials"
      className="flex items-center justify-center rounded-full font-bold text-sm flex-shrink-0 select-none"
      style={{
        width: size,
        height: size,
        background: `${accent}22`,
        border: `1.5px solid ${accent}55`,
        color: accent,
        fontSize: size * 0.3,
        letterSpacing: "0.04em",
      }}
    >
      {initials}
    </div>
  );
}

// ── Testimonial card ──────────────────────────────────────────────────────────
function TestimonialCard({
  t,
  i,
  isDark,
}: {
  t: (typeof testimonials)[0];
  i: number;
  isDark: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: (i % 3) * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -5 }}
      className="group relative flex flex-col rounded-2xl border p-7 transition-all duration-300 cursor-default"
      style={{
        background: isDark ? "#0d0f1e" : "#ffffff",
        borderColor: isDark
          ? "rgba(255,255,255,0.07)"
          : "rgba(59,130,246,0.15)",
        boxShadow: isDark
          ? "0 4px 24px rgba(0,0,0,0.4)"
          : "0 4px 24px rgba(59,130,246,0.08), 0 1px 4px rgba(0,0,0,0.05)",
      }}
    >
      {/* Top accent bar that grows on hover */}
      <div
        className="absolute top-0 left-6 right-6 h-0.5 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
        style={{
          background: `linear-gradient(90deg, ${t.accent}, transparent)`,
        }}
      />

      {/* Quote mark */}
      <div
        className="absolute top-5 right-6 text-5xl font-black leading-none select-none pointer-events-none"
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          color: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
          fontSize: "4.5rem",
        }}
      >
        "
      </div>

      {/* Stars */}
      <Stars rating={t.rating} ownerId={t.id} />

      {/* Quote */}
      <p
        className="relative mt-4 mb-6 text-sm leading-7 flex-1"
        style={{
          color: isDark ? "#9ca3af" : "#334155",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        "{t.quote}"
      </p>

      {/* Divider */}
      <div
        className="mb-5 h-px"
        style={{
          background: isDark
            ? "rgba(255,255,255,0.06)"
            : "rgba(59,130,246,0.1)",
        }}
      />

      {/* Author */}
      <div className="flex items-center gap-3">
        <Avatar initials={t.initials} accent={t.accent} />
        <div>
          <p
            className="text-sm font-bold leading-tight"
            style={{ color: isDark ? "#f1f5f9" : "#0f172a" }}
          >
            {t.name}
          </p>
          <p
            className="text-xs mt-0.5 leading-snug"
            style={{ color: isDark ? "#6b7280" : "#64748b" }}
          >
            {t.role}
            {t.company ? ` · ${t.company}` : ""}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ── Fade-up wrapper ───────────────────────────────────────────────────────────
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function TestimonialsPage() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted
    ? (theme === "system" ? resolvedTheme : theme) === "dark"
    : true;

  const bg = isDark ? "#080a17" : "#f1f5f9";
  const surface = isDark ? "#0d0f1e" : "#ffffff";
  const textMain = isDark ? "#f9fafb" : "#0f172a";
  const textBody = isDark ? "#9ca3af" : "#334155";
  const textFaint = isDark ? "#6b7280" : "#64748b";
  const borderCol = isDark ? "rgba(255,255,255,0.06)" : "rgba(59,130,246,0.12)";

  // average rating
  const avg = (
    testimonials.reduce((s, t) => s + t.rating, 0) / testimonials.length
  ).toFixed(1);

  return (
    <div
      id="testimonials"
      style={{
        background: bg,
        color: textMain,
        fontFamily: "'DM Sans','Helvetica Neue',sans-serif",
        minHeight: "100vh",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:${bg}}
        ::-webkit-scrollbar-thumb{background:#3b82f633;border-radius:2px}
      `}</style>

      {/* ── HERO ── */}
      <section className="pt-32 pb-16 px-6 md:px-14 max-w-5xl mx-auto text-center">
        <FadeUp delay={0}>
          <p className="text-xs font-bold tracking-[0.32em] uppercase text-blue-500 mb-4">
            Testimonials
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2.4rem, 5.5vw, 4rem)",
              fontWeight: 900,
              lineHeight: 1.08,
              color: textMain,
            }}
          >
            What Clients Say{" "}
            <span
              style={{
                backgroundImage: "linear-gradient(135deg,#3b82f6,#818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              About Us
            </span>
          </h1>
        </FadeUp>

        {/* ── QUOTE BLOCK — styled like the image ── */}
        <FadeUp delay={0.2}>
          <div
            className="relative mt-12 mb-4 mx-auto max-w-3xl rounded-3xl px-8 md:px-14 py-12 overflow-hidden"
            style={{
              background: isDark
                ? "linear-gradient(135deg,#0d1035 0%,#0a0d28 50%,#0d0f1e 100%)"
                : "linear-gradient(135deg,#1e2a6e 0%,#1a2060 60%,#12174a 100%)",
              border: "1px solid rgba(99,102,241,0.2)",
              boxShadow: isDark
                ? "0 24px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)"
                : "0 24px 80px rgba(30,42,110,0.35)",
            }}
          >
            {/* Ambient glow blobs */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 20% 50%,rgba(99,102,241,0.18) 0%,transparent 55%), radial-gradient(ellipse at 80% 20%,rgba(59,130,246,0.12) 0%,transparent 50%)",
              }}
            />

            {/* APPROACH label */}
            <p
              className="relative text-center text-xs font-semibold tracking-[0.32em] uppercase mb-8"
              style={{ color: "rgba(148,163,184,0.7)" }}
            >
              Approach
            </p>

            {/* Quote text */}
            <blockquote
              className="relative text-center leading-relaxed"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(1.15rem, 2.5vw, 1.55rem)",
                fontWeight: 700,
                color: "#f1f5f9",
                lineHeight: 1.65,
              }}
            >
              "Great design is not just what you see, but how{" "}
              <em
                style={{
                  fontStyle: "italic",
                  backgroundImage: "linear-gradient(135deg,#818cf8,#6366f1)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 700,
                }}
              >
                satisfied
              </em>{" "}
              you feel when your vision is brought to life exactly as you
              imagined."
            </blockquote>

            {/* Attribution */}
            <p
              className="relative text-center mt-7 text-sm font-semibold tracking-wide"
              style={{ color: "rgba(148,163,184,0.65)" }}
            >
              — Mishael Graphics
            </p>
          </div>
        </FadeUp>

        {/* Overall rating bar */}
        <FadeUp delay={0.28}>
            <div className="flex items-center justify-center gap-3 mt-8 flex-wrap">
            <Stars rating={5} ownerId={'overall'} />
            <span
              className="text-2xl font-black"
              style={{
                color: textMain,
                fontFamily: "'Playfair Display',Georgia,serif",
              }}
            >
              {avg}
            </span>
            <span className="text-sm" style={{ color: textFaint }}>
              out of 5 · {testimonials.length} reviews
            </span>
          </div>
        </FadeUp>
      </section>

      {/* ── GRID ── */}
      <section className="pb-28 px-6 md:px-14 max-w-7xl mx-auto">
        {/* Masonry-style 3-col grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {testimonials.map((t, i) => (
            <div key={t.id} className="break-inside-avoid">
              <TestimonialCard t={t} i={i} isDark={isDark} />
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section className="pb-28 px-6 md:px-14 max-w-4xl mx-auto">
        <FadeUp>
          <div
            className="relative overflow-hidden rounded-3xl p-10 md:p-14 text-center border"
            style={{
              background: surface,
              borderColor: borderCol,
              boxShadow: isDark
                ? "0 20px 70px rgba(0,0,0,0.45)"
                : "0 12px 50px rgba(59,130,246,0.09)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 110%,rgba(59,130,246,0.1) 0%,transparent 65%)",
              }}
            />
            <div className="absolute top-5 left-5 w-8 h-8 border-t border-l border-blue-500/30 rounded-tl-lg" />
            <div className="absolute bottom-5 right-5 w-8 h-8 border-b border-r border-blue-500/30 rounded-br-lg" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

            <p className="relative text-xs font-bold tracking-[0.3em] uppercase text-blue-500 mb-3">
              Your Turn
            </p>
            <h2
              className="relative text-3xl md:text-4xl font-black mb-4 leading-tight"
              style={{
                fontFamily: "'Playfair Display',Georgia,serif",
                color: textMain,
              }}
            >
              Ready to join our{" "}
              <span className="text-blue-500">happy clients?</span>
            </h2>
            <p
              className="relative text-sm leading-7 mb-8 max-w-lg mx-auto"
              style={{ color: textBody }}
            >
              Let's bring your vision to life. Great design starts with a
              conversation.
            </p>

            <motion.a
              href="https://wa.me/237676665670"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-sm uppercase tracking-widest transition-all duration-300"
              style={{
                background: "#3b82f6",
                color: "#fff",
                boxShadow: "0 0 30px rgba(59,130,246,0.35)",
                textDecoration: "none",
                letterSpacing: "0.16em",
              }}
            >
              {/* WhatsApp icon */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Start a Project
            </motion.a>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}
