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
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted
    ? (theme === "system" ? resolvedTheme : theme) === "dark"
    : true;

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
      className={`min-h-screen overflow-x-hidden ${
        isDark ? "bg-[#050018] text-white" : "bg-white text-slate-900"
      }`}
    >
      <section
        id="home"
        className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-between gap-16 px-6 py-20 lg:flex-row"
      >
        <div className="flex-1">
          <h1 className="leading-none tracking-tight">
            <span className="block text-2xl md:text-3xl text-white font-inter">
              I am
            </span>
            <span className="block text-6xl md:text-8xl text-[#6C63FF] mt-2 font-chestta">
              Mishael Zabud
            </span>
            <span className="block mt-6 text-base md:text-lg text-gray-300 font-inter">
              {text}
              <span className="animate-pulse">|</span>
            </span>
          </h1>

          <p className="mt-10 max-w-xl text-lg leading-8 text-gray-400 md:text-xl">
            Creative Graphic designer specializing in branding, flyers, posters,
            picture frames, social media content, and visual identity.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-6">
            <Link
              href="#portfolio"
              className="rounded-full bg-[#6C63FF] px-8 py-4 text-lg font-medium text-white transition duration-300 hover:scale-105 hover:bg-[#7d75ff]"
            >
              View My Portfolio →
            </Link>

            <Link
              href="#contact"
              className="text-lg font-medium text-white underline underline-offset-4 transition hover:text-[#6C63FF]"
            >
              Contact Me
            </Link>
          </div>
        </div>

        <div className="group relative flex-1">
          <div className="absolute inset-0 rounded-3xl bg-[#6C63FF]/30 blur-[120px] transition duration-500 group-hover:bg-[#6C63FF]/50" />
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/30 shadow-2xl transition duration-500 group-hover:-translate-y-4 group-hover:scale-[1.03] group-hover:shadow-[0_0_60px_rgba(108,99,255,0.6)]">
            <Image
              src="/reew.png"
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

      <About />
      <Portfolio />
      <Testimonials />
      <Contact />
    </main>
  );
}
