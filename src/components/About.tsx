"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

// ── Animated counter ──────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1800, triggered = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!triggered) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [triggered, target, duration]);
  return count;
}

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  suffix = "",
  delay = 0,
  isDark,
}: {
  label: string;
  value: number;
  suffix?: string;
  delay?: number;
  isDark: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const count = useCountUp(value, 1800, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.04 }}
      className="group relative flex flex-col items-center justify-center text-center
                 px-8 py-10 rounded-2xl cursor-default select-none border transition-all duration-300"
      style={{
        background: isDark ? "#0d0f1e" : "#ffffff",
        borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(59,130,246,0.2)",
        boxShadow: isDark
          ? "0 4px 24px rgba(0,0,0,0.5)"
          : "0 4px 24px rgba(59,130,246,0.1), 0 1px 4px rgba(0,0,0,0.06)",
      }}
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%,rgba(59,130,246,0.12) 0%,transparent 70%)",
        }}
      />
      <span
        className="relative text-5xl font-black tracking-tighter leading-none group-hover:text-blue-500 transition-colors duration-300"
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          color: isDark ? "#ffffff" : "#0d0f1e",
        }}
      >
        {count}
        {suffix}
      </span>
      <span
        className="relative mt-3 text-xs font-bold tracking-[0.22em] uppercase"
        style={{ color: isDark ? "#6b7280" : "#475569" }}
      >
        {label}
      </span>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 group-hover:w-3/4 rounded-full bg-blue-500 transition-all duration-500" />
    </motion.div>
  );
}

// ── Services ──────────────────────────────────────────────────────────────────
const services = [
  {
    icon: "✦",
    title: "Graphic Design",
    desc: "Bold, expressive, purpose-driven visuals crafted to communicate and captivate.",
    img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&q=80",
  },
  {
    icon: "◈",
    title: "Branding & Identity",
    desc: "Unique brand systems that stand out, stay memorable, and build lasting trust.",
    img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80",
  },
  {
    icon: "⬡",
    title: "UI/UX Design",
    desc: "Intuitive, user-centred digital interfaces that delight and convert.",
    img: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&q=80",
  },
  {
    icon: "⟨/⟩",
    title: "Web Development",
    desc: "Modern, responsive websites built with clean structure and performance in mind.",
    img: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&q=80",
  },
  {
    icon: "⊞",
    title: "Potraits & Enlargements",
    desc: "Wood, Glass, Acrylic, Motivational frames.",
    img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&q=80",
  },
  {
    icon: "▶",
    title: "Video Editing",
    desc: "Cinematic, engaging, story-driven edits crafted to captivate audiences and bring visuals to life.",
    img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&q=80",
  },
];

const CARD_WIDTH = 240;
const CARD_GAP = 20;

