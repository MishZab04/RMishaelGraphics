"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";

export default function Home() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const isDark = mounted ? currentTheme === "dark" : false;

  const roles = [
    "Graphic Designer",
    "Software Developer",
    "Software Engineer",
    "Portrait Artist",
    "UI/UX Designer",
    "Web Developer",
  ];

  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(120);

  const currentRole = roles[roleIndex];

  useEffect(() => {
    const handleTyping = () => {
      if (!isDeleting) {
        setText(currentRole.substring(0, text.length + 1));

        if (text.length + 1 === currentRole.length) {
          setIsDeleting(true);
          setSpeed(80);
        }
      } else {
        setText(currentRole.substring(0, text.length - 1));

        if (text.length === 0) {
          setIsDeleting(false);
          setSpeed(120);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, currentRole, speed]);

  return (
    <main
      className={`min-h-screen overflow-x-hidden transition-colors duration-500 ${
        isDark ? "bg-[#050018] text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* ── HERO SECTION ── */}
      <section
        id="home"
        className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-between gap-16 px-6 py-20 lg:flex-row"
      >
        {/* LEFT SIDE */}
        <div className="flex-1">
          <h1 className="leading-none tracking-tight">

            {/* "I am" — theme-aware */}
            <span
              className={`block text-2xl md:text-3xl font-inter ${
                isDark ? "text-white" : "text-gray-800"
              }`}
            >
              I am
            </span>

            {/* Name — Great Vibes curly font */}
            <span
              className="font-great-vibes block mt-2 text-[#6C63FF]"
              style={{ fontSize: "clamp(3.5rem, 9vw, 7rem)", lineHeight: 1.15 }}
            >
              Mishael Zabud
            </span>

            {/* Typing roles — theme-aware */}
            <span
              className={`block mt-6 text-base md:text-lg font-inter ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {text}
              <span className="animate-pulse">|</span>
            </span>

          </h1>

          {/* Description — theme-aware */}
          <p
            className={`mt-10 max-w-xl text-lg leading-8 md:text-xl ${
              isDark ? "text-gray-400" : "text-gray-700"
            }`}
          >
            Creative Graphic designer specializing in branding, flyers, posters,
            picture frames, social media content, and visual identity.
          </p>

          {/* BUTTONS */}
          <div className="mt-12 flex flex-wrap items-center gap-6">

            {/* ✅ FIX: anchor link to #portfolio section, not /portfolio page */}
            <Link
              href="#portfolio"
              className="rounded-full bg-[#6C63FF] px-8 py-4 text-lg font-medium text-white transition duration-300 hover:scale-105 hover:bg-[#7d75ff]"
            >
              View My Portfolio →
            </Link>

            {/* Contact Me — opens WhatsApp */}
            <a
              href="https://wa.me/237676665670"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-lg font-medium underline underline-offset-4 transition ${
                isDark
                  ? "text-white hover:text-[#6C63FF]"
                  : "text-gray-800 hover:text-[#6C63FF]"
              }`}
            >
              Contact Me
            </a>

          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="group relative flex-1">

          <div className="absolute inset-0 rounded-3xl bg-[#6C63FF]/30 blur-[120px] transition duration-500 group-hover:bg-[#6C63FF]/50" />

          <div
            className={`relative overflow-hidden rounded-3xl border shadow-2xl transition duration-500 group-hover:-translate-y-4 group-hover:scale-[1.03] group-hover:shadow-[0_0_60px_rgba(108,99,255,0.6)] ${
              isDark
                ? "border-white/10 bg-black/30"
                : "border-gray-200 bg-white"
            }`}
          >
            <Image
              src="/reeward.webp"
              alt="Mishael Zabud"
              width={600}
              height={750}
              className="h-auto w-full object-cover transition duration-700 group-hover:scale-110"
              priority
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 w-full p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-gray-300 font-inter">
                Creative Graphic Designer
              </p>
              <h3 className="mt-2 text-3xl font-semibold text-white">
                Mishael L&apos;incroyable
              </h3>
            </div>

          </div>
        </div>

      </section>

      {/* ── ALL SECTIONS (single page) ── */}
      <About />
      <Portfolio />
      <Testimonials />
      <Contact />

    </main>
  );
}