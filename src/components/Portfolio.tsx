"use client";

// ─────────────────────────────────────────────────────────────────────────────
// NOTE: Since all images are served from your own /public folder,
// no changes to next.config.js are needed. Next.js serves everything
// in /public at the root URL automatically.
// ─────────────────────────────────────────────────────────────────────────────

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

// ─────────────────────────────────────────────────────────────────────────────
// HOW TO ADD YOUR IMAGES
// ─────────────────────────────────────────────────────────────────────────────
// 1. Inside your project's `public` folder, create this folder structure:
//
//    public/
//      portfolio/
//        church/        → church1.jpg, church2.jpg, church3.jpg …
//        portraits/     → portrait1.jpg, portrait2.jpg …
//        business/      → business1.jpg, business2.jpg …
//        birthday/      → birthday1.jpg, birthday2.jpg …
//        social/        → social1.jpg, social2.jpg …
//        events/        → event1.jpg, event2.jpg …
//        music/         → music1.jpg, music2.jpg …
//        banners/       → banner1.jpg, banner2.jpg …
//
// 2. Add each filename to the `images` array below using the path
//    starting from `/portfolio/...`  (Next.js serves public/ at root /)
//
// 3. You can add as many images as you like — the page handles them all.
//    Supported formats: .jpg  .jpeg  .png  .webp
// ─────────────────────────────────────────────────────────────────────────────