function ServiceCard({
  s,
  i,
  isDark,
}: {
  s: (typeof services)[0];
  i: number;
  isDark: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-2xl flex-shrink-0 border transition-all duration-400 cursor-default"
      style={{
        width: CARD_WIDTH,
        height: 300,
        background: isDark ? "#0d0f1e" : "#ffffff",
        borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(59,130,246,0.2)",
        boxShadow: isDark
          ? "0 4px 20px rgba(0,0,0,0.4)"
          : "0 4px 20px rgba(59,130,246,0.1), 0 1px 4px rgba(0,0,0,0.05)",
      }}
    >
      <div
        className="absolute inset-0 transition-all duration-700 group-hover:scale-110"
        style={{
          backgroundImage: `url(${s.img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: isDark ? 0.08 : 0.06,
          filter: "grayscale(30%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(160deg,rgba(59,130,246,0.08) 0%,transparent 100%)",
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      <div className="relative flex flex-col h-full p-6 justify-between">
        <span
          className="text-3xl font-light transition-colors duration-300 group-hover:text-blue-500"
          style={{ color: isDark ? "#4b5563" : "#94a3b8" }}
        >
          {s.icon}
        </span>
        <div>
          <h3
            className="text-sm font-bold mb-2 leading-snug transition-colors duration-300 group-hover:text-blue-500"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: isDark ? "#e5e7eb" : "#0f172a",
            }}
          >
            {s.title}
          </h3>
          <p
            className="text-xs leading-relaxed"
            style={{ color: isDark ? "#6b7280" : "#475569" }}
          >
            {s.desc}
          </p>
        </div>
        <div className="w-6 h-px bg-blue-500 transition-all duration-500 group-hover:w-10" />
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
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Nav arrow button ──────────────────────────────────────────────────────────
function NavBtn({
  dir,
  onClick,
  disabled,
  isDark,
}: {
  dir: "left" | "right";
  onClick: () => void;
  disabled: boolean;
  isDark: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.1 }}
      whileTap={disabled ? {} : { scale: 0.93 }}
      className="flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300"
      style={{
        background: disabled
          ? "transparent"
          : isDark
            ? "rgba(59,130,246,0.12)"
            : "rgba(59,130,246,0.08)",
        borderColor: disabled
          ? isDark
            ? "rgba(255,255,255,0.08)"
            : "rgba(0,0,0,0.1)"
          : "rgba(59,130,246,0.4)",
        color: disabled ? (isDark ? "#374151" : "#cbd5e1") : "#3b82f6",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
      aria-label={dir === "left" ? "Scroll left" : "Scroll right"}
    >
      {dir === "left" ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M10 3L5 8l5 5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M6 3l5 5-5 5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </motion.button>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [ctaHover, setCtaHover] = useState(false);

  // services scroll state
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPos, setScrollPos] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [hintShown, setHintShown] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // measure scroll boundaries
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const update = () => {
      setMaxScroll(el.scrollWidth - el.clientWidth);
      setScrollPos(el.scrollLeft);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [mounted]);

  // show hint nudge once after mount
  useEffect(() => {
    if (!mounted) return;
    const timer = setTimeout(() => {
      const el = scrollRef.current;
      if (!el || el.scrollLeft > 0) return;
      el.scrollTo({ left: 30, behavior: "smooth" });
      setTimeout(() => el.scrollTo({ left: 0, behavior: "smooth" }), 500);
      setHintShown(true);
    }, 900);
    return () => clearTimeout(timer);
  }, [mounted]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({
      left: dir === "right" ? CARD_WIDTH + CARD_GAP : -(CARD_WIDTH + CARD_GAP),
      behavior: "smooth",
    });
  };

  const isDark = mounted
    ? (theme === "system" ? resolvedTheme : theme) === "dark"
    : true;
  const bg = isDark ? "#080a17" : "#f1f5f9";
  const surface = isDark ? "#0d0f1e" : "#ffffff";
  const textMain = isDark ? "#f9fafb" : "#0f172a";
  const textBody = isDark ? "#9ca3af" : "#334155";
  const textFaint = isDark ? "#6b7280" : "#475569";
  const borderCol = isDark ? "rgba(255,255,255,0.06)" : "rgba(59,130,246,0.15)";

  const canLeft = scrollPos > 2;
  const canRight = scrollPos < maxScroll - 2;

  return (
    <div
      id="about"
      style={{
        background: bg,
        color: textMain,
        fontFamily: "'DM Sans','Helvetica Neue',sans-serif",
        minHeight: "100vh",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:${bg}}
        ::-webkit-scrollbar-thumb{background:#3b82f633;border-radius:2px}
        .services-scroll::-webkit-scrollbar{display:none}
        .services-scroll{-ms-overflow-style:none;scrollbar-width:none}
      `}</style>

      {/* ── HERO ── */}
      <section className="pt-32 pb-20 px-6 md:px-14 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* LEFT — Photo */}
          <FadeUp delay={0.05}>
            <div className="relative flex justify-center md:justify-start">
              <div className="absolute -inset-4 rounded-3xl border border-blue-500/20 pointer-events-none" />
              <div className="absolute -top-2 -left-2 w-10 h-10 border-t-2 border-l-2 border-blue-500 rounded-tl-xl pointer-events-none" />
              <div className="absolute -bottom-2 -right-2 w-10 h-10 border-b-2 border-r-2 border-blue-500 rounded-br-xl pointer-events-none" />
              <div className="absolute -top-2 -right-2 w-6 h-6 border-t border-r border-blue-500/40 rounded-tr-lg pointer-events-none" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b border-l border-blue-500/40 rounded-bl-lg pointer-events-none" />
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 40% 60%,rgba(59,130,246,0.14) 0%,transparent 70%)",
                }}
              />

              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="relative rounded-2xl overflow-hidden"
                style={{
                  width: "clamp(260px,32vw,360px)",
                  height: "clamp(320px,40vw,440px)",
                  border: "1.5px solid rgba(59,130,246,0.3)",
                  boxShadow: isDark
                    ? "0 24px 70px rgba(0,0,0,0.6), 0 0 0 1px rgba(59,130,246,0.1)"
                    : "0 16px 50px rgba(59,130,246,0.15), 0 0 0 1px rgba(59,130,246,0.08)",
                  background: surface,
                }}
              >
                <Image
                  src="/reew3.webp"
                  alt="Mishael Zabud"
                  fill
                  className="object-cover object-center"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
                  style={{
                    background: `linear-gradient(to top,${isDark ? "#0d0f1e" : "#ffffff"}33,transparent)`,
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
                className="absolute -bottom-5 -right-3 flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold tracking-wider uppercase"
                style={{
                  background: isDark ? "#0d0f1e" : "#ffffff",
                  borderColor: "rgba(59,130,246,0.35)",
                  color: "#3b82f6",
                  boxShadow: "0 4px 20px rgba(59,130,246,0.2)",
                }}
              >
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                Available for work
              </motion.div>
            </div>
          </FadeUp>

          {/* RIGHT — Text */}
          <div className="flex flex-col gap-5">
            <FadeUp delay={0.1}>
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-blue-500">
                About Me
              </p>
            </FadeUp>
            <FadeUp delay={0.18}>
              <h1
                style={{
                  fontFamily: "'Playfair Display',Georgia,serif",
                  fontSize: "clamp(2.6rem,5vw,3.8rem)",
                  fontWeight: 900,
                  lineHeight: 1.05,
                  color: textMain,
                }}
              >
                Mishael
                <br />
                <span
                  style={{
                    backgroundImage: "linear-gradient(135deg,#3b82f6,#60a5fa)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Zabud
                </span>
              </h1>
            </FadeUp>
            <FadeUp delay={0.24}>
              <div
                className="h-px w-2/3"
                style={{
                  background: "linear-gradient(90deg,#3b82f6,transparent)",
                }}
              />
            </FadeUp>
            <FadeUp delay={0.3}>
              <p
                className="text-sm leading-8 font-normal"
                style={{ color: textBody, maxWidth: 480 }}
              >
                A multidisciplinary creative working at the intersection of{" "}
                <span className="text-blue-500 font-semibold">
                  Graphic Design
                </span>
                , <span className="text-blue-500 font-semibold">Branding</span>,{" "}
                <span className="text-blue-500 font-semibold">UI/UX</span>, and{" "}
                <span className="text-blue-500 font-semibold">
                  Web Development
                </span>
                . Crafting clean, meaningful, and visually compelling digital
                experiences that help brands communicate with clarity and
                confidence.
              </p>
            </FadeUp>
            <FadeUp delay={0.38}>
              <p
                className="text-sm leading-8"
                style={{ color: textFaint, maxWidth: 480 }}
              >
                My work blends design thinking and visual storytelling —
                transforming ideas into designs that are not only visually
                appealing but strategically effective.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-16 px-6 md:px-14 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <StatCard
            label="Years of Experience"
            value={12}
            suffix="+"
            delay={0}
            isDark={isDark}
          />
          <StatCard
            label="Satisfied Clients"
            value={60}
            suffix="+"
            delay={0.12}
            isDark={isDark}
          />
          <StatCard
            label="Completed Projects"
            value={300}
            suffix="+"
            delay={0.24}
            isDark={isDark}
          />
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-16 px-6 md:px-14 max-w-7xl mx-auto">
        <FadeUp>
          {/* Header row: label + nav controls */}
          <div className="flex items-center justify-between mb-10 gap-3 flex-wrap">
            <div>
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-blue-500 mb-2">
                What I Do
              </p>
              <h2
                style={{
                  fontFamily: "'Playfair Display',Georgia,serif",
                  fontSize: "clamp(1.8rem,3.5vw,2.6rem)",
                  fontWeight: 900,
                  color: textMain,
                }}
              >
                Services
              </h2>
            </div>

            {/* Controls: hint text + arrows */}
            <div className="flex items-center gap-3">
              {/* Swipe hint — visible on ALL screen sizes */}
              <motion.span
                key="hint"
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-1.5 text-xs font-medium select-none"
                style={{ color: isDark ? "#6b7280" : "#94a3b8" }}
              >
                {/* finger swipe icon */}
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 11V6a2 2 0 0 1 4 0v5" />
                  <path d="M13 11V8a2 2 0 0 1 4 0v3" />
                  <path d="M17 11v-1a2 2 0 0 1 4 0v4a6 6 0 0 1-6 6H9a5 5 0 0 1-4.5-2.8L3 17" />
                  <path d="M3 13V9a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2" />
                </svg>
                Swipe to explore
              </motion.span>

              {/* Arrow buttons — always visible */}
              <NavBtn
                dir="left"
                onClick={() => scroll("left")}
                disabled={!canLeft}
                isDark={isDark}
              />
              <NavBtn
                dir="right"
                onClick={() => scroll("right")}
                disabled={!canRight}
                isDark={isDark}
              />
            </div>
          </div>
        </FadeUp>

        {/* Scrollable track */}
        <div className="relative">
          {/* Left fade mask */}
          <div
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 z-10 transition-opacity duration-300"
            style={{
              background: `linear-gradient(to right, ${bg}, transparent)`,
              opacity: canLeft ? 1 : 0,
            }}
          />
          {/* Right fade mask */}
          <div
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10 transition-opacity duration-300"
            style={{
              background: `linear-gradient(to left, ${bg}, transparent)`,
              opacity: canRight ? 1 : 0,
            }}
          />

          <div
            ref={scrollRef}
            className="services-scroll flex gap-5 overflow-x-auto pb-4 scroll-smooth"
          >
            {services.map((s, i) => (
              <ServiceCard key={s.title} s={s} i={i} isDark={isDark} />
            ))}
            {/* Trailing spacer so last card isn't flush against the fade mask */}
            <div className="flex-shrink-0 w-2" />
          </div>

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-2 mt-5">
            {services.map((_, i) => {
              const perCard = CARD_WIDTH + CARD_GAP;
              const active = Math.round(scrollPos / perCard) === i;
              return (
                <button
                  key={i}
                  onClick={() =>
                    scrollRef.current?.scrollTo({
                      left: i * perCard,
                      behavior: "smooth",
                    })
                  }
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: active ? 20 : 6,
                    height: 6,
                    background: active
                      ? "#3b82f6"
                      : isDark
                        ? "#374151"
                        : "#cbd5e1",
                  }}
                  aria-label={`Go to service ${i + 1}`}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 md:px-14 max-w-5xl mx-auto">
        <FadeUp>
          <div
            className="relative overflow-hidden rounded-3xl p-12 md:p-16 text-center border"
            style={{
              background: surface,
              borderColor: borderCol,
              boxShadow: isDark
                ? "0 24px 80px rgba(0,0,0,0.5)"
                : "0 16px 60px rgba(59,130,246,0.1), 0 1px 4px rgba(0,0,0,0.06)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 110%,rgba(59,130,246,0.1) 0%,transparent 65%)",
              }}
            />
            <div className="absolute top-5 left-5 w-10 h-10 border-t border-l border-blue-500/30 rounded-tl-lg" />
            <div className="absolute bottom-5 right-5 w-10 h-10 border-b border-r border-blue-500/30 rounded-br-lg" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

            <p className="relative text-xs font-bold tracking-[0.3em] uppercase text-blue-500 mb-4">
              Collaboration
            </p>
            <h2
              className="relative text-4xl md:text-5xl font-black mb-6 leading-tight"
              style={{
                fontFamily: "'Playfair Display',Georgia,serif",
                color: textMain,
              }}
            >
              Let's Build Something
              <br />
              <span className="text-blue-500">Great</span>
            </h2>
            <p
              className="relative text-sm md:text-base leading-8 mb-3 max-w-2xl mx-auto font-normal"
              style={{ color: textBody }}
            >
              If you are a business, individual, or brand looking to build a
              strong visual identity or improve your digital presence, I would
              be glad to collaborate.
            </p>
            <p
              className="relative text-sm leading-7 mb-10 max-w-xl mx-auto"
              style={{ color: textFaint }}
            >
              Let's create something modern, meaningful, and visually powerful.{" "}
              <span
                style={{ color: isDark ? "rgba(96,165,250,0.8)" : "#3b82f6" }}
              >
                Your brand deserves the best.
              </span>
            </p>

            <motion.a
              href="https://wa.me/237676665670"
              target="_blank"
              rel="noopener noreferrer"
              onHoverStart={() => setCtaHover(true)}
              onHoverEnd={() => setCtaHover(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="relative inline-flex items-center gap-3 px-9 py-4 rounded-full font-semibold text-sm tracking-widest uppercase transition-all duration-300"
              style={{
                background: ctaHover ? "#3b82f6" : "transparent",
                border: "1.5px solid #3b82f6",
                color: ctaHover ? "#fff" : "#3b82f6",
                boxShadow: ctaHover ? "0 0 40px rgba(59,130,246,0.4)" : "none",
                letterSpacing: "0.18em",
                textDecoration: "none",
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
              Get In Touch
              <motion.svg
                animate={{ x: ctaHover ? 4 : 0 }}
                transition={{ type: "spring", stiffness: 300 }}
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M1 7h12M8 2l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </motion.a>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}
