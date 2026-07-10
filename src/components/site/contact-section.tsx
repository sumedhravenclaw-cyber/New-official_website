"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { contactInfo } from "@/lib/site-data";

type Status = "idle" | "sending" | "success" | "error";

const iconMap = { Mail, Phone, MapPin };

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setErrorMsg(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Form submission failed:", err);
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 section-reveal">
          <p
            className="text-xs font-bold tracking-widest uppercase mb-3"
            style={{ color: "#631DFE" }}
          >
            <span className="text-gradient">Get In Touch</span>
          </p>
          <h2 className="font-display font-black text-3xl md:text-4xl text-ink">
            Let&apos;s Build{" "}
            <span className="text-gradient">Something Amazing</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: contact info */}
          <div className="reveal-left space-y-5">
            {contactInfo.map((item) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap];
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-4 p-5 rounded-2xl border border-black/5 bg-surface-alt card-hover"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${item.color}15` }}
                  >
                    <Icon size={20} style={{ color: item.color }} />
                  </div>
                  <div>
                    <p className="text-xs text-muted tracking-wide uppercase mb-0.5">
                      {item.label}
                    </p>
                    <p className="font-semibold text-ink text-sm">
                      {item.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: form */}
          <div className="reveal-right">
            <form
              onSubmit={handleSubmit}
              className="bg-surface-alt rounded-3xl p-8 border border-black/5 space-y-4"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your Name"
                  className="w-full bg-card border border-black/8 rounded-xl px-4 py-3 text-sm text-ink placeholder-muted focus:outline-none focus:border-violet/40 focus:ring-2 focus:ring-violet/10 transition-all"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Your Email"
                  className="w-full bg-card border border-black/8 rounded-xl px-4 py-3 text-sm text-ink placeholder-muted focus:outline-none focus:border-violet/40 focus:ring-2 focus:ring-violet/10 transition-all"
                />
              </div>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Your Message"
                className="w-full bg-card border border-black/8 rounded-xl px-4 py-3 text-sm text-ink placeholder-muted focus:outline-none focus:border-violet/40 focus:ring-2 focus:ring-violet/10 transition-all resize-none"
              />

              <button
                type="submit"
                disabled={status === "sending" || status === "success"}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-70"
                style={{
                  background:
                    "linear-gradient(135deg, #EA9D12, #D96016, #CC2829, #A7069B, #631DFE, #5A5DFE)",
                }}
              >
                {status === "success" ? (
                  "Message Sent!"
                ) : status === "sending" ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={15} />
                  </>
                )}
              </button>

              {status === "error" && (
                <p className="text-sm text-red-500 text-center">{errorMsg}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
