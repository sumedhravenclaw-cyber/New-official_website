"use client";

import { useState } from "react";
import Link from "next/link";
import { Send, Facebook, Instagram, Linkedin, Youtube, Twitter } from "lucide-react";
import { services } from "@/lib/site-data";
import { SectionLink } from "./section-link";
import { DetailLink } from "./detail-link";

const quickLinks = [
  { label: "Home", id: "home" },
  { label: "About Us", id: "about" },
  { label: "Services", id: "services" },
  { label: "Portfolio", id: "portfolio" },
  { label: "Contact", id: "contact" },
];

const resourceLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Refund Policy", href: "/refund" },
  { label: "Careers", href: "/careers" },
];

const socialIcons = [
  { Icon: Facebook, color: "#1877F2", href: "https://www.facebook.com/" },
  { Icon: Instagram, color: "#E4405F", href: "https://www.instagram.com/" },
  { Icon: Linkedin, color: "#0A66C2", href: "https://www.linkedin.com/" },
  { Icon: Youtube, color: "#FF0000", href: "https://youtube.com/" },
  { Icon: Twitter, color: "#d5dee6", href: "https://twitter.com/" },
];

// Fixed dark footer — stays dark in both light and dark themes.
const FOOTER_BG = "#050505";
const FOOTER_TEXT = "#FEFEFE";

type NewsletterStatus = "idle" | "sending" | "success" | "error";

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<NewsletterStatus>("idle");
  const [statusMsg, setStatusMsg] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setStatusMsg("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          subject: "New newsletter subscriber",
          from_name: "RavenClaw Newsletter",
          email,
          message: `New newsletter subscriber: ${email}`,
          botcheck: "",
        }),
      });
      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setStatusMsg("Subscribed! You'll hear from us when we publish new work.");
        setEmail("");
        setTimeout(() => setStatus("idle"), 4000);

        // Best-effort: keep a local record so future case-study emails can reach this subscriber
        fetch("/api/newsletter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }).catch((err) => console.error("Newsletter DB save failed:", err));
      } else {
        setStatus("error");
        setStatusMsg(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Newsletter subscribe failed:", err);
      setStatus("error");
      setStatusMsg("Network error. Please try again.");
    }
  };

  return (
    <footer
      id="footer"
      className="relative overflow-hidden mt-auto"
      style={{ backgroundColor: FOOTER_BG, color: FOOTER_TEXT }}
    >
      {/* Top gradient line */}
      <div
        className="h-1"
        style={{
          background:
            "linear-gradient(90deg, #EA9D12, #D96016, #CC2829, #A7069B, #631DFE, #5A5DFE)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Logo wrapper — change justify-center to justify-start/justify-end (or add e.g. "ml-8"/"mr-8") to nudge the bird left or right */}
            <div className="flex w-full justify-start pl-20 mb-3">
              <SectionLink
                sectionId="home"
                className="flex items-center  gap-2"
                aria-label="RavenClaw home"
              >
                <img
                  src="/images/bird.png"
                  alt="RavenClaw"
                  className="w-[90px] h-[90px] object-contain"
                />
              </SectionLink>
            </div>
            <p
              className="text-sm leading-relaxed mb-6 max-w-xs"
              style={{ color: "rgba(254, 254, 254, 0.45)" }}
            >
              We help businesses grow with stunning digital presence that
              creates impact.
            </p>
            <div className="flex items-center gap-3 flex-wrap justify-center">
              {socialIcons.map(({ Icon, color, href }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full transition-transform hover:scale-110"
                  style={{ color }}
                  aria-label="Social media"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="font-display font-bold text-sm tracking-wide mb-5"
              style={{ color: FOOTER_TEXT }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <SectionLink
                    sectionId={link.id}
                    className="text-sm transition-colors text-left hover:opacity-100"
                    style={{ color: "rgba(254, 254, 254, 0.4)" }}
                  >
                    {link.label}
                  </SectionLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4
              className="font-display font-bold text-sm tracking-wide mb-5"
              style={{ color: FOOTER_TEXT }}
            >
              Services
            </h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <DetailLink
                    href={`/services/${s.slug}`}
                    sectionId="services"
                    className="text-sm transition-colors text-left hover:opacity-100"
                    style={{ color: "rgba(254, 254, 254, 0.4)" }}
                  >
                    {s.title}
                  </DetailLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources + Newsletter */}
          <div>
            <h4
              className="font-display font-bold text-sm tracking-wide mb-5"
              style={{ color: FOOTER_TEXT }}
            >
              Resources
            </h4>
            <ul className="space-y-2.5 mb-7">
              {resourceLinks.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    className="text-sm transition-colors text-left hover:opacity-100"
                    style={{ color: "rgba(254, 254, 254, 0.4)" }}
                  >
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4
              className="font-display font-bold text-sm tracking-wide mb-3"
              style={{ color: FOOTER_TEXT }}
            >
              Newsletter
            </h4>
            <p
              className="text-xs mb-3"
              style={{ color: "rgba(254, 254, 254, 0.4)" }}
            >
              Subscribe to get updates on our latest projects and offers.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              {/* Honeypot — hidden from users, catches bots */}
              <input
                type="checkbox"
                name="botcheck"
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === "sending"}
                placeholder="Your email address"
                className="flex-1 min-w-0 border border-white/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-golden/50 disabled:opacity-60"
                style={{
                  backgroundColor: "rgba(255,255,255,0.08)",
                  color: FOOTER_TEXT,
                }}
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all hover:opacity-80 disabled:opacity-60"
                style={{
                  background: "linear-gradient(135deg, #EA9D12, #D96016)",
                }}
                aria-label="Subscribe"
              >
                {status === "sending" ? (
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send size={14} className="text-white" />
                )}
              </button>
            </form>
            {statusMsg && (
              <p
                className="text-xs mt-2"
                style={{
                  color: status === "error" ? "#f87171" : "rgba(254, 254, 254, 0.5)",
                }}
              >
                {statusMsg}
              </p>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/8 mb-6" />

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{ color: "rgba(254, 254, 254, 0.3)" }}
        >
          <p>
            &copy; {new Date().getFullYear()} RavenClaw. All rights reserved.
          </p>
          <p>
            Made with <span className="text-crimson">&hearts;</span> for your
            success
          </p>
        </div>
      </div>
    </footer>
  );
}
