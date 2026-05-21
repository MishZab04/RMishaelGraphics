"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "next-themes";

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

// ── Info card ─────────────────────────────────────────────────────────────────
function InfoCard({
  icon,
  label,
  value,
  href,
  isDark,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  isDark: boolean;
}) {
  const inner = (
    <div
      className="group flex items-start gap-4 p-5 rounded-2xl border transition-all duration-300"
      style={{
        background: isDark ? "#0d0f1e" : "#ffffff",
        borderColor: isDark
          ? "rgba(255,255,255,0.07)"
          : "rgba(59,130,246,0.15)",
        boxShadow: isDark
          ? "0 4px 20px rgba(0,0,0,0.35)"
          : "0 4px 20px rgba(59,130,246,0.07)",
      }}
    >
      <div
        className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300"
        style={{ background: "rgba(59,130,246,0.12)", color: "#3b82f6" }}
      >
        {icon}
      </div>
      <div>
        <p
          className="text-xs font-bold tracking-[0.2em] uppercase mb-1"
          style={{ color: isDark ? "#4b5563" : "#94a3b8" }}
        >
          {label}
        </p>
        <p
          className="text-sm font-semibold"
          style={{ color: isDark ? "#e2e8f0" : "#0f172a" }}
        >
          {value}
        </p>
      </div>
      {/* hover bar */}
      <div className="ml-auto self-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-blue-500">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M1 7h10M8 3l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );

  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block no-underline"
      style={{ textDecoration: "none" }}
    >
      {inner}
    </a>
  ) : (
    <div>{inner}</div>
  );
}