const categories = [
  {
    id: "church",
    label: "Church Designs",
    icon: "✝",
    accent: "#818cf8",
    description:
      "Worship programmes, Sunday service flyers, and more for faith communities.",
    images: [
      "/porfolio/church/church1.webp",
      "/porfolio/church/church2.webp",
      "/porfolio/church/church3.webp",
      "/porfolio/church/church4.webp",
      "/porfolio/church/church5.webp",
      "/porfolio/church/church6.webp",
      "/porfolio/church/church7.webp",
      "/porfolio/church/church8.webp",
      "/porfolio/church/church9.webp",
      "/porfolio/church/church10.webp",
      "/porfolio/church/church11.webp",
      "/porfolio/church/church12.webp",
      "/porfolio/church/church13.webp",
      "/porfolio/church/church14.webp",
      "/porfolio/church/church15.webp",
      "/porfolio/church/church16.webp",
      "/porfolio/church/church17.webp",
      "/porfolio/church/church18.webp",
      "/porfolio/church/church19.webp",
      "/porfolio/church/church20.webp",
      "/porfolio/church/church21.webp",
      "/porfolio/church/church22.webp",
      "/porfolio/church/church23.webp",
      "/porfolio/church/church24.webp",
      "/porfolio/church/church25.webp",
      "/porfolio/church/church26.webp",
      "/porfolio/church/church27.webp",
      "/porfolio/church/church28.webp",
    ],
  },

  {
    id: "portraits",
    label: "Portraits & Enlargements",
    icon: "◈",
    accent: "#f59e0b",
    description: "High-quality portrait and photo enlargements.",
    images: [
      "/porfolio/portrait/potrait1.webp",
      "/porfolio/portrait/potrait2.webp",
      "/porfolio/portrait/potrait3.webp",
      "/porfolio/portrait/potrait4.webp",
      "/porfolio/portrait/potrait5.webp",
      "/porfolio/portrait/potrait6.webp",
      "/porfolio/portrait/potrait7.webp",
      "/porfolio/portrait/potrait8.webp",
      "/porfolio/portrait/potrait9.webp",
      "/porfolio/portrait/potrait10.webp",
      "/porfolio/portrait/potrait11.webp",
      "/porfolio/portrait/potrait12.webp",
      "/porfolio/portrait/potrait13.webp",
      "/porfolio/portrait/potrait14.webp",
      "/porfolio/portrait/potrait15.webp",
      "/porfolio/portrait/potrait16.webp",
      "/porfolio/portrait/potrait17.webp",
      "/porfolio/portrait/potrait18.webp",
      "/porfolio/portrait/potrait19.webp",
      "/porfolio/portrait/potrait20.webp",
      "/porfolio/portrait/potrait21.webp",
      "/porfolio/portrait/potrait22.webp",
      "/porfolio/portrait/potrait23.webp",
      "/porfolio/portrait/potrait24.webp",
      "/porfolio/portrait/potrait25.webp",
      "/porfolio/portrait/potrait26.webp",
      "/porfolio/portrait/potrait27.webp",
      "/porfolio/portrait/potrait28.webp",
      "/porfolio/portrait/potrait29.webp",
      "/porfolio/portrait/potrait30.webp",
      "/porfolio/portrait/potrait31.webp",
      "/porfolio/portrait/potrait32.webp",
      "/porfolio/portrait/potrait33.webp",
      "/porfolio/portrait/potrait34.webp",
      "/porfolio/portrait/potrait35.webp",
      "/porfolio/portrait/potrait36.webp",
      "/porfolio/portrait/potrait37.webp",
      "/porfolio/portrait/potrait38.webp",
      "/porfolio/portrait/potrait39.webp",
      "/porfolio/portrait/potrait40.webp",
      "/porfolio/portrait/potrait41.webp",
      "/porfolio/portrait/potrait42.webp",
      "/porfolio/portrait/potrait44.webp",
      "/porfolio/portrait/potrait45.webp",
      "/porfolio/portrait/potrait46.webp",
      "/porfolio/portrait/potrait47.webp",
      "/porfolio/portrait/potrait48.webp",
      "/porfolio/portrait/potrait49.webp",
      "/porfolio/portrait/potrait50.webp",
      "/porfolio/portrait/potrait51.webp",
      "/porfolio/portrait/potrait52.webp",
      "/porfolio/portrait/potrait53.webp",
      "/porfolio/portrait/potrait54.webp",
      "/porfolio/portrait/potrait55.webp",
      "/porfolio/portrait/potrait56.webp",
    ],
  },

  {
    id: "business",
    label: "Business Flyers",
    icon: "◉",
    accent: "#3b82f6",
    description:
      "Corporate promotions, product launches, sale announcements, and brand flyers for businesses and organisations",
    images: [
      "/porfolio/business/business1.webp",
      "/porfolio/business/business2.webp",
      "/porfolio/business/business3.webp",
      "/porfolio/business/business4.webp",
      "/porfolio/business/business5.webp",
      "/porfolio/business/business6.webp",
      "/porfolio/business/business7.webp",
      "/porfolio/business/business8.webp",
      "/porfolio/business/business9.webp",
      "/porfolio/business/business10.webp",
      "/porfolio/business/business11.webp",
      "/porfolio/business/business12.webp",
      "/porfolio/business/business13.webp",
      "/porfolio/business/business14.webp",
      "/porfolio/business/business15.webp",
      "/porfolio/business/business16.webp",
      "/porfolio/business/business17.webp",
      "/porfolio/business/business18.webp",
      "/porfolio/business/business19.webp",
      "/porfolio/business/business20.webp",
      "/porfolio/business/business21.webp",
      "/porfolio/business/business22.webp",
      "/porfolio/business/business23.webp",
      "/porfolio/business/business24.webp",
      "/porfolio/business/business25.webp",
      "/porfolio/business/business26.webp",
      "/porfolio/business/business27.webp",
      "/porfolio/business/business28.webp",
      "/porfolio/business/business29.webp",
      "/porfolio/business/business30.webp",
      "/porfolio/business/business31.webp",
      "/porfolio/business/business32.webp",
      "/porfolio/business/business33.webp",
      "/porfolio/business/business34.webp",
      "/porfolio/business/business35.webp",
      "/porfolio/business/business36.webp",
    ],
  },

  {
    id: "birthday",
    label: "Birthday Flyers",
    icon: "✦",
    accent: "#ec4899",
    description:
      "Colourful, expressive birthday invitation and celebration flyers for every age.",
    images: [
      "/porfolio/birthday/birthday1.webp",
      "/porfolio/birthday/birthday2.webp",
      "/porfolio/birthday/birthday3.webp",
      "/porfolio/birthday/birthday4.webp",
      "/porfolio/birthday/birthday5.webp",
      "/porfolio/birthday/birthday6.webp",
      "/porfolio/birthday/birthday7.webp",
      "/porfolio/birthday/birthday8.webp",
      "/porfolio/birthday/birthday9.webp",
      "/porfolio/birthday/birthday10.webp",
      "/porfolio/birthday/birthday11.webp",
      "/porfolio/birthday/birthday12.webp",
      "/porfolio/birthday/birthday13.webp",
      "/porfolio/birthday/birthday14.webp",
      "/porfolio/birthday/birthday15.webp",
      "/porfolio/birthday/birthday16.webp",
      "/porfolio/birthday/birthday17.webp",
      "/porfolio/birthday/birthday18.webp",
      "/porfolio/birthday/birthday19.webp",
      "/porfolio/birthday/birthday20.webp",
      "/porfolio/birthday/birthday21.webp",
    ],
  },

  {
    id: "funeral",
    label: "Funeral Designs",
    icon: "✞",
    accent: "#94a3b8",
    description:
      "Elegant funeral programmes, memorial posters, tribute flyers, obituary designs, and celebration of life graphics.",
    images: [
      "/porfolio/funeral/funeral1.webp",
      "/porfolio/funeral/funeral2.webp",
      "/porfolio/funeral/funeral3.webp",
      "/porfolio/funeral/funeral4.webp",
      "/porfolio/funeral/funeral5.webp",
      "/porfolio/funeral/funeral6.webp",
      "/porfolio/funeral/funeral7.webp",
      "/porfolio/funeral/funeral8.webp",
      "/porfolio/funeral/funeral9.webp",
      "/porfolio/funeral/funeral10.webp",
      "/porfolio/funeral/funeral11.webp",
      "/porfolio/funeral/funeral12.webp",
      "/porfolio/funeral/funeral13.webp",
    ],
  },

  {
    id: "social",
    label: "Social Media Designs",
    icon: "⬡",
    accent: "#22d3ee",
    description:
      "Instagram posts, Facebook covers, story graphics, and platform-ready content.",
    images: [
      "/porfolio/social/social1.webp",
      "/porfolio/social/social2.webp",
      "/porfolio/social/social3.webp",
      "/porfolio/social/social4.webp",
      "/porfolio/social/social5.webp",
      "/porfolio/social/social6.webp",
      "/porfolio/social/social7.webp",
      "/porfolio/social/social8.webp",
      "/porfolio/social/social9.webp",
      "/porfolio/social/social10.webp",
      "/porfolio/social/social11.webp",
      "/porfolio/social/social12.webp",
      "/porfolio/social/social13.webp",
      "/porfolio/social/social14.webp",
      "/porfolio/social/social15.webp",
      "/porfolio/social/social16.webp",
    ],
  },

  {
    id: "events",
    label: "Event Brandings",
    icon: "◆",
    accent: "#a78bfa",
    description:
      "Full event identity packages — festivals, conferences, and gatherings.",
    images: [
      "/porfolio/events/event1.webp",
      "/porfolio/events/event2.webp",
      "/porfolio/events/event3.webp",
      "/porfolio/events/event4.webp",
      "/porfolio/events/event5.webp",
      "/porfolio/events/event6.webp",
      "/porfolio/events/event7.webp",
      "/porfolio/events/event8.webp",
      "/porfolio/events/event9.webp",
      "/porfolio/events/event10.webp",
      "/porfolio/events/event11.webp",
      "/porfolio/events/event12.webp",
      "/porfolio/events/event13.webp",
      "/porfolio/events/event14.webp",
      "/porfolio/events/event15.webp",
      "/porfolio/events/event16.webp",
      "/porfolio/events/event17.webp",
      "/porfolio/events/event18.webp",
      "/porfolio/events/event19.webp",
      "/porfolio/events/event20.webp",
      "/porfolio/events/event21.webp",
      "/porfolio/events/event22.webp",
      "/porfolio/events/event23.webp",
      "/porfolio/events/event24.webp",
      "/porfolio/events/event25.webp",
      "/porfolio/events/event26.webp",
      "/porfolio/events/event27.webp",
    ],
  },

  {
    id: "music",
    label: "Music Cover Arts",
    icon: "♪",
    accent: "#f97316",
    description:
      "Album artwork, single covers, EP visuals, and artist branding for musicians.",
    images: [
      "/porfolio/music/music1.webp",
      "/porfolio/music/music2.webp",
      "/porfolio/music/music3.webp",
      "/porfolio/music/music4.webp",
      "/porfolio/music/music5.webp",
      "/porfolio/music/music6.webp",
      "/porfolio/music/music7.webp",
      "/porfolio/music/music8.webp",
      "/porfolio/music/music9.webp",
      "/porfolio/music/music10.webp",
      "/porfolio/music/music11.webp",
      "/porfolio/music/music12.webp",
      "/porfolio/music/music13.webp",
      "/porfolio/music/music14.webp",
    ],
  },

  {
    id: "banners",
    label: "Banners & Rollups",
    icon: "⊞",
    accent: "#10b981",
    description:
      "Pull-up banners, outdoor signage, flex prints, and large-format display graphics.",
    images: [
      "/porfolio/banners/banner1.webp",
      "/porfolio/banners/banner2.webp",
      "/porfolio/banners/banner3.webp",
      "/porfolio/banners/banner4.webp",
      "/porfolio/banners/banner5.webp",
      "/porfolio/banners/banner6.webp",
      "/porfolio/banners/banner7.webp",
      "/porfolio/banners/banner8.webp",
    ],
  },

  {
    id: "wedding",
    label: "Wedding Flyers",
    icon: "❖",
    accent: "#f59e0b",
    description:
      "Elegant wedding invitations, save-the-date designs, and ceremony branding materials.",
    images: [
      "/porfolio/wedding/wedding1.webp",
      "/porfolio/wedding/wedding2.webp",
      "/porfolio/wedding/wedding3.webp",
      "/porfolio/wedding/wedding4.webp",
      "/porfolio/wedding/wedding5.webp",
      "/porfolio/wedding/wedding6.webp",
      "/porfolio/wedding/wedding7.webp",
      "/porfolio/wedding/wedding8.webp",
    ],
  },

  {
    id: "logos",
    label: "Logo Designs & Mockups",
    icon: "◆",
    accent: "#f59e0b",
    description:
      "Creative logo design concepts and professional mockups showcasing brand identity across real-world applications.",
    images: [
      "/porfolio/logos/logo1.webp",
      "/porfolio/logos/logo2.webp",
      "/porfolio/logos/logo3.webp",
      "/porfolio/logos/logo4.webp",
      "/porfolio/logos/logo5.webp",
      "/porfolio/logos/logo6.webp",
      "/porfolio/logos/logo7.webp",
      "/porfolio/logos/logo8.webp",
      "/porfolio/logos/logo9.webp",
      "/porfolio/logos/logo10.webp",
      "/porfolio/logos/logo11.webp",
      "/porfolio/logos/logo12.webp",
      "/porfolio/logos/logo13.webp",
      "/porfolio/logos/logo14.webp",
      "/porfolio/logos/logo15.webp",
    ],
  },

  {
    id: "bookcovers",
    label: "Book Cover Designs",
    icon: "📘",
    accent: "#8b5cf6",
    description:
      "Creative and professional book cover designs for novels, magazines,and educational publications.",
    images: [
      "/porfolio/bookcovers/bookcover1.webp",
      "/porfolio/bookcovers/bookcover2.webp",
      "/porfolio/bookcovers/bookcover3.webp",
      "/porfolio/bookcovers/bookcover4.webp",
    ],
  },
];

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
  isDark,
}: {
  images: string[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  isDark: boolean;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(10px)" }}
      onClick={onClose}
    >
      {/* Image */}
      <motion.div
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.88, opacity: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 26 }}
        className="relative rounded-2xl overflow-hidden"
        style={{
          maxWidth: "min(800px,90vw)",
          maxHeight: "80vh",
          width: "100%",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[index]}
          alt={`Preview ${index + 1}`}
          className="w-full h-full object-cover"
          style={{ maxHeight: "80vh", display: "block" }}
          onError={(e) => {
            e.currentTarget.style.opacity = "0.3";
          }}
        />
        {/* Gradient overlay bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{
            background: "linear-gradient(to top,rgba(0,0,0,0.6),transparent)",
          }}
        />
        {/* Counter */}
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-semibold tracking-widest"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          {index + 1} / {images.length}
        </div>
      </motion.div>

      {/* Prev */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 md:left-8 w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-200 hover:bg-white/10"
        style={{ borderColor: "rgba(255,255,255,0.2)", color: "#fff" }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M11 4L6 9l5 5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Next */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 md:right-8 w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-200 hover:bg-white/10"
        style={{ borderColor: "rgba(255,255,255,0.2)", color: "#fff" }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M7 4l5 5-5 5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200 hover:bg-white/10"
        style={{ borderColor: "rgba(255,255,255,0.2)", color: "#fff" }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M2 2l12 12M14 2L2 14"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </motion.div>
  );
}

// ── Single category section ───────────────────────────────────────────────────
function CategorySection({
  cat,
  isDark,
  onImageClick,
}: {
  cat: (typeof categories)[0];
  isDark: boolean;
  onImageClick: (images: string[], index: number) => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? cat.images : cat.images.slice(0, 6);
  const bg = isDark ? "#0d0f1e" : "#ffffff";
  const textMain = isDark ? "#f9fafb" : "#0f172a";
  const textMuted = isDark ? "#6b7280" : "#64748b";

  return (
    <motion.section
      ref={ref}
      id={cat.id}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mb-20"
    >
      {/* Section header */}
      <div className="flex items-start justify-between gap-4 mb-8 flex-wrap">
        <div className="flex items-center gap-4">
          {/* Icon badge */}
          <div
            className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-light"
            style={{
              background: `${cat.accent}18`,
              border: `1.5px solid ${cat.accent}33`,
              color: cat.accent,
            }}
          >
            {cat.icon}
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(1.3rem,2.5vw,1.8rem)",
                  fontWeight: 800,
                  color: textMain,
                  lineHeight: 1.2,
                }}
              >
                {cat.label}
              </h2>
              <span
                className="text-xs font-bold px-2.5 py-1 rounded-full"
                style={{ background: `${cat.accent}15`, color: cat.accent }}
              >
                {cat.images.length}
              </span>
            </div>
            <p
              className="text-xs leading-relaxed max-w-md hidden sm:block"
              style={{ color: textMuted }}
            >
              {cat.description}
            </p>
          </div>
        </div>

        {/* Accent line */}
        <div className="flex-1 hidden md:block">
          <div
            className="h-px mt-6"
            style={{
              background: `linear-gradient(90deg, ${cat.accent}40, transparent)`,
            }}
          />
        </div>
      </div>

      {/* Description (mobile) */}
      <p
        className="text-xs leading-relaxed mb-6 sm:hidden"
        style={{ color: textMuted }}
      >
        {cat.description}
      </p>

      {/* Image grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        <AnimatePresence>
          {visible.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              whileHover={{ y: -4, scale: 1.02 }}
              onClick={() => onImageClick(cat.images, i)}
              className="group relative rounded-xl overflow-hidden cursor-zoom-in"
              style={{
                aspectRatio: "3/4",
                background: isDark ? "#131629" : "#f1f5f9",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(59,130,246,0.1)"}`,
                boxShadow: isDark
                  ? "0 4px 16px rgba(0,0,0,0.4)"
                  : "0 4px 16px rgba(59,130,246,0.08)",
              }}
            >
              <img
                src={src}
                alt={`${cat.label} ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                onError={(e) => {
                  const t = e.currentTarget;
                  t.style.display = "none";
                  const parent = t.parentElement;
                  if (parent && !parent.querySelector(".img-placeholder")) {
                    const ph = document.createElement("div");
                    ph.className =
                      "img-placeholder absolute inset-0 flex flex-col items-center justify-center gap-2";
                    ph.innerHTML = `
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" style="color:#4b5563;opacity:0.5">
                        <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                        <polyline points="21 15 16 10 5 21"/>
                      </svg>
                      <span style="font-size:10px;color:#6b7280;letter-spacing:0.08em;text-align:center;padding:0 8px;line-height:1.4">Add image to<br/>public${src}</span>`;
                    parent.appendChild(ph);
                  }
                }}
              />
              {/* Hover overlay */}
              <div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                style={{
                  background: `linear-gradient(160deg,${cat.accent}55,rgba(0,0,0,0.65))`,
                }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.3)",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                </div>
              </div>

              {/* Bottom accent */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"
                style={{ background: cat.accent }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Show more / less */}
      {cat.images.length > 6 && (
        <div className="flex justify-center mt-6">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowAll((s) => !s)}
            className="flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest border transition-all duration-300"
            style={{
              borderColor: `${cat.accent}50`,
              color: cat.accent,
              background: `${cat.accent}08`,
            }}
          >
            {showAll ? "Show Less" : `View All ${cat.images.length}`}
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              className="transition-transform duration-300"
              style={{ transform: showAll ? "rotate(180deg)" : "none" }}
            >
              <path
                d="M2 4l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        </div>
      )}
    </motion.section>
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
  const inView = useInView(ref, { once: true, margin: "-50px" });
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
export default function PortfolioPage() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightbox, setLightbox] = useState<{
    images: string[];
    index: number;
  } | null>(null);

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

  const openLightbox = useCallback((images: string[], index: number) => {
    setLightbox({ images, index });
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox(null);
    document.body.style.overflow = "";
  }, []);

  const prevImage = useCallback(() => {
    if (!lightbox) return;
    setLightbox((l) =>
      l
        ? { ...l, index: (l.index - 1 + l.images.length) % l.images.length }
        : null,
    );
  }, [lightbox]);

  const nextImage = useCallback(() => {
    if (!lightbox) return;
    setLightbox((l) =>
      l ? { ...l, index: (l.index + 1) % l.images.length } : null,
    );
  }, [lightbox]);

  const visibleCats =
    activeFilter === "all"
      ? categories
      : categories.filter((c) => c.id === activeFilter);

  const totalProjects = categories.reduce((s, c) => s + c.images.length, 0);

  return (
    <div
      id="portfolio"
      style={{
        background: bg,
        color: textMain,
        fontFamily: "'DM Sans','Helvetica Neue',sans-serif",
        minHeight: "100vh",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:${bg}}
        ::-webkit-scrollbar-thumb{background:#3b82f633;border-radius:2px}
        .filter-scroll::-webkit-scrollbar{display:none}
        .filter-scroll{-ms-overflow-style:none;scrollbar-width:none}
      `}</style>

      {/* ── HERO ── */}
      <section className="pt-32 pb-14 px-6 md:px-14 max-w-6xl mx-auto">
        <FadeUp>
          <p className="text-xs font-bold tracking-[0.32em] uppercase text-blue-500 mb-4">
            Portfolio
          </p>
        </FadeUp>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <FadeUp delay={0.08}>
            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(2.4rem,5.5vw,4rem)",
                fontWeight: 900,
                lineHeight: 1.08,
                color: textMain,
                maxWidth: 560,
              }}
            >
              A Catalogue of{" "}
              <span
                style={{
                  backgroundImage: "linear-gradient(135deg,#3b82f6,#818cf8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Creative Work
              </span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.16}>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p
                  style={{
                    fontFamily: "'Playfair Display',Georgia,serif",
                    fontSize: "2rem",
                    fontWeight: 900,
                    color: textMain,
                    lineHeight: 1,
                  }}
                >
                  {totalProjects}+
                </p>
                <p
                  className="text-xs font-semibold tracking-widest uppercase mt-1"
                  style={{ color: textFaint }}
                >
                  Projects
                </p>
              </div>
              <div className="w-px h-10" style={{ background: borderCol }} />
              <div className="text-center">
                <p
                  style={{
                    fontFamily: "'Playfair Display',Georgia,serif",
                    fontSize: "2rem",
                    fontWeight: 900,
                    color: textMain,
                    lineHeight: 1,
                  }}
                >
                  {categories.length}
                </p>
                <p
                  className="text-xs font-semibold tracking-widest uppercase mt-1"
                  style={{ color: textFaint }}
                >
                  Categories
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
        <FadeUp delay={0.22}>
          <p
            className="mt-5 text-sm leading-8 max-w-xl"
            style={{ color: textBody }}
          >
            Browse through years of creative work spanning branding, print,
            digital, and event design — each project crafted with clarity,
            precision, and purpose.
          </p>
        </FadeUp>
      </section>

      {/* ── STICKY FILTER BAR ── */}
      <div
        className="sticky top-20 z-30 px-6 md:px-14 py-3 mb-4"
        style={{
          background: isDark ? "rgba(8,10,23,0.85)" : "rgba(241,245,249,0.9)",
          backdropFilter: "blur(16px)",
          borderBottom: `1px solid ${borderCol}`,
        }}
      >
        <div className="filter-scroll flex items-center gap-2 overflow-x-auto max-w-6xl mx-auto">
          {/* All */}
          <button
            onClick={() => setActiveFilter("all")}
            className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-200"
            style={{
              background: activeFilter === "all" ? "#3b82f6" : "transparent",
              borderColor:
                activeFilter === "all"
                  ? "#3b82f6"
                  : isDark
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(59,130,246,0.2)",
              color: activeFilter === "all" ? "#fff" : textFaint,
            }}
          >
            All
            <span className="text-[10px] opacity-70">{totalProjects}</span>
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveFilter(cat.id);
                document
                  .getElementById(cat.id)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-200"
              style={{
                background:
                  activeFilter === cat.id ? cat.accent : "transparent",
                borderColor:
                  activeFilter === cat.id
                    ? cat.accent
                    : isDark
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(59,130,246,0.15)",
                color: activeFilter === cat.id ? "#fff" : textFaint,
              }}
            >
              <span style={{ fontSize: 10 }}>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── CATEGORY SECTIONS ── */}
      <section className="px-6 md:px-14 max-w-6xl mx-auto pt-8">
        <AnimatePresence mode="wait">
          {visibleCats.map((cat) => (
            <CategorySection
              key={cat.id}
              cat={cat}
              isDark={isDark}
              onImageClick={openLightbox}
            />
          ))}
        </AnimatePresence>
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
              Work With Me
            </p>
            <h2
              className="relative text-3xl md:text-4xl font-black mb-4 leading-tight"
              style={{
                fontFamily: "'Playfair Display',Georgia,serif",
                color: textMain,
              }}
            >
              Like what you see?{" "}
              <span className="text-blue-500">Let's collaborate.</span>
            </h2>
            <p
              className="relative text-sm leading-7 mb-8 max-w-lg mx-auto"
              style={{ color: textBody }}
            >
              Every design here started with a conversation. Yours could be
              next.
            </p>
            <motion.a
              href="https://wa.me/237676665670"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest"
              style={{
                background: "#3b82f6",
                color: "#fff",
                boxShadow: "0 0 30px rgba(59,130,246,0.35)",
                textDecoration: "none",
                letterSpacing: "0.16em",
              }}
            >
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

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox
            images={lightbox.images}
            index={lightbox.index}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
            isDark={isDark}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
