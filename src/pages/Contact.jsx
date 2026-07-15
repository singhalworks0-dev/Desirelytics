import { useEffect, useRef, useState } from "react";
import { MapPin, Mail, Phone, Send, Clock, ShieldCheck } from "lucide-react";

const CONTACT_METHODS = [
  {
    icon: Mail,
    label: "Email",
    value: "sales@desirelyticss.com",
    href: "mailto:sales@desirelyticss.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 929 230 1231",
    href: "tel:+19292301231",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "20900 NE 30th Avenue, 8th Floor, Aventura, FL 33180, Miami, USA",
    href: "https://maps.google.com/?q=20900+NE+30th+Avenue+Aventura+FL+33180",
  },
];

const TRUST_POINTS = [
  { icon: ShieldCheck, text: "100% confidential — NDA available on request" },
  { icon: Clock, text: "Response within 24 hours, guaranteed" },
];

export default function Contact() {
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", website: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const sectionRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 30);
    return () => clearTimeout(t);
  }, []);

  const reveal = () =>
    `transition-all duration-500 ease-out ${
      mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    }`;
  const style = (delay) => ({ transitionDelay: mounted ? `${delay}ms` : "0ms" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      // TODO: wire this up to your form backend (Formspree, EmailJS, serverless function, etc.)
      // await fetch("/api/contact", { method: "POST", body: JSON.stringify(form) });
      await new Promise((r) => setTimeout(r, 900)); // placeholder delay
      setStatus("success");
      setForm({ name: "", email: "", website: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      {/* SEO: pair this page with <title> + meta description via your head-management tool
          e.g. "Contact Desirelyticss | Specialist SEO & Adult Platform Development Agency" */}
      <main className="relative overflow-hidden bg-gradient-to-b from-[#0a0710] via-[#120c1e] to-[#0a0710] px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-20 sm:pb-28">
        {/* Background: gradient glows + subtle grid, no photography */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="pointer-events-none absolute -top-24 left-10 h-72 w-72 rounded-full bg-red-600/10 blur-3xl" />
        <div className="pointer-events-none absolute top-1/3 -right-20 h-80 w-80 rounded-full bg-purple-700/15 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-fuchsia-600/10 blur-3xl" />

        <div ref={sectionRef} className="relative mx-auto max-w-6xl">
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center">
            <div className={`inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-gradient-to-r from-red-950/60 to-purple-950/60 px-3.5 py-1.5 text-[11px] font-semibold text-gray-300 ${reveal()}`} style={style(0)}>
              Get In Touch
            </div>

            <h1 className={`mt-4 text-4xl sm:text-5xl md:text-6xl font-black leading-[1.05] ${reveal()}`} style={style(60)}>
              <span className="text-white">Let's Talk</span>{" "}
              <span className="bg-gradient-to-r from-red-500 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
                Growth
              </span>
            </h1>

            <p className={`mt-4 text-sm sm:text-base text-gray-400 leading-relaxed ${reveal()}`} style={style(120)}>
              Tell us about your platform and goals — our SEO and AI
              development specialists will get back to you within one
              business day with a clear, confidential next step.
            </p>
          </div>

          {/* Content grid */}
          <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
            {/* LEFT: Contact info */}
            <div className="lg:col-span-2 space-y-5">
              {CONTACT_METHODS.map((method, i) => {
                const Icon = method.icon;
                return (
                  <a
                    key={method.label}
                    href={method.href}
                    target={method.label === "Office" ? "_blank" : undefined}
                    rel={method.label === "Office" ? "noreferrer" : undefined}
                    className={`flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-red-500/30 hover:bg-white/[0.05] ${reveal()}`}
                    style={style(180 + i * 60)}
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-purple-600">
                      <Icon className="h-4.5 w-4.5 text-white" />
                    </span>
                    <span>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-500">
                        {method.label}
                      </span>
                      <span className="mt-1 block text-sm text-gray-200 leading-snug">
                        {method.value}
                      </span>
                    </span>
                  </a>
                );
              })}

              {/* Trust points */}
              <div className={`space-y-3 pt-2 ${reveal()}`} style={style(360)}>
                {TRUST_POINTS.map((point) => {
                  const Icon = point.icon;
                  return (
                    <div key={point.text} className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-400">
                      <Icon className="h-4 w-4 shrink-0 text-red-500" />
                      {point.text}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT: Form */}
            <div className={`lg:col-span-3 ${reveal()}`} style={style(240)}>
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-xs font-semibold text-gray-400">
                      Full name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm text-white placeholder:text-gray-500 outline-none transition-colors focus:border-red-500/40"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-gray-400">
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm text-white placeholder:text-gray-500 outline-none transition-colors focus:border-red-500/40"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="website" className="mb-1.5 block text-xs font-semibold text-gray-400">
                    Website / platform URL <span className="text-gray-600">(optional)</span>
                  </label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    value={form.website}
                    onChange={handleChange}
                    placeholder="https://yourplatform.com"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm text-white placeholder:text-gray-500 outline-none transition-colors focus:border-red-500/40"
                  />
                </div>

                <div className="mt-4">
                  <label htmlFor="message" className="mb-1.5 block text-xs font-semibold text-gray-400">
                    What do you need help with?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your goals, timeline, and any specific SEO or development challenges..."
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm text-white placeholder:text-gray-500 outline-none transition-colors focus:border-red-500/40"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="mt-6 inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-gradient-to-r from-red-500 to-purple-600 px-8 py-3 text-sm font-bold text-white shadow-[0_10px_40px_rgba(225,29,72,0.25)] transition-all hover:shadow-[0_10px_40px_rgba(225,29,72,0.4)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:hover:scale-100"
                >
                  <Send className="h-4 w-4" />
                  {status === "submitting" ? "Sending..." : "Send Message"}
                </button>

                {status === "success" && (
                  <p className="mt-4 text-sm text-emerald-400">
                    Thanks — we've received your message and will reply within 24 hours.
                  </p>
                )}
                {status === "error" && (
                  <p className="mt-4 text-sm text-red-400">
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}