// ── Field wrapper ─────────────────────────────────────────────────────────────
function Field({
  label,
  isDark,
  children,
}: {
  label: string;
  isDark: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        className="text-xs font-bold tracking-[0.2em] uppercase"
        style={{ color: isDark ? "#6b7280" : "#64748b" }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle = (
  isDark: boolean,
  focused: boolean,
): React.CSSProperties => ({
  width: "100%",
  padding: "13px 16px",
  borderRadius: 12,
  border: `1.5px solid ${focused ? "#3b82f6" : isDark ? "rgba(255,255,255,0.08)" : "rgba(59,130,246,0.2)"}`,
  background: isDark
    ? focused
      ? "#0f1224"
      : "#080a17"
    : focused
      ? "#f8faff"
      : "#f1f5f9",
  color: isDark ? "#f1f5f9" : "#0f172a",
  fontSize: 14,
  fontFamily: "'DM Sans', sans-serif",
  outline: "none",
  transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
  boxShadow: focused ? "0 0 0 3px rgba(59,130,246,0.15)" : "none",
});

const services = [
  "Graphic Design",
  "Branding & Identity",
  "UI/UX Design",
  "Web Development",
  "Picture Frame Design",
  "Other",
];

type FormState = "idle" | "loading" | "success" | "error";

// ── Main ──────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [status, setStatus] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

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

  const set =
    (k: string) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("loading");
    try {
      // Build FormData from controlled state so we don't rely on input name attributes
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phone", form.phone || "");
      formData.append("service", form.service || "");
      formData.append("message", form.message);
      // Web3Forms access key (you provided this value)
      formData.append("access_key", "b7740cae-aa56-4e66-9d36-73f69f7b55ac");

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", service: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div
      id="contact"
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
        select option { background: ${isDark ? "#0d0f1e" : "#fff"}; color: ${isDark ? "#f1f5f9" : "#0f172a"}; }
      `}</style>

      {/* ── HERO ── */}
      <section className="pt-32 pb-12 px-6 md:px-14 max-w-5xl mx-auto">
        <FadeUp>
          <p className="text-xs font-bold tracking-[0.32em] uppercase text-blue-500 mb-4">
            Contact
          </p>
        </FadeUp>
        <FadeUp delay={0.08}>
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2.4rem, 5.5vw, 4rem)",
              fontWeight: 900,
              lineHeight: 1.08,
              color: textMain,
            }}
          >
            Let's Build Something{" "}
            <span
              style={{
                backgroundImage: "linear-gradient(135deg,#3b82f6,#818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Great.
            </span>
          </h1>
        </FadeUp>
        <FadeUp delay={0.16}>
          <p
            className="mt-5 text-base leading-8 max-w-xl"
            style={{ color: textBody }}
          >
            Have a project in mind? Fill in the form and I'll get back to you
            within <span className="text-blue-500 font-semibold">24 hours</span>{" "}
            with a tailored response.
          </p>
        </FadeUp>
      </section>

      {/* ── MAIN LAYOUT ── */}
      <section className="pb-28 px-6 md:px-14 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-10 items-start">
          {/* ── LEFT SIDEBAR ── */}
          <FadeUp delay={0.1} className="flex flex-col gap-5">
            {/* Info cards */}
            <InfoCard
              isDark={isDark}
              label="Email"
              value="mishaelzabud04@gmail.com"
              href="mailto:mishaelzabud04@gmail.com"
              icon={
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              }
            />
            <InfoCard
              isDark={isDark}
              label="WhatsApp"
              value="+237 676 665 670"
              href="https://wa.me/237676665670"
              icon={
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              }
            />
            <InfoCard
              isDark={isDark}
              label="Location"
              value="Buea, South West, Cameroon 🇨🇲"
              icon={
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              }
            />
            <InfoCard
              isDark={isDark}
              label="Response Time"
              value="Within 24 hours"
              icon={
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              }
            />

            {/* Quick WhatsApp CTA */}
            <motion.a
              href="https://wa.me/237676665670"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-3 py-4 rounded-2xl font-semibold text-sm uppercase tracking-widest transition-all duration-300"
              style={{
                background: "linear-gradient(135deg,#22c55e,#16a34a)",
                color: "#fff",
                boxShadow: "0 8px 30px rgba(34,197,94,0.3)",
                textDecoration: "none",
                letterSpacing: "0.14em",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </motion.a>
          </FadeUp>

          {/* ── FORM CARD ── */}
          <FadeUp delay={0.2}>
            <div
              className="relative rounded-3xl border p-8 md:p-10 overflow-hidden"
              style={{
                background: surface,
                borderColor: borderCol,
                boxShadow: isDark
                  ? "0 20px 70px rgba(0,0,0,0.45)"
                  : "0 12px 50px rgba(59,130,246,0.09)",
              }}
            >
              {/* Top accent */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
              {/* Corner marks */}
              <div className="absolute top-5 left-5 w-6 h-6 border-t border-l border-blue-500/30 rounded-tl-lg" />
              <div className="absolute bottom-5 right-5 w-6 h-6 border-b border-r border-blue-500/30 rounded-br-lg" />
              {/* Glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 0%,rgba(59,130,246,0.07) 0%,transparent 60%)",
                }}
              />

              <div className="relative">
                <p className="text-xs font-bold tracking-[0.3em] uppercase text-blue-500 mb-2">
                  Start Your Project
                </p>
                <h2
                  style={{
                    fontFamily: "'Playfair Display',Georgia,serif",
                    fontSize: "clamp(1.5rem,2.5vw,2rem)",
                    fontWeight: 900,
                    color: textMain,
                  }}
                  className="mb-8"
                >
                  Tell me about your vision
                </h2>

                {/* ── SUCCESS STATE ── */}
                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-16 gap-5 text-center"
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{
                        background: "rgba(34,197,94,0.15)",
                        border: "1.5px solid rgba(34,197,94,0.4)",
                      }}
                    >
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h3
                      style={{
                        fontFamily: "'Playfair Display',Georgia,serif",
                        fontSize: "1.5rem",
                        fontWeight: 800,
                        color: textMain,
                      }}
                    >
                      Message Sent!
                    </h3>
                    <p className="text-sm max-w-xs" style={{ color: textBody }}>
                      Thanks for reaching out. I'll get back to you within 24
                      hours.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="text-xs text-blue-500 underline underline-offset-4 mt-2"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {/* Row 1: name + email */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field label="Full Name *" isDark={isDark}>
                        <input
                          type="text"
                          required
                          placeholder="Mishael Zabud"
                          value={form.name}
                          onChange={set("name")}
                          onFocus={() => setFocused("name")}
                          onBlur={() => setFocused(null)}
                          style={inputStyle(isDark, focused === "name")}
                        />
                      </Field>
                      <Field label="Email Address *" isDark={isDark}>
                        <input
                          type="email"
                          required
                          placeholder="you@example.com"
                          value={form.email}
                          onChange={set("email")}
                          onFocus={() => setFocused("email")}
                          onBlur={() => setFocused(null)}
                          style={inputStyle(isDark, focused === "email")}
                        />
                      </Field>
                    </div>

                    {/* Row 2: phone + service */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field label="Phone / WhatsApp" isDark={isDark}>
                        <input
                          type="tel"
                          placeholder="+237 6XX XXX XXX"
                          value={form.phone}
                          onChange={set("phone")}
                          onFocus={() => setFocused("phone")}
                          onBlur={() => setFocused(null)}
                          style={inputStyle(isDark, focused === "phone")}
                        />
                      </Field>
                      <Field label="Service Needed" isDark={isDark}>
                        <select
                          value={form.service}
                          onChange={set("service")}
                          onFocus={() => setFocused("service")}
                          onBlur={() => setFocused(null)}
                          style={{
                            ...inputStyle(isDark, focused === "service"),
                            appearance: "none",
                            cursor: "pointer",
                          }}
                        >
                          <option value="">Select a service…</option>
                          {services.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </Field>
                    </div>

                    {/* Row 3: message */}
                    <Field label="Your Message *" isDark={isDark}>
                      <textarea
                        required
                        rows={5}
                        placeholder="Tell me about your project, your goals, timeline, or any other details…"
                        value={form.message}
                        onChange={set("message")}
                        onFocus={() => setFocused("message")}
                        onBlur={() => setFocused(null)}
                        style={{
                          ...inputStyle(isDark, focused === "message"),
                          resize: "vertical",
                          minHeight: 130,
                        }}
                      />
                    </Field>

                    {/* Error banner */}
                    {status === "error" && (
                      <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                        Something went wrong. Please try again or reach out via
                        WhatsApp.
                      </p>
                    )}

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={status === "loading"}
                      whileHover={status !== "loading" ? { scale: 1.02 } : {}}
                      whileTap={status !== "loading" ? { scale: 0.98 } : {}}
                      className="relative flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all duration-300 overflow-hidden"
                      style={{
                        background:
                          status === "loading"
                            ? "rgba(59,130,246,0.5)"
                            : "linear-gradient(135deg,#2563eb,#3b82f6,#6366f1)",
                        color: "#fff",
                        letterSpacing: "0.16em",
                        boxShadow:
                          status === "loading"
                            ? "none"
                            : "0 8px 30px rgba(59,130,246,0.35)",
                        border: "none",
                        cursor:
                          status === "loading" ? "not-allowed" : "pointer",
                      }}
                    >
                      {status === "loading" ? (
                        <>
                          <svg
                            className="animate-spin"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              strokeOpacity="0.25"
                            />
                            <path
                              d="M12 2a10 10 0 0 1 10 10"
                              strokeLinecap="round"
                            />
                          </svg>
                          Sending…
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                          </svg>
                        </>
                      )}
                    </motion.button>

                    <p
                      className="text-center text-xs"
                      style={{ color: textFaint }}
                    >
                      Or chat directly on{" "}
                      <a
                        href="https://wa.me/237676665670"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 font-semibold underline underline-offset-2"
                      >
                        WhatsApp
                      </a>
                    </p>
                  </form>
                )}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
