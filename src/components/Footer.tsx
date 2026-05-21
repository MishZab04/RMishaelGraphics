"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

// ── Nav links – mirrors your Navbar exactly ───────────────────────────────────
const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

// ── Social links ──────────────────────────────────────────────────────────────
const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1JnVS1ud7i/?mibextid=wwXIfr",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/237676665670",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/mishaellincroyable?igsh=MXZiZHJpMjU1Mm9yNA%3D%3D&utm_source=qr",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "Threads",
    href: "https://www.threads.com/@mishaellincroyable",
    icon: (
      <svg viewBox="0 0 192 192" fill="currentColor" className="w-4 h-4">
        <path d="M141.537 88.988a66.667 66.667 0 00-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.724-10.548 21.348-10.548h.229c8.249.053 14.474 2.452 18.503 7.129 2.932 3.405 4.893 8.111 5.864 14.05-7.314-1.243-15.224-1.626-23.68-1.141-23.82 1.372-39.134 15.265-38.105 34.569.522 9.792 5.4 18.216 13.735 23.719 7.047 4.652 16.124 6.927 25.557 6.412 12.458-.683 22.231-5.436 29.049-14.127 5.178-6.6 8.453-15.153 9.899-25.93 5.937 3.583 10.337 8.298 12.767 13.966 4.132 9.635 4.373 25.468-8.546 38.376-11.319 11.308-24.925 16.2-45.488 16.351-22.809-.169-40.06-7.484-51.275-21.742C35.236 139.966 29.808 120.682 29.605 96c.203-24.682 5.63-43.966 16.133-57.317C56.954 24.425 74.204 17.11 97.013 16.94c22.975.17 40.526 7.52 52.171 21.847 5.71 7.026 10.015 15.86 12.853 26.162l16.147-4.308c-3.44-12.68-8.853-23.606-16.219-32.668C147.036 9.607 125.202.195 97.07 0h-.113C68.882.195 47.292 9.642 32.788 28.08 19.882 44.485 13.224 67.315 13.01 96v.04c.214 28.685 6.872 51.515 19.778 67.92 14.504 18.438 36.094 27.884 64.172 28.08h.113c24.986-.172 42.613-6.713 57.032-21.12 18.963-18.946 18.392-42.692 12.142-57.27-4.484-10.454-13.033-18.945-24.71-24.662zM96.237 140.04c-10.426.583-21.24-4.074-21.82-14.146-.436-8.163 5.818-17.25 24.654-18.322 2.158-.124 4.279-.184 6.368-.184 6.27 0 12.138.611 17.512 1.785-1.994 24.93-15.975 30.346-26.714 30.867z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mishael-z-tanga-08b913318?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

// ── Contact icons ─────────────────────────────────────────────────────────────
function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4 shrink-0"
    >
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}
function EmailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4 shrink-0"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}
function LocationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4 shrink-0"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function Footer() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const effectiveTheme = theme === "system" ? resolvedTheme : theme;
  const isDark = mounted ? effectiveTheme === "dark" : true;

  const bg = isDark ? "bg-[#0d0f1e]" : "bg-white";
  const borderTop = isDark
    ? "border-t border-white/5"
    : "border-t border-gray-200";
  const textMuted = isDark ? "text-gray-400" : "text-gray-500";
  const textStrong = isDark ? "text-white" : "text-gray-900";
  const textFaint = isDark ? "text-gray-600" : "text-gray-400";
  const divider = isDark ? "bg-white/5" : "bg-gray-200";
  const socialBase = isDark
    ? "border border-white/10 bg-white/5 text-gray-400 hover:bg-blue-500 hover:border-blue-500 hover:text-white"
    : "border border-gray-200 bg-gray-50 text-gray-500 hover:bg-blue-500 hover:border-blue-500 hover:text-white";
  const contactHover = isDark ? "hover:text-white" : "hover:text-gray-900";
  const accentLine = isDark ? "bg-blue-500" : "bg-blue-500";

  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${bg} ${borderTop} transition-colors duration-300`}>
      <div className="max-w-6xl mx-auto px-6 md:px-14 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-5">
            <Link href="/" className="inline-block">
              <img
                src={isDark ? "/blacklogo.PNG" : "/blue_logo.PNG"}
                alt="Mishael's Graphics"
                className={`h-72 md:h-64 lg:h-80 w-auto object-contain transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_25px_rgba(59,130,246,0.9)] ${
                  !isDark ? "brightness-0" : ""
                }`}
              />
            </Link>

            <p className={`text-sm leading-relaxed max-w-xs ${textMuted}`}>
              Creative design solutions that bring your brand to life — bold
              visuals, purposeful storytelling.
            </p>

            <div className="flex items-center gap-2 pt-1 flex-wrap">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/25 ${socialBase}`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.18em] uppercase text-blue-500 mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`group relative text-sm tracking-wide pb-0.5 transition-colors duration-200 ${textMuted} ${contactHover}`}
                  >
                    {label}
                    <span
                      className={`absolute bottom-[-2px] left-0 right-0 h-[2px] rounded-full ${accentLine} opacity-0 scale-x-0 group-hover:opacity-40 group-hover:scale-x-100 transition-all duration-300`}
                      style={{ transformOrigin: "left" }}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.18em] uppercase text-blue-500 mb-5">
              Get in Touch
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+237676665670"
                  className={`flex items-start gap-3 text-sm ${textMuted} ${contactHover}`}
                >
                  <PhoneIcon />
                  +237 676 665 670
                </a>
              </li>

              <li>
                <a
                  href="mailto:mishaelzabud04@gmail.com"
                  className={`flex items-start gap-3 text-sm ${textMuted} ${contactHover}`}
                >
                  <EmailIcon />
                  mishaelzabud04@gmail.com
                </a>
              </li>

              <li className={`flex items-start gap-3 text-sm ${textMuted}`}>
                <LocationIcon />
                <span>
                  Buea, South West Region,
                  <br />
                  Cameroon
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className={`h-px w-full ${divider} mb-6`} />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className={`text-xs ${textFaint} uppercase tracking-widest`}>
            © {currentYear}{" "}
            <span className={textMuted}>Mishael's Graphics</span> — All Rights
            Reserved.
          </p>
          <p className={`text-xs ${textFaint}`}>
            Done by Mishael's Graphics - Buea, Cameroon 🇨🇲
          </p>
        </div>
      </div>
    </footer>
  );
}
