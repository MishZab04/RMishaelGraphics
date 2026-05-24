"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

function SunIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

export default function Navbar() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.href.substring(1));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0),
          );

        if (visible.length) {
          setActive(`#${visible[0].target.id}`);
        }
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0.1, 0.25, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const effectiveTheme = theme === "system" ? resolvedTheme : theme;
  const isDark = mounted ? effectiveTheme === "dark" : false;

  const bg = isDark ? "bg-[#0d0f1e]" : "bg-white";

  const border = isDark
    ? "border-b border-white/5"
    : "border-b border-gray-200";

  const textMuted = isDark ? "text-gray-400" : "text-gray-500";

  const textActive = isDark ? "text-white" : "text-gray-900";

  const textHover = isDark ? "hover:text-white" : "hover:text-gray-900";

  const toggleBg = isDark
    ? "bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white"
    : "bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900";

  const mobileBg = isDark ? "bg-[#0d0f1e]" : "bg-white";

  const mobileText = isDark
    ? "text-gray-500 hover:text-white"
    : "text-gray-400 hover:text-gray-900";

  const mobileActive = isDark ? "text-white" : "text-gray-900";

  const hamburgerColor = isDark ? "bg-gray-300" : "bg-gray-800";

  const footerText = isDark ? "text-gray-600" : "text-gray-400";

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-14 h-20 md:h-24 ${bg} ${border} transition-colors duration-300`}
      >
        {/* LOGO */}
        <div className="flex items-center flex-shrink-0">
          <img
            src={isDark ? "/blacklogo.webp" : "/blue_logo.webp"}
            alt="Logo"
            className={`h-48 md:h-56 lg:h-64 w-auto object-contain transition-all duration-300 hover:scale-105 hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.8)] ${
              !isDark ? "brightness-0" : ""
            }`}
          />
        </div>

        {/* DESKTOP NAV */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={(event) => {
                  event.preventDefault();
                  const target = document.getElementById(href.substring(1));
                  target?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                  setActive(href);
                }}
                className={`relative text-sm tracking-wide transition-colors duration-200 pb-1 group ${
                  active === href
                    ? `${textActive} font-semibold`
                    : `${textMuted} ${textHover}`
                }`}
              >
                {label}

                <span
                  className={`absolute bottom-[-3px] left-0 right-0 h-[2px] rounded-full transition-all duration-300 ${
                    active === href
                      ? "bg-blue-500 opacity-100 scale-x-100"
                      : "bg-blue-500 opacity-0 scale-x-0 group-hover:opacity-40 group-hover:scale-x-100"
                  }`}
                  style={{ transformOrigin: "left" }}
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* RIGHT CONTROLS */}
        <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
          {/* THEME TOGGLE */}
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 ${toggleBg}`}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* HAMBURGER */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col items-center justify-center w-10 h-10 gap-1.5"
          >
            <span
              className={`block h-px w-6 transition-all ${hamburgerColor} ${
                open ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />

            <span
              className={`block h-px transition-all ${hamburgerColor} ${
                open ? "w-0 opacity-0" : "w-4"
              }`}
            />

            <span
              className={`block h-px w-6 transition-all ${hamburgerColor} ${
                open ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-40 ${mobileBg} flex flex-col justify-center items-start px-10 transition-all duration-500 md:hidden ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col gap-8 w-full">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={(event) => {
                  event.preventDefault();
                  const target = document.getElementById(href.substring(1));
                  target?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                  setActive(href);
                  setOpen(false);
                }}
                className={`text-4xl transition-colors ${
                  active === href ? mobileActive : mobileText
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div
          className={`mt-16 text-xs ${footerText} uppercase tracking-widest`}
        >
          © 2026 Mishael Graphics - All rights reserved.
        </div>
      </div>
    </>
  );
}
