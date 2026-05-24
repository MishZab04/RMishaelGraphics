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

const normalizeToWebp = (src: string) =>
  src.replace(/\.(jpe?g|png)$/i, ".webp");

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
      // ↓ Add your church design images here
      "/portfolio/church/church1.png",
      "/portfolio/church/church2.png",
      "/portfolio/church/church3.jpg",
      "/portfolio/church/church4.jpg",
      "/portfolio/church/church5.jpg",
      "/portfolio/church/church6.jpg",
      "/portfolio/church/church7.jpg",
      "/portfolio/church/church8.jpg",
      "/portfolio/church/church9.jpg",
      "/portfolio/church/church10.jpg",
      "/portfolio/church/church11.jpg",
      "/portfolio/church/church12.jpg",
      "/portfolio/church/church13.jpg",
      "/portfolio/church/church14.png",
      "/portfolio/church/church15.jpg",
      "/portfolio/church/church16.jpg",
      "/portfolio/church/church17.jpg",
      "/portfolio/church/church18.jpg",
      "/portfolio/church/church19.jpg",
      "/portfolio/church/church20.jpg",
      "/portfolio/church/church21.jpg",
      "/portfolio/church/church22.jpg",
      "/portfolio/church/church23.jpg",
      "/portfolio/church/church24.jpg",
      "/portfolio/church/church25.jpg",
      "/portfolio/church/church26.jpg",
      "/portfolio/church/church27.png",
      "/portfolio/church/church28.png",
      // continue adding: "/portfolio/church/church7.jpg", ...
    ],
  },
  {
    id: "portraits",
    label: "Portraits & Enlargements",
    icon: "◈",
    accent: "#f59e0b",
    description: "High-quality portrait and photo enlargements.",
    images: [
      // ↓ Add your portrait images here
      "/portfolio/portrait/potrait1.jpg",
      "/portfolio/portrait/potrait2.jpg",
      "/portfolio/portrait/potrait3.jpg",
      "/portfolio/portrait/potrait4.jpeg",
      "/portfolio/portrait/potrait5.jpg",
      "/portfolio/portrait/potrait6.jpg",
      "/portfolio/portrait/potrait7.jpg",
      "/portfolio/portrait/potrait8.jpg",
      "/portfolio/portrait/potrait9.jpg",
      "/portfolio/portrait/potrait10.jpg",
      "/portfolio/portrait/potrait11.jpeg",
      "/portfolio/portrait/potrait12.jpeg",
      "/portfolio/portrait/potrait13.jpg",
      "/portfolio/portrait/potrait14.jpg",
      "/portfolio/portrait/potrait15.jpg",
      "/portfolio/portrait/potrait16.jpg",
      "/portfolio/portrait/potrait17.jpg",
      "/portfolio/portrait/potrait18.jpg",
      "/portfolio/portrait/potrait19.jpg",
      "/portfolio/portrait/potrait20.jpg",
      "/portfolio/portrait/potrait21.jpg",
      "/portfolio/portrait/potrait22.jpg",
      "/portfolio/portrait/potrait23.jpg",
      "/portfolio/portrait/potrait24.jpg",
      "/portfolio/portrait/potrait25.jpg",
      "/portfolio/portrait/potrait26.jpg",
      "/portfolio/portrait/potrait27.jpg",
      "/portfolio/portrait/potrait28.jpeg",
      "/portfolio/portrait/potrait29.jpeg",
      "/portfolio/portrait/potrait30.jpg",
      "/portfolio/portrait/potrait31.jpg",
      "/portfolio/portrait/potrait32.jpg",
      "/portfolio/portrait/potrait33.jpg",
      "/portfolio/portrait/potrait34.jpg",
      "/portfolio/portrait/potrait35.jpg",
      "/portfolio/portrait/potrait36.jpg",
      "/portfolio/portrait/potrait37.jpg",
      "/portfolio/portrait/potrait38.jpg",
      "/portfolio/portrait/potrait39.jpg",
      "/portfolio/portrait/potrait40.jpg",
      "/portfolio/portrait/potrait41.jpg",
      "/portfolio/portrait/potrait42.jpg",
      "/portfolio/portrait/potrait44.jpg",
      "/portfolio/portrait/potrait45.jpg",
      "/portfolio/portrait/potrait46.jpg",
      "/portfolio/portrait/potrait47.jpg",
      "/portfolio/portrait/potrait48.jpg",
      "/portfolio/portrait/potrait49.jpg",
      "/portfolio/portrait/potrait50.jpg",
      "/portfolio/portrait/potrait51.jpg",
      "/portfolio/portrait/potrait52.jpg",
      "/portfolio/portrait/potrait53.jpg",
      "/portfolio/portrait/potrait54.jpg",
      "/portfolio/portrait/potrait55.jpg",
      "/portfolio/portrait/potrait56.jpg",
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
      // ↓ Add your business flyer images here
      "/portfolio/business/business1.jpg",
      "/portfolio/business/business2.jpg",
      "/portfolio/business/business3.jpg",
      "/portfolio/business/business4.jpg",
      "/portfolio/business/business5.jpg",
      "/portfolio/business/business6.jpg",
      "/portfolio/business/business7.jpg",
      "/portfolio/business/business8.jpg",
      "/portfolio/business/business9.jpg",
      "/portfolio/business/business10.jpg",
      "/portfolio/business/business11.jpg",
      "/portfolio/business/business12.jpg",
      "/portfolio/business/business13.png",
      "/portfolio/business/business14.jpg",
      "/portfolio/business/business15.jpg",
      "/portfolio/business/business16.jpg",
      "/portfolio/business/business17.jpg",
      "/portfolio/business/business18.png",
      "/portfolio/business/business19.jpg",
      "/portfolio/business/business20.png",
      "/portfolio/business/business21.jpeg",
      "/portfolio/business/business22.jpg",
      "/portfolio/business/business23.jpg",
      "/portfolio/business/business24.jpg",
      "/portfolio/business/business25.jpg",
      "/portfolio/business/business26.jpg",
      "/portfolio/business/business27.jpg",
      "/portfolio/business/business28.jpg",
      "/portfolio/business/business29.jpg",
      "/portfolio/business/business30.jpg",
      "/portfolio/business/business31.jpg",
      "/portfolio/business/business32.jpg",
      "/portfolio/business/business33.jpg",
      "/portfolio/business/business34.jpg",
      "/portfolio/business/business35.jpg",
      "/portfolio/business/business36.jpg",
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
      // ↓ Add your birthday flyer images here
      "/portfolio/birthday/birthday1.png",
      "/portfolio/birthday/birthday2.jpg",
      "/portfolio/birthday/birthday3.jpg",
      "/portfolio/birthday/birthday4.jpg",
      "/portfolio/birthday/birthday5.jpg",
      "/portfolio/birthday/birthday6.jpg",
      "/portfolio/birthday/birthday7.jpg",
      "/portfolio/birthday/birthday8.jpg",
      "/portfolio/birthday/birthday9.jpg",
      "/portfolio/birthday/birthday10.jpg",
      "/portfolio/birthday/birthday11.jpg",
      "/portfolio/birthday/birthday12.jpg",
      "/portfolio/birthday/birthday13.png",
      "/portfolio/birthday/birthday14.jpg",
      "/portfolio/birthday/birthday15.jpg",
      "/portfolio/birthday/birthday16.jpg",
      "/portfolio/birthday/birthday17.jpg",
      "/portfolio/birthday/birthday18.jpg",
      "/portfolio/birthday/birthday19.jpg",
      "/portfolio/birthday/birthday20.jpg",
      "/portfolio/birthday/birthday21.jpg",
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
      // ↓ Add your funeral design images here
      "/portfolio/funeral/funeral1.jpg",
      "/portfolio/funeral/funeral2.jpg",
      "/portfolio/funeral/funeral3.png",
      "/portfolio/funeral/funeral4.jpg",
      "/portfolio/funeral/funeral5.jpg",
      "/portfolio/funeral/funeral6.jpg",
      "/portfolio/funeral/funeral7.jpg",
      "/portfolio/funeral/funeral8.png",
      "/portfolio/funeral/funeral9.jpg",
      "/portfolio/funeral/funeral10.jpg",
      "/portfolio/funeral/funeral11.jpg",
      "/portfolio/funeral/funeral12.jpg",
      "/portfolio/funeral/funeral13.jpg",
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
      // ↓ Add your social media design images here
      "/portfolio/social/social1.jpg",
      "/portfolio/social/social2.jpg",
      "/portfolio/social/social3.jpg",
      "/portfolio/social/social4.jpg",
      "/portfolio/social/social5.jpg",
      "/portfolio/social/social6.png",
      "/portfolio/social/social7.png",
      "/portfolio/social/social8.png",
      "/portfolio/social/social9.jpg",
      "/portfolio/social/social10.png",
      "/portfolio/social/social11.png",
      "/portfolio/social/social12.jpg",
      "/portfolio/social/social13.jpg",
      "/portfolio/social/social14.jpg",
      "/portfolio/social/social15.png",
      "/portfolio/social/social16.png",
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
      // ↓ Add your event branding images here
      "/portfolio/events/event1.jpg",
      "/portfolio/events/event2.png",
      "/portfolio/events/event3.png",
      "/portfolio/events/event4.png",
      "/portfolio/events/event5.png",
      "/portfolio/events/event6.png",
      "/portfolio/events/event7.png",
      "/portfolio/events/event8.png",
      "/portfolio/events/event9.jpg",
      "/portfolio/events/event10.jpg",
      "/portfolio/events/event11.jpg",
      "/portfolio/events/event12.jpg",
      "/portfolio/events/event13.png",
      "/portfolio/events/event14.jpg",
      "/portfolio/events/event15.png",
      "/portfolio/events/event16.png",
      "/portfolio/events/event17.png",
      "/portfolio/events/event18.jpg",
      "/portfolio/events/event19.jpg",
      "/portfolio/events/event20.jpg",
      "/portfolio/events/event21.png",
      "/portfolio/events/event22.png",
      "/portfolio/events/event23.jpg",
      "/portfolio/events/event24.png",
      "/portfolio/events/event25.png",
      "/portfolio/events/event26.jpg",
      "/portfolio/events/event27.jpg",
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
      // ↓ Add your music cover art images here
      "/portfolio/music/music1.jpg",
      "/portfolio/music/music2.jpg",
      "/portfolio/music/music3.jpg",
      "/portfolio/music/music4.jpg",
      "/portfolio/music/music5.png",
      "/portfolio/music/music6.jpg",
      "/portfolio/music/music7.jpg",
      "/portfolio/music/music8.jpg",
      "/portfolio/music/music9.jpg",
      "/portfolio/music/music10.jpg",
      "/portfolio/music/music11.jpg",
      "/portfolio/music/music12.jpg",
      "/portfolio/music/music13.jpg",
      "/portfolio/music/music14.jpg",
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
      // ↓ Add your banner & rollup images here
      "/portfolio/banners/banner1.png",
      "/portfolio/banners/banner2.png",
      "/portfolio/banners/banner3.jpg",
      "/portfolio/banners/banner4.jpg",
      "/portfolio/banners/banner5.jpg",
      "/portfolio/banners/banner6.jpg",
      "/portfolio/banners/banner7.jpg",
      "/portfolio/banners/banner8.jpg",
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
      "/portfolio/wedding/wedding1.jpg",
      "/portfolio/wedding/wedding2.jpg",
      "/portfolio/wedding/wedding3.jpg",
      "/portfolio/wedding/wedding4.jpg",
      "/portfolio/wedding/wedding5.jpg",
      "/portfolio/wedding/wedding6.jpg",
      "/portfolio/wedding/wedding7.jpg",
      "/portfolio/wedding/wedding8.jpg",
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
      // ↓ Add your logo design & mockup images here
      "/portfolio/logos/logo1.jpg",
      "/portfolio/logos/logo2.jpg",
      "/portfolio/logos/logo3.png",
      "/portfolio/logos/logo4.jpg",
      "/portfolio/logos/logo5.jpg",
      "/portfolio/logos/logo6.jpg",
      "/portfolio/logos/logo7.jpg",
      "/portfolio/logos/logo8.jpg",
      "/portfolio/logos/logo9.jpg",
      "/portfolio/logos/logo10.jpg",
      "/portfolio/logos/logo11.jpg",
      "/portfolio/logos/logo12.jpg",
      "/portfolio/logos/logo13.jpg",
      "/portfolio/logos/logo14.jpg",
      "/portfolio/logos/logo15.jpg",
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
      "/portfolio/bookcovers/bookcover1.jpg",
      "/portfolio/bookcovers/bookcover2.jpg",
      "/portfolio/bookcovers/bookcover3.jpg",
      "/portfolio/bookcovers/bookcover4.jpg",
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

  const normalizedImages = cat.images.map(normalizeToWebp);
  const visible = showAll ? normalizedImages : normalizedImages.slice(0, 6);
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
              onClick={() => onImageClick(normalizedImages, i)}
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